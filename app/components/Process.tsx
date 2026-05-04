"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "BRIEF",
    desc: "We receive your vision — track day, vehicle launch, brand campaign, or road trip. We scope, plan, and confirm every detail before the engines fire.",
  },
  {
    num: "02",
    title: "SHOOT",
    desc: "On location with broadcast-grade cinema cameras, gimbals, and multi-angle capture. We shoot to edit — every frame considered, every moment owned.",
  },
  {
    num: "03",
    title: "DELIVERED",
    desc: "48 hours after wrap, your finished deliverable lands in your inbox. Colour-graded, audio-synced, ready to publish or present.",
  },
];

const TIMELINE = [
  { phase: "Pre-Production", start: 0, end: 20 },
  { phase: "On-Site Shoot", start: 15, end: 55 },
  { phase: "Post-Production", start: 45, end: 85 },
  { phase: "Final Delivery", start: 78, end: 95 },
];

// Dot positions at the right edge of each grid column (33.33% = col1 end, 66.67% = col2 end)
const DOT_POSITIONS = [33.333, 66.667, 100];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          const length = line.getTotalLength();
          line.style.strokeDasharray = `${length}`;
          line.style.strokeDashoffset = `${length}`;
          requestAnimationFrame(() => {
            line.style.transition =
              "stroke-dashoffset 1.8s cubic-bezier(0.76, 0, 0.24, 1) 0.3s";
            line.style.strokeDashoffset = "0";
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [animated]);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
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
            How It Works
          </p>
          <h2
            style={{
              fontFamily: "var(--font-barlow)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 6rem)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              color: "#f0f0f0",
            }}
          >
            The Workflow
            <br />
            Sequence.
          </h2>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          MOBILE: vertical stacked steps + vertical line
          ───────────────────────────────────────────── */}
      <div
        className="mobile-steps"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {STEPS.map((step, i) => (
          <div
            key={`mobile-${step.num}`}
            style={{
              display: "flex",
              gap: "1.25rem",
              padding: "clamp(1.5rem, 4vw, 2rem) 0",
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Vertical timeline track */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
                paddingTop: "0.3rem",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: animated ? "#f0f0f0" : "rgba(176,180,184,0.25)",
                  border: "1px solid rgba(176,180,184,0.3)",
                  transition: `background 0.4s ease ${0.3 + i * 0.55}s`,
                  flexShrink: 0,
                }}
              />
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    flex: 1,
                    minHeight: "2.5rem",
                    background: "rgba(176,180,184,0.12)",
                    marginTop: "4px",
                  }}
                />
              )}
            </div>

            {/* Step content */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                  color: "rgba(176,180,184,0.12)",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 700,
                  fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
                  textTransform: "uppercase",
                  color: "#f0f0f0",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.06em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                  color: "#b0b4b8",
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────
          DESKTOP: 3-column grid with horizontal SVG
          connector line + dots pinned to grid boundaries
          ───────────────────────────────────────────── */}
      <div
        className="desktop-steps"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          position: "relative",
        }}
      >
        {/* SVG line: aligned with step card borderTop (~40px from container top) */}
        <div
          style={{
            position: "absolute",
            top: "2.5rem",
            left: "calc(33.333% - 0.5px)",
            right: "-0.5px",
            height: "1px",
            pointerEvents: "none",
          }}
        >
          <svg
            width="100%"
            height="2"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            style={{ overflow: "visible", display: "block" }}
          >
            <path
              ref={lineRef}
              d="M0,1 L100,1"
              stroke="#b0b4b8"
              strokeWidth="1"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{
                transition: animated
                  ? "stroke-dashoffset 1.8s cubic-bezier(0.76, 0, 0.24, 1) 0.3s"
                  : "none",
              }}
            />
          </svg>
        </div>

        {/* Dots: aligned with SVG line at card borderTop */}
        {DOT_POSITIONS.map((pct, i) => (
          <div
            key={`dot-${pct}`}
            style={{
              position: "absolute",
              top: "calc(2.5rem - 4px)",
              left: `calc(${pct}% - 4px)`,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: animated ? "#f0f0f0" : "rgba(176,180,184,0.25)",
              border: "1px solid rgba(176,180,184,0.3)",
              transition: `background 0.4s ease ${0.4 + i * 0.55}s, border-color 0.4s ease ${0.4 + i * 0.55}s`,
              zIndex: 2,
            }}
          />
        ))}

        {/* Steps */}
        {STEPS.map((step, i) => (
          <div
            key={`desktop-${step.num}`}
            style={{
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 800,
                fontSize: "clamp(4rem, 7vw, 6rem)",
                color: "rgba(176,180,184,0.15)",
                lineHeight: 1,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {step.num}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                textTransform: "uppercase",
                color: "#f0f0f0",
                marginBottom: "0.75rem",
                letterSpacing: "0.06em",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                color: "#b0b4b8",
                lineHeight: 1.65,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Delivery Timeline Gantt */}
      <div
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "1.25rem",
          padding: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.25em",
            color: "#b0b4b8",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Delivery Timeline — 48hr Turnaround
        </p>

        {/* Time axis */}
        <div style={{ display: "flex", marginBottom: "0.75rem", paddingLeft: "9rem" }}>
          {["Day 1", "Day 2", "Delivered"].map((label, i) => (
            <div
              key={label}
              style={{
                flex: 1,
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                color: "rgba(176,180,184,0.5)",
                textTransform: "uppercase",
                textAlign: "center",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Gantt rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", overflow: "hidden" }}>
          {TIMELINE.map((row, i) => (
            <div
              key={row.phase}
              style={{ display: "flex", alignItems: "center", gap: "1rem", overflow: "hidden" }}
            >
              <div
                style={{
                  width: "8.5rem",
                  flexShrink: 0,
                  fontFamily: "var(--font-roboto-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.12em",
                  color: "#b0b4b8",
                  textTransform: "uppercase",
                }}
              >
                {row.phase}
              </div>
              <div style={{ flex: 1, position: "relative", height: "20px", overflow: "hidden" }}>
                {/* Track */}
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    bottom: "3px",
                    left: 0,
                    right: 0,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "2px",
                  }}
                />
                {/* Fill */}
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    bottom: "3px",
                    left: `${row.start}%`,
                    right: `${100 - row.end}%`,
                    background:
                      i === 3
                        ? "linear-gradient(90deg, rgba(240,240,240,0.7), rgba(240,240,240,0.9))"
                        : "rgba(176,180,184,0.5)",
                    borderRadius: "2px",
                    animation: animated
                      ? `progressFill 1.2s cubic-bezier(0.76, 0, 0.24, 1) ${0.5 + i * 0.3}s both`
                      : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Timestamp labels */}
        <div
          style={{
            marginTop: "1.25rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1.5rem",
          }}
        >
          {[
            { ts: "T+00:00", label: "Brief Confirmed" },
            { ts: "T+08:00", label: "Shoot Wrap" },
            { ts: "T+48:00", label: "Final Deliverable" },
          ].map((item) => (
            <div key={item.ts} style={{ textAlign: "right" }}>
              <span
                style={{
                  fontFamily: "var(--font-roboto-mono)",
                  fontSize: "0.6rem",
                  color: "#f0f0f0",
                  display: "block",
                }}
              >
                {item.ts}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-roboto-mono)",
                  fontSize: "0.5rem",
                  color: "rgba(176,180,184,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive layout: mobile shows stacked, desktop shows grid */}
      <style>{`
        .mobile-steps { display: flex !important; }
        .desktop-steps { display: none !important; }
        @media (min-width: 768px) {
          .mobile-steps { display: none !important; }
          .desktop-steps { display: grid !important; }
        }
      `}</style>
    </section>
  );
}
