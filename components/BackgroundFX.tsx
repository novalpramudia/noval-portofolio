"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFX() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let raf = 0;
    let targetX = 0.5;
    let targetY = 0.5;
    let x = 0.5;
    let y = 0.5;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX / window.innerWidth;
      targetY = e.clientY / window.innerHeight;
    };

    const loop = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x * 100}vw, ${y * 100}vh) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div
        ref={glowRef}
        className="absolute h-[560px] w-[560px] rounded-full bg-primary/20 blur-[120px] will-change-transform"
        style={{ top: 0, left: 0 }}
      />

      <div className="absolute -left-40 top-[-10%] h-[420px] w-[420px] animate-blob rounded-full bg-primary/25 blur-[110px]" />
      <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] animate-blob rounded-full bg-secondary/20 blur-[110px] [animation-delay:4s]" />
      <div className="absolute bottom-[-15%] left-[30%] h-[460px] w-[460px] animate-blob rounded-full bg-accent/10 blur-[130px] [animation-delay:8s]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/40 to-void" />
    </div>
  );
}
