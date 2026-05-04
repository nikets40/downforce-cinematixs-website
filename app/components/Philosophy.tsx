"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "48hr", label: "Delivery", suffix: "" },
  { value: "100+", label: "Shoots", suffix: "" },
  { value: "Zero", label: "Compromises", suffix: "" },
];

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center", padding: "0 clamp(1rem, 2vw, 2rem)" }}>
      <div
        style={{
          fontFamily: "var(--font-barlow)",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          lineHeight: 1,
          color: "#f0f0f0",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-roboto-mono)",
          fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
          fontWeight: 300,
          letterSpacing: "0.14em",
          color: "#b0b4b8",
          textTransform: "uppercase",
          marginTop: "0.4rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;

    // Parallax on scroll
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / rect.height;
      bg.style.transform = `translateY(${progress * 80}px)`;
    };

    // Reveal animation
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-15%",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=2000&q=80&auto=format"
          alt="Racing car on track"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8, 8, 8, 0.93)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-roboto-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            color: "#b0b4b8",
            textTransform: "uppercase",
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Our Philosophy
        </p>

        {/* Manifesto lines */}
        <div
          style={{
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
              color: "#b0b4b8",
              marginBottom: "1.25rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          >
            Others capture the moment.
          </p>
          <h2
            style={{
              fontFamily: "var(--font-barlow)",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              lineHeight: 0.9,
              textTransform: "uppercase",
              color: "#f0f0f0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s",
            }}
          >
            WE CAPTURE
            <br />
            THE MACHINE.
          </h2>
        </div>

        {/* Pull-quote */}
        <blockquote
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
            color: "#b0b4b8",
            lineHeight: 1.5,
            margin: "0 auto clamp(3rem, 6vw, 5rem)",
            maxWidth: "620px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition:
              "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
            borderLeft: "none",
          }}
        >
          &ldquo;Speed is not just how fast you move. It&rsquo;s how fast the
          world receives what you&rsquo;ve created.&rdquo;
        </blockquote>

        {/* Stats divider */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                maxWidth: "220px",
                padding: "1.5rem",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <StatCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
