"use client";

import { useEffect, useRef } from "react";

const PACKAGES = [
  {
    name: "ROOKIE",
    tagline: "Perfect first gear.",
    price: "₹45,000",
    period: "per shoot",
    desc: "Everything you need for a single-vehicle hero shoot — curated, precise, and delivered to your inbox within 48 hours.",
    features: [
      "Full-day on-location shoot",
      "Up to 60 edited images",
      "4K video reel (60 sec)",
      "2 revision rounds",
      "48hr delivery",
      "Digital deliverables only",
    ],
    cta: "Book Rookie",
    highlight: false,
  },
  {
    name: "RACING",
    tagline: "Built to dominate.",
    price: "₹1,20,000",
    period: "per project",
    desc: "The full arsenal. Multi-angle cinema coverage, extended edit, brand-ready deliverables — engineered for launches, campaigns, and events.",
    features: [
      "Multi-angle cinema coverage",
      "Up to 200 edited images",
      "Full aftermovie (3–5 min)",
      "Unlimited revisions",
      "48hr delivery",
      "Social + broadcast formats",
      "Priority scheduling",
    ],
    cta: "Book Racing",
    highlight: true,
  },
  {
    name: "FACTORY",
    tagline: "No ceiling. No compromises.",
    price: "Custom",
    period: "per campaign",
    desc: "From concept to delivery — full production capabilities for brands that demand the absolute best. Studio, track, road. All of it.",
    features: [
      "Dedicated production team",
      "Multi-day / multi-location",
      "Unlimited final deliverables",
      "White-label rights available",
      "Dedicated project manager",
      "Brand strategy consultation",
      "Perpetual usage rights",
    ],
    cta: "Start a Factory Build",
    highlight: false,
    premium: true,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-package-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`;
      obs.observe(card);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packages"
      style={{
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.06)",
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
          Investment
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
          The Starting
          <br />
          Grid.
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "1.25rem",
          alignItems: "stretch",
        }}
      >
        {PACKAGES.map((pkg) => {
          const isLight = pkg.highlight;
          return (
            <div
              key={pkg.name}
              data-package-card
              style={{
                background: isLight
                  ? "#f0f0f0"
                  : pkg.premium
                  ? "rgba(255,255,255,0.025)"
                  : "rgba(255,255,255,0.025)",
                border: isLight
                  ? "none"
                  : pkg.premium
                  ? "1px solid rgba(176,180,184,0.2)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "1.5rem",
                padding: "clamp(1.75rem, 3vw, 2.5rem)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Silver accent line on RACING */}
              {pkg.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0) 0%, #b0b4b8 50%, rgba(0,0,0,0) 100%)",
                  }}
                />
              )}

              {/* Package name + tagline */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-roboto-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                    color: isLight ? "rgba(0,0,0,0.45)" : "#b0b4b8",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}
                >
                  {pkg.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    color: isLight ? "#080808" : "#b0b4b8",
                  }}
                >
                  {pkg.tagline}
                </p>
              </div>

              {/* Price */}
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    color: isLight ? "#080808" : "#f0f0f0",
                    lineHeight: 1,
                  }}
                >
                  {pkg.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-roboto-mono)",
                    fontWeight: 300,
                    fontSize: "0.65rem",
                    color: isLight ? "rgba(8,8,8,0.45)" : "#b0b4b8",
                    marginLeft: "0.5rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {pkg.period}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: isLight
                    ? "rgba(0,0,0,0.1)"
                    : "rgba(255,255,255,0.07)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(0.78rem, 1.2vw, 0.875rem)",
                  color: isLight ? "rgba(8,8,8,0.65)" : "#b0b4b8",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}
              >
                {pkg.desc}
              </p>

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: "2rem",
                  flex: 1,
                }}
              >
                {pkg.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      marginBottom: "0.7rem",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <polyline
                        points="2,7 5.5,10.5 12,3"
                        stroke={isLight ? "#080808" : "#f0f0f0"}
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 300,
                        fontSize: "0.82rem",
                        color: isLight ? "#080808" : "#b0b4b8",
                        lineHeight: 1.4,
                      }}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                style={
                  isLight
                    ? {
                        display: "block",
                        textAlign: "center",
                        padding: "0.875rem",
                        background: "#080808",
                        color: "#f0f0f0",
                        borderRadius: "0.25rem",
                        fontFamily: "var(--font-barlow)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "background 0.3s ease",
                      }
                    : {
                        display: "block",
                        textAlign: "center",
                        padding: "0.875rem",
                        background: "transparent",
                        color: pkg.premium ? "#b0b4b8" : "#f0f0f0",
                        border: `1px solid ${pkg.premium ? "rgba(176,180,184,0.3)" : "rgba(240,240,240,0.2)"}`,
                        borderRadius: "0.25rem",
                        fontFamily: "var(--font-barlow)",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "background 0.3s ease, color 0.3s ease",
                      }
                }
                onMouseEnter={(e) => {
                  if (isLight) {
                    (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                  } else {
                    (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
                    (e.currentTarget as HTMLElement).style.color = "#080808";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isLight) {
                    (e.currentTarget as HTMLElement).style.background = "#080808";
                  } else {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = pkg.premium
                      ? "#b0b4b8"
                      : "#f0f0f0";
                  }
                }}
              >
                {pkg.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
