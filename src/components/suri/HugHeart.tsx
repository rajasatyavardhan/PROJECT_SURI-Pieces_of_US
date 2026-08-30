import { useCallback, useEffect, useRef, useState } from "react";
import { tap } from "@/lib/suri-storage";

type Node = { x: number; y: number; tx: number; ty: number; r: number; hue: number };

/** Heart parametric curve point, normalised to the canvas. */
function heartPoint(t: number, cx: number, cy: number, s: number) {
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: cx + x * s, y: cy - y * s };
}

/**
 * Press and hold: scattered glowing particles slowly converge into a heart.
 * Release early and they drift back apart.
 */
export function HugHeart({
  onComplete,
  holdMs = 2200,
}: {
  onComplete?: () => void;
  holdMs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const holdingRef = useRef(false);
  const progressRef = useRef(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let last = performance.now();

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 380 ? 90 : 130;
      const s = Math.min(w, h) / 42;
      nodes = Array.from({ length: count }, (_, i) => {
        const t = (i / count) * Math.PI * 2;
        const target = heartPoint(t, w / 2, h / 2 + h * 0.06, s);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: target.x,
          ty: target.y,
          r: 1 + Math.random() * 1.8,
          hue: 340 + Math.random() * 20,
        };
      });
    };
    build();

    const frame = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;

      const dir = holdingRef.current || doneRef.current ? 1 : -1;
      progressRef.current = Math.max(
        0,
        Math.min(1, progressRef.current + (dir * dt) / holdMs),
      );
      const p = progressRef.current;
      const eased = p * p * (3 - 2 * p);

      if (p >= 1 && !doneRef.current) {
        doneRef.current = true;
        setDone(true);
        tap([12, 60, 18]);
        onComplete?.();
      }

      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += (n.tx - n.x) * 0.035 * eased;
        n.y += (n.ty - n.y) * 0.035 * eased;
        if (!holdingRef.current && !doneRef.current) {
          n.x += (Math.random() - 0.5) * 0.5;
          n.y += (Math.random() - 0.5) * 0.5;
        }
        const glow = 0.18 + eased * 0.72;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + eased * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 85%, ${62 + eased * 12}%, ${glow})`;
        ctx.shadowBlur = 8 + eased * 16;
        ctx.shadowColor = `hsla(${n.hue}, 90%, 70%, ${glow})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [holdMs, onComplete]);

  const start = useCallback(() => {
    if (doneRef.current) return;
    holdingRef.current = true;
    tap(6);
  }, []);
  const end = useCallback(() => {
    holdingRef.current = false;
  }, []);

  return (
    <div className="relative select-none">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="h-64 w-full rounded-3xl sm:h-72"
        style={{ touchAction: "none" }}
      />
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-2">
        <span
          className={`text-xs tracking-[0.28em] uppercase transition-opacity duration-700 ${
            done ? "text-primary opacity-100" : "text-muted-foreground opacity-70"
          }`}
        >
          {done ? "hug delivered" : "press and hold"}
        </span>
      </div>
      <button
        type="button"
        aria-label="Press and hold for a hug"
        onPointerDown={start}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 rounded-3xl outline-none transition-transform duration-300 active:scale-[0.985]"
      />
    </div>
  );
}
