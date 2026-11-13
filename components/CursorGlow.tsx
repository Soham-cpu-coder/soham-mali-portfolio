"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        rafId = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent-blue/10 blur-[80px] pointer-events-none will-change-transform"
      />
    </div>
  );
}
