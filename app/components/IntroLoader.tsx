"use client";

import { useEffect, useRef, useState } from "react";

type Phase =
  | "idle"        // black screen
  | "logo-in"     // logo fades in
  | "hold"        // logo holds
  | "fly-out"     // logo flies right + overlay rises
  | "done";       // everything removed

// Total sequence: ~2.2s
// Phase timings:
//   idle    → 200ms
//   logo-in → 500ms
//   hold    → 600ms
//   fly-out → 1000ms
//   done    → removed from DOM

const PHASE_DURATIONS: Record<Phase, number> = {
  idle: 200,
  "logo-in": 500,
  hold: 600,
  "fly-out": 1000,
  done: 0,
};

export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [logoVisible, setLogoVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const onCompleteRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Signal Hero to start its animations when fly-out is done
    const signalHero = () => {
      window.dispatchEvent(new CustomEvent("intro-complete"));
    };

    let totalDelay = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (ph: Phase) => {
      const prev = totalDelay;
      totalDelay += PHASE_DURATIONS[ph];
      return prev;
    };

    schedule("idle");
    timeouts.push(setTimeout(() => setPhase("logo-in"), schedule("logo-in")));
    timeouts.push(setTimeout(() => setPhase("hold"), schedule("hold")));
    timeouts.push(
      setTimeout(() => {
        setPhase("fly-out");
        setLogoVisible(false); // logo flies out
      }, schedule("fly-out"))
    );
    timeouts.push(
      setTimeout(() => {
        setPhase("done");
        setOverlayVisible(false);
        signalHero();
        onCompleteRef.current?.();
      }, schedule("done"))
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  if (phase === "done" && !overlayVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: phase === "done" ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Black overlay — rises up */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000000",
          transformOrigin: "bottom center",
          transition:
            phase === "fly-out"
              ? "transform 1s cubic-bezier(0.76, 0, 0.24, 1) 0s, opacity 0.4s ease 0.85s"
              : phase === "done"
              ? "opacity 0s"
              : "none",
          transform:
            phase === "fly-out"
              ? "translateY(-100%)"
              : phase === "done"
              ? "translateY(-100%)"
              : "translateY(0)",
          opacity: overlayVisible ? 1 : 0,
        }}
        onTransitionEnd={() => {
          if (phase === "fly-out") {
            document.body.style.overflow = "";
          }
        }}
      />

      {/* Logo block — flies right */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: phase === "idle" ? 0 : 1,
          transition:
            phase === "logo-in"
              ? "opacity 0.5s ease 0s"
              : phase === "fly-out"
              ? "opacity 0s 0.35s, transform 0.9s cubic-bezier(0.76, 0, 0.24, 1) 0.05s"
              : phase === "done"
              ? "opacity 0s"
              : "none",
          transform:
            phase === "fly-out" ? "translateX(110vw)" : "translateX(0)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-barlow)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#f0f0f0",
              lineHeight: 1,
            }}
          >
            DOWNFORCE
          </div>
          <div
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontWeight: 300,
              fontSize: "clamp(0.4rem, 1.2vw, 0.75rem)",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#b0b4b8",
              marginTop: "0.4rem",
            }}
          >
            CINEMATIXS
          </div>
        </div>
      </div>
    </div>
  );
}
