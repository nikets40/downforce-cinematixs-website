"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "56px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.5rem, 4vw, 3rem)",
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "rgba(8, 8, 8, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(176, 180, 184, 0.15)"
          : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f0f0f0",
          }}
        >
          DOWNFORCE
        </span>
        <span
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontWeight: 300,
            fontSize: "0.45rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#b0b4b8",
            marginTop: "2px",
          }}
        >
          CINEMATIXS
        </span>
      </a>

      {/* Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#b0b4b8",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#f0f0f0")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#b0b4b8")
            }
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#packages"
        className="btn-outline"
        style={{
          padding: "0.5rem 1.25rem",
          borderRadius: "0.25rem",
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          display: "inline-flex",
          alignItems: "center",
          transform: "scale(1)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
        }
      >
        <span>Book a Shoot</span>
      </a>
    </nav>
  );
}
