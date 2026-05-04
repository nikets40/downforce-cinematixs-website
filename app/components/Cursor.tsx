"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.background = "rgba(240,240,240,0.08)";
      ring.style.border = "1px solid rgba(240,240,240,0.4)";
    };

    const onMouseLeaveInteractive = () => {
      ring.style.width = "20px";
      ring.style.height = "20px";
      ring.style.background = "transparent";
      ring.style.border = "1px solid rgba(240,240,240,0.5)";
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const addListeners = () => {
      document
        .querySelectorAll(
          "a, button, [role='button'], input, textarea, select, label"
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterInteractive);
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: "-10px",
          left: "-10px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "1px solid rgba(240,240,240,0.5)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease, border 0.3s ease",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: "-3px",
          left: "-3px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#b0b4b8",
          pointerEvents: "none",
          zIndex: 100000,
          willChange: "transform",
        }}
      />
    </>
  );
}
