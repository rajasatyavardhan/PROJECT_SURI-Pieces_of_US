import { useEffect, useMemo, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };

/**
 * Ambient drifting dust. Deliberately cheap:
 * few particles, one canvas, paused when off-screen or reduced-motion.
 */
export function Particles({ count = 34, className }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const parts: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.05 - Math.random() * 0.12,
      r: 0.6 + Math.random() * 1.6,
      a: 0.12 + Math.random() * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 196, 205, ${p.a})`;
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [count, reduced]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
