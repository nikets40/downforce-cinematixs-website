"use client";

const SERVICES = [
  "AUTOMOBILE PHOTOGRAPHY",
  "MOTORSPORTS COVERAGE",
  "VEHICLE DELIVERY SHOOTS",
  "AFTERMOVIES",
  "BRAND CAMPAIGNS",
  "ROAD TRIP DOCUMENTARIES",
  "TRACK DAY FILMS",
  "LAP RECORD DOCUMENTATION",
];

interface MarqueeTickerProps {
  direction?: "left" | "right";
  dark?: boolean;
}

export default function MarqueeTicker({
  direction = "left",
  dark = false,
}: MarqueeTickerProps) {
  const content = SERVICES.join(" · ") + " · ";
  const doubled = content + content;

  return (
    <div
      style={{
        borderTop: dark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(255,255,255,0.08)",
        borderBottom: dark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(255,255,255,0.08)",
        padding: "0.875rem 0",
        overflow: "hidden",
        background: dark ? "#000000" : "transparent",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee${direction === "left" ? "Left" : "Right"} ${28 + SERVICES.length * 0.5}s linear infinite`,
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-roboto-mono)",
              fontSize: "0.65rem",
              fontWeight: 300,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#b0b4b8",
              whiteSpace: "nowrap",
              paddingRight: "2rem",
            }}
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
