"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "TRACK DAY",
    subtitle: "Buddh Circuit",
    category: "Motorsport Coverage",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1800&q=85&auto=format",
    desc: "A full-day broadcast-grade coverage of a 40-car grid across three racing classes.",
  },
  {
    id: "02",
    title: "SILVERSTONE",
    subtitle: "Endurance Relay",
    category: "Brand Campaign",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1800&q=85&auto=format",
    desc: "Six hours. Two drivers. One unbroken narrative — shot across every lighting condition.",
  },
  {
    id: "03",
    title: "PORSCHE 992",
    subtitle: "911 GT3 RS Delivery",
    category: "Vehicle Delivery",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=85&auto=format",
    desc: "A private handover shoot for a bespoke 992 GT3 RS — delivered within 24 hours.",
  },
  {
    id: "04",
    title: "HIMALAYAN",
    subtitle: "GRAND TOUR",
    category: "Road Trip Documentary",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=85&auto=format",
    desc: "Five cars, 3,200 km, and zero compromises — the full story of an Indian Himalayan GT.",
  },
];

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let rafId: number;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (sectionHeight - viewportHeight))
      );

      // Require 28% scroll-through before any card begins fading
      // Then progress at 0.75x rate — effect spans ~95% of section travel
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const cardProgress = Math.max(
          0,
          Math.min(1, (progress - 0.28 - i * 0.18) * 0.75)
        );
        const scale = 1 - cardProgress * 0.08;
        const blur = cardProgress * 12;
        const opacity = 1 - cardProgress * 0.6;

        card.style.transform = `scale(${scale})`;
        card.style.filter = `blur(${blur}px)`;
        card.style.opacity = `${opacity}`;
      });
    };

    const loop = () => {
      onScroll();
      rafId = requestAnimationFrame(loop);
    };

    // Stagger initial reveal
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      card.style.transition =
        "transform 0.1s linear, filter 0.1s linear, opacity 0.1s linear";
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: "#080808",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
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
          Selected Work
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
          The Reel
          <br />
          Archive.
        </h2>
      </div>

      {/* Sticky stacking cards */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: "5rem",
          height: `calc(100vh - 5rem)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "2rem",
        }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            style={{
              flex: "0 0 calc((100vh - 5rem - 6rem - 4.5rem) / 2.3)",
              minHeight: "280px",
              position: "relative",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              willChange: "transform, filter, opacity",
            }}
          >
            {/* Background image */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.55)",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              {/* Top row: category + frame counter */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-roboto-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    color: "#b0b4b8",
                    textTransform: "uppercase",
                    background: "rgba(8,8,8,0.6)",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "2px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-roboto-mono)",
                    fontSize: "0.6rem",
                    color: "rgba(176,180,184,0.7)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {project.id} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    lineHeight: 0.9,
                    textTransform: "uppercase",
                    color: "#f0f0f0",
                    marginBottom: "0.25rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                    color: "#b0b4b8",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                    color: "rgba(176,180,184,0.8)",
                    lineHeight: 1.5,
                    maxWidth: "480px",
                    marginBottom: "1rem",
                  }}
                >
                  {project.desc}
                </p>

                {/* View project link */}
                <a
                  href="#"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#f0f0f0",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    opacity: 0.8,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.opacity = "0.8")
                  }
                >
                  View Project
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div style={{ height: "10rem", background: "#080808" }} />
    </section>
  );
}
