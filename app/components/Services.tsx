"use client";

import { useEffect, useRef, useState } from "react";

const SERVICES_CARDS = [
  {
    id: "event",
    label: "01",
    title: "Event Coverage",
    description:
      "Full-track and broadcast-grade coverage of motorsport events — practice sessions, race days, paddock access, and podium ceremonies.",
    stat: "47",
    statLabel: "events covered",
    artifact: <LiveCounter target={47} />,
  },
  {
    id: "photo",
    label: "02",
    title: "Automobile Photography",
    description:
      "Hero shots, studio-grade setups, and on-location portraits for manufacturers, dealers, and collectors who demand perfection.",
    artifact: <FilmStrip />,
  },
  {
    id: "delivery",
    label: "03",
    title: "Vehicle Delivery Shoots",
    description:
      "Document the moment of delivery — for luxury brands, private buyers, and dealership networks who deliver with pride.",
    artifact: <DeliveryTracker />,
  },
  {
    id: "aftermovie",
    label: "04",
    title: "AfterMovies & Road Trips",
    description:
      "Narrative-driven short films and road documentaries shot on location, edited to a broadcast-ready deliverable in under 48 hours.",
    artifact: <VideoScrubber />,
  },
  {
    id: "campaign",
    label: "05",
    title: "Brand Campaigns",
    description:
      "Your brand. Our lens. Unforgettable content that moves metal and builds legacy — from single-day shoots to full campaign rollouts.",
    fullWidth: true,
  },
];

function LiveCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(start);
            if (start >= target) clearInterval(interval);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {count}
    </span>
  );
}

function FilmStrip() {
  // 10 frames, duplicated 3× for full-width coverage.
  // Slower: each frame holds ~1s → total duration 10s.
  const FRAME_W = 64;
  const FRAME_GAP = 3;
  const TOTAL_FRAMES = 10;
  const strip = Array.from({ length: TOTAL_FRAMES * 3 }, (_, i) => i % TOTAL_FRAMES);
  const SCROLL_DIST = FRAME_W * TOTAL_FRAMES + FRAME_GAP * TOTAL_FRAMES;
  const DURATION = 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <style>{`
        @keyframes filmRoll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${SCROLL_DIST}px); }
        }
        .film-strip-track {
          animation: filmRoll ${DURATION}s linear infinite;
          will-change: transform;
        }
        .film-strip-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Strip — full card width, overflow clips */}
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          height: "40px",
          position: "relative",
        }}
      >
        <div
          className="film-strip-track"
          style={{
            display: "flex",
            gap: `${FRAME_GAP}px`,
            alignItems: "center",
            height: "100%",
            width: "max-content",
          }}
        >
          {strip.map((frameIdx) => (
            <div
              key={frameIdx}
              style={{
                width: `${FRAME_W}px`,
                height: "36px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Sprocket holes — top */}
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 5px, transparent 5px, transparent 9px)",
                }}
              />
              {/* Sprocket holes — bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 5px, transparent 5px, transparent 9px)",
                }}
              />
              {/* Frame content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `rgba(255,255,255,${0.012 + (frameIdx % 4) * 0.006})`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ROLLING label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#b0b4b8",
            animation: "pulseDot 1.4s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "#b0b4b8",
            textTransform: "uppercase",
          }}
        >
          Rolling
        </span>
      </div>
    </div>
  );
}


function DeliveryTracker() {
  const STEPS = ["SHOOT SCHEDULED", "ON LOCATION", "DELIVERED"];
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let step = 0;
          const interval = setInterval(() => {
            step = (step + 1) % (STEPS.length + 1);
            setActiveStep(step === STEPS.length ? 0 : step);
            if (step === 0) setActiveStep(0);
          }, 1800);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {STEPS.map((step, i) => {
        const done = i < activeStep;
        const current = i === activeStep;
        return (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              opacity: done ? 0.4 : 1,
              transition: "opacity 0.4s ease",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: `1px solid ${current ? "#f0f0f0" : "rgba(176,180,184,0.4)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.4s ease",
              }}
            >
              {done ? (
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <polyline
                    points="1,4 3,6 7,2"
                    stroke="#f0f0f0"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              ) : current ? (
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#f0f0f0",
                  }}
                />
              ) : null}
            </div>
            <span
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: current ? "#f0f0f0" : "#b0b4b8",
                transition: "color 0.4s ease",
              }}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function VideoScrubber() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let frame = 0;
          const interval = setInterval(() => {
            frame = (frame + 1) % 121;
            setProgress(frame);
          }, 60);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#f0f0f0",
            width: `${progress}%`,
            transition: "width 0.06s linear",
            borderRadius: "1px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.35rem",
        }}
      >
        {["4K", "24fps", "DOLBY"].map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontSize: "0.52rem",
              letterSpacing: "0.16em",
              color: "#b0b4b8",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "2px",
              padding: "0.15rem 0.4rem",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-service-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(32px)";
      card.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#080808",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <p
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "#b0b4b8",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          What We Do
        </p>
        <h2
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 800,
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: "#f0f0f0",
          }}
        >
          Built for
          <br />
          speed.
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "1.25rem",
        }}
      >
        {SERVICES_CARDS.map((card) => (
          <div
            key={card.id}
            data-service-card
            className={card.fullWidth ? "col-span-full" : ""}
            style={
              card.fullWidth
                ? {
                    background:
                      "linear-gradient(135deg, rgba(8,8,8,1) 0%, rgba(30,30,30,0.6) 100%)",
                    border: "1px solid rgba(176,180,184,0.12)",
                    borderRadius: "1.5rem",
                    padding: "clamp(2rem, 4vw, 3rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                  }
                : {
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1.5rem",
                    padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  }
            }
          >
            {card.fullWidth ? (
              <>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-roboto-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.3em",
                      color: "#b0b4b8",
                      marginBottom: "0.75rem",
                    }}
                  >
                    05 · FULL SERVICE
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontWeight: 800,
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      textTransform: "uppercase",
                      color: "#f0f0f0",
                      lineHeight: 0.95,
                      marginBottom: "1rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 300,
                      fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                      color: "#b0b4b8",
                      maxWidth: "480px",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
                <a
                  href="#packages"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#f0f0f0",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid rgba(240,240,240,0.3)",
                    paddingBottom: "2px",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  Start a Campaign
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-roboto-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.3em",
                      color: "#b0b4b8",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card.label} · SERVICE
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      textTransform: "uppercase",
                      color: "#f0f0f0",
                      lineHeight: 1,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 300,
                      fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)",
                      color: "#b0b4b8",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Artifact */}
                <div>
                  {card.id === "event" && (
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-barlow)",
                          fontWeight: 800,
                          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                          color: "#f0f0f0",
                          lineHeight: 1,
                          display: "block",
                        }}
                      >
                        {card.artifact}
                        <span
                          style={{
                            fontFamily: "var(--font-roboto-mono)",
                            fontSize: "0.7rem",
                            fontWeight: 300,
                            color: "#b0b4b8",
                            marginLeft: "0.5rem",
                            verticalAlign: "middle",
                          }}
                        >
                          {card.statLabel}
                        </span>
                      </span>
                    </div>
                  )}
                  {card.id === "photo" && card.artifact}
                  {card.id === "delivery" && card.artifact}
                  {card.id === "aftermovie" && card.artifact}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
