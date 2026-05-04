"use client";

import { useState } from "react";
import MarqueeTicker from "./MarqueeTicker";

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const [year] = useState(2026);

  return (
    <footer
      style={{
        background: "#000000",
        borderRadius: "3rem 3rem 0 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem) 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top marquee */}
      <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <MarqueeTicker direction="right" dark />
      </div>

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "clamp(2rem, 4vw, 4rem)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Brand lockup */}
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#f0f0f0",
                lineHeight: 1,
              }}
            >
              DOWNFORCE
            </p>
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 400,
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(176,180,184,0.5)",
                marginTop: "0.25rem",
              }}
            >
              CINEMATIXS
            </p>
          </div>

          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "rgba(176,180,184,0.6)",
              lineHeight: 1.5,
              maxWidth: "280px",
            }}
          >
            We don&apos;t shoot stories.
            <br />
            We shoot technique and speed.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "rgba(176,180,184,0.4)",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Navigate
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.label} style={{ marginBottom: "0.75rem" }}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                    color: "rgba(176,180,184,0.7)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(176,180,184,0.7)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "rgba(176,180,184,0.4)",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Connect
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label} style={{ marginBottom: "0.75rem" }}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 400,
                    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                    color: "rgba(176,180,184,0.7)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(176,180,184,0.7)")
                  }
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 8L8 2M8 2H4M8 2V6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#packages"
            style={{
              display: "inline-flex",
              marginTop: "1rem",
              fontFamily: "var(--font-barlow)",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#f0f0f0",
              textDecoration: "none",
              border: "1px solid rgba(240,240,240,0.2)",
              padding: "0.6rem 1.2rem",
              borderRadius: "0.25rem",
              transition: "background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#080808";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#f0f0f0";
            }}
          >
            Book a Shoot
          </a>
        </div>

        {/* Status indicator */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: "rgba(176,180,184,0.4)",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            System Status
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f0f0f0",
                animation: "statusPulse 2s ease-in-out infinite",
                boxShadow: "0 0 0 0 rgba(240,240,240,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-roboto-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                color: "rgba(240,240,240,0.7)",
                textTransform: "uppercase",
              }}
            >
              Systems Operational
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontWeight: 300,
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              color: "rgba(176,180,184,0.35)",
              lineHeight: 1.6,
            }}
          >
            Accepting bookings for Q3 2026
            <br />
            48hr turnaround guaranteed
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontWeight: 300,
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(176,180,184,0.35)",
          }}
        >
          &copy; {year} DownForce Cinematixs. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontWeight: 300,
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "rgba(176,180,184,0.35)",
          }}
        >
          Built for speed. Engineered for precision.
        </p>
      </div>
    </footer>
  );
}
