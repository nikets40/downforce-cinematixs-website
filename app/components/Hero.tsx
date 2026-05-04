"use client";

import { useEffect, useRef } from "react";
import MarqueeTicker from "./MarqueeTicker";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-hero-item]");

    // Reveal: 2.3s = loader total duration (200 + 500 + 600 + 1000ms)
    const timer = setTimeout(() => {
      items.forEach((item, i) => {
        const delay = `${0.05 + i * 0.13}s`;
        item.style.transitionDelay = delay;
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      });
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "640px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Background Image — always visible */}
      <div
        data-hero-bg
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2000&q=85&auto=format"
          alt="Dark dramatic automotive scene"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.65) 45%, rgba(8,8,8,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(8,8,8,0.7) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "0",
          maxWidth: "860px",
        }}
      >
        {/* Eyebrow */}
        <p
          data-hero-item
          style={{
            opacity: 0,
            transform: "translateY(36px)",
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "0.6rem",
            fontWeight: 400,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#b0b4b8",
            marginBottom: "1.25rem",
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Automotive &amp; Motorsports Media
        </p>

        {/* Main Headline */}
        <h1
          data-hero-item
          style={{
            opacity: 0,
            transform: "translateY(36px)",
            fontFamily: "var(--font-barlow)",
            fontWeight: 800,
            fontSize: "clamp(4rem, 10vw, 9rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "#f0f0f0",
            margin: 0,
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          WE DON&apos;T SHOOT
          <br />
          STORIES.
        </h1>

        {/* Italic contrast line */}
        <p
          data-hero-item
          style={{
            opacity: 0,
            transform: "translateY(36px)",
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
            lineHeight: 1.1,
            color: "#b0b4b8",
            margin: "0.75rem 0 0",
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          We shoot technique
          <br />
          <span style={{ color: "#f0f0f0" }}>and speed.</span>
        </p>

        {/* Sub-copy */}
        <p
          data-hero-item
          style={{
            opacity: 0,
            transform: "translateY(36px)",
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 300,
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            color: "#b0b4b8",
            marginTop: "1.5rem",
            maxWidth: "440px",
            lineHeight: 1.6,
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          Automotive photography and motorsports films — delivered faster than the
          field.
        </p>

        {/* CTA Row */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            transform: "translateY(36px)",
            display: "flex",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <a
            href="#work"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 2rem",
              borderRadius: "0.25rem",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            <span>View Our Work</span>
          </a>
          <a
            href="#packages"
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.875rem 2rem",
              borderRadius: "0.25rem",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            <span>Book a Shoot</span>
          </a>
        </div>
      </div>

      <div style={{ height: "3.5rem" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <MarqueeTicker direction="left" />
      </div>
    </section>
  );
}
