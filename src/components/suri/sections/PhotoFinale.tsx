import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import mosaics from "@/config/mosaic.generated.json";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";

type Scene = { target: string; columns: number; rows: number; tiles: { src: string; cell: number; color?: number[] }[] };
type Stage = "waiting" | "loading" | "flying" | "gathering" | "complete" | "error";
type Design = "photo" | "heart" | "R" | "S";
const ease = (value: number) => { const t = Math.min(1, Math.max(0, value)); return t * t * (3 - 2 * t); };

export function MosaicScene({ scene, index }: { scene: Scene; index: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef(0);
  const running = useRef(false);
  const mounted = useRef(true);
  const skip = useRef(false);
  const loaded = useRef<HTMLImageElement[] | null>(null);
  const [design, setDesign] = useState<Design>("photo");
  const [stage, setStage] = useState<Stage>("waiting");
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; running.current = false; cancelAnimationFrame(frame.current); };
  }, []);

  async function launch(nextDesign: Design = design) {
    const design = nextDesign;
    if (running.current) return;
    cancelAnimationFrame(frame.current);
    running.current = true;
    skip.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canvas.current?.scrollIntoView({ behavior: skip.current ? "auto" : "smooth", block: "center" });
    setStage("loading");
    const load = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("A memory could not load"));
      image.src = src;
    });
    try {
      const assets = loaded.current ?? await Promise.all([load(scene.target), ...scene.tiles.map(tile => load(tile.src))]);
      loaded.current = assets;
      const [target, ...images] = assets;
      if (!target) throw new Error("Mosaic target unavailable");
      if (!mounted.current) return;
      const context = canvas.current?.getContext("2d", { alpha: false });
      if (!context) throw new Error("Canvas unavailable");
      const width = 720, height = 960;
      const mask = document.createElement("canvas");
      mask.width = width; mask.height = height;
      const maskContext = mask.getContext("2d");
      if (!maskContext) throw new Error("Shape canvas unavailable");
      maskContext.fillStyle = "white";
      if (design === "photo") maskContext.fillRect(0, 0, width, height);
      else if (design === "heart") {
        maskContext.beginPath();
        maskContext.moveTo(360, 235);
        maskContext.bezierCurveTo(90, 5, -45, 390, 360, 800);
        maskContext.bezierCurveTo(765, 390, 630, 5, 360, 235);
        maskContext.fill();
      } else {
        maskContext.font = "bold 850px Georgia";
        maskContext.textAlign = "center"; maskContext.textBaseline = "middle";
        maskContext.fillText(design, width / 2, height / 2 + 30);
      }
      const pixels = maskContext.getImageData(0, 0, width, height).data;
      const candidates: { x: number; y: number }[] = [];
      for (let y = 8; y < height; y += 16) for (let x = 8; x < width; x += 16) {
        if ((pixels[(y * width + x) * 4 + 3] ?? 0) > 128) candidates.push({ x, y });
      }
      if (candidates.length < scene.tiles.length) throw new Error("Not enough unique shape positions");
      const placements = scene.tiles.map((tile, i) => design === "photo"
        ? { x: (tile.cell % scene.columns + .5) * width / scene.columns, y: (Math.floor(tile.cell / scene.columns) + .5) * height / scene.rows }
        : candidates[Math.floor(i * candidates.length / scene.tiles.length)]!);
      // Tint only the selected silhouette; the original picture is never stretched.
      const portrait = document.createElement("canvas"); portrait.width = width; portrait.height = height;
      const portraitContext = portrait.getContext("2d");
      if (!portraitContext) throw new Error("Portrait canvas unavailable");
      const targetRatio = Math.min(width / target.width, height / target.height);
      const tw = target.width * targetRatio, th = target.height * targetRatio;
      portraitContext.drawImage(target, (width - tw) / 2, (height - th) / 2, tw, th);
      portraitContext.globalCompositeOperation = "destination-in";
      portraitContext.drawImage(mask, 0, 0);
      const started = performance.now();
      let lastPaint = -Infinity;
      let lastStage: Stage = "loading";
      const draw = (now: number) => {
        if (!mounted.current || !running.current) return;
        const progress = skip.current ? 1 : Math.min(1, (now - started) / 14000);
        if (now - lastPaint < 32 && progress < 1) { frame.current = requestAnimationFrame(draw); return; }
        lastPaint = now;
        const nextStage: Stage = progress === 1 ? "complete" : progress < .55 ? "flying" : "gathering";
        if (nextStage !== lastStage) { setStage(nextStage); lastStage = nextStage; }
        context.globalAlpha = 1;
        context.fillStyle = "#160d21";
        context.fillRect(0, 0, width, height);
        const gathering = ease((progress - .55) / .4);
        const tileWidth = width / scene.columns, tileHeight = height / scene.rows;
        scene.tiles.forEach((tile, i) => {
          const image = images[i];
          if (!image) return;
          const angle = i * 2.399963;
          const heartX = width / 2 + 16 * Math.sin(angle) ** 3 * 17;
          const heartY = height * .40 - (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 18;
          const delay = (i % 17) * .008;
          const flight = ease((progress - delay) / .16);
          const explosion = ease((progress - .16 - delay) / .14);
          const formingHeart = ease((progress - .32) / .2);
          const rocketX = width * (.25 + (i % 4) / 6);
          const rocketY = height * (.24 + (i % 4) * .055);
          const { x: finalX, y: finalY } = placements[i]!;
          const spreadX = rocketX + Math.cos(angle) * 95 * explosion;
          const spreadY = height * .95 + (rocketY - height * .95) * flight + Math.sin(angle) * 95 * explosion;
          const burstX = spreadX + (heartX - spreadX) * formingHeart;
          const burstY = spreadY + (heartY - spreadY) * formingHeart;
          const x = burstX + (finalX - burstX) * gathering;
          const y = burstY + (finalY - burstY) * gathering;
          const w = 25 + ((design === "photo" ? tileWidth : 34) - 25) * gathering;
          const h = 34 + ((design === "photo" ? tileHeight : 43) - 34) * gathering;
          context.globalAlpha = ease((progress - delay) / .08);
          context.save();
          context.translate(x, y);
          context.rotate(Math.sin(angle) * (1 - gathering) * .23);
          // Letterbox each miniature: faces and bodies are never cropped.
          const tint = `rgb(${tile.color?.join(",") ?? "36,23,41"})`;
          context.fillStyle = gathering > .5 ? tint : "#241729";
          context.fillRect(-w / 2, -h / 2, w, h);
          const ratio = Math.min(w / image.width, h / image.height);
          const iw = image.width * ratio, ih = image.height * ratio;
          context.drawImage(image, -iw / 2, -ih / 2, iw, ih);
          context.globalAlpha *= gathering * .4;
          context.fillStyle = tint;
          context.fillRect(-w / 2, -h / 2, w, h);
          context.restore();
        });
        // A gentle target blend makes the photo legible without replacing its
        // unique memory tiles. No tile is cloned to fill an empty cell.
        context.globalAlpha = gathering * .66;
        context.drawImage(portrait, 0, 0);
        context.globalAlpha = 1;
        if (progress < 1) frame.current = requestAnimationFrame(draw);
        else running.current = false;
      };
      frame.current = requestAnimationFrame(draw);
    } catch {
      running.current = false;
      if (mounted.current) setStage("error");
    }
  }

  const busy = stage === "loading" || stage === "flying" || stage === "gathering";
  const label = stage === "loading" ? "Gathering our little memories…" : stage === "flying" ? "Look—our photos are lighting up the sky." : stage === "gathering" ? "Every little piece is finding its place…" : stage === "complete" ? "Different little memories. One favourite us." : stage === "error" ? "A photo couldn't load. Please try again." : "A sky full of memories, waiting for your touch.";
  return <div className="mosaic-scene">
    <div className="mosaic-canvas-wrap">
      <canvas ref={canvas} width={720} height={960} className="mosaic-canvas" role="img" aria-label={`Mosaic ${index + 1}: ${scene.tiles.length} different reviewed photos forming a picture of Susritha and Raja`} />
      {(stage === "waiting" || stage === "loading" || stage === "error") && <div className="mosaic-invitation"><Sparkles aria-hidden="true" size={36} /><p className="font-serif text-4xl">{index === 0 ? "A little sky. A very big us." : "One more little surprise."}</p><span>{scene.tiles.length} different memories · no repeated tiles</span></div>}
    </div>
    <p role="status" className="mosaic-status">{label}</p>
    <div className="mosaic-designs" role="group" aria-label={`Mosaic ${index + 1} design`}>
      {(["photo", "heart", "R", "S"] as Design[]).map(option => <button key={option} type="button" aria-pressed={design === option} disabled={busy} onClick={() => { setDesign(option); if (stage === "complete") void launch(option); }}>{option === "photo" ? "Full photo" : option === "heart" ? "Heart ♡" : option}</button>)}
    </div>
    <SoftButton type="button" onClick={() => void launch()} disabled={busy} className="min-h-12 px-7 py-3">{stage === "loading" ? "Gathering memories…" : busy ? "Watch the sky…" : stage === "complete" ? "Replay our photo fireworks ✨" : index === 0 ? "Light up our sky ✨" : "One more surprise ✨"}</SoftButton>
    {(stage === "flying" || stage === "gathering") && <button type="button" className="mosaic-skip" onClick={() => { skip.current = true; }}>Bring the pieces together now</button>}
  </div>;
}

export function StoryMosaic({ index }: { index: number }) {
  const scene = mosaics.scenes[index] as Scene | undefined;
  return scene ? <MosaicScene scene={scene} index={index} /> : null;
}

export function PhotoFinale() {
  return <section id="photo-finale" className="birthday-section photo-finale px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="photo-finale-title">
    <Reveal className="mx-auto max-w-3xl text-center"><p className="birthday-eyebrow">One last bit of mischief</p><h2 id="photo-finale-title" className="birthday-title mt-5">Look up, <em className="text-primary">Bujjodaa.</em></h2><p className="mt-6 text-muted-foreground">First, our little photos become fireworks. Then, every piece finds its way back to us.</p></Reveal>
    <div className="mx-auto mt-12 grid max-w-7xl gap-12 lg:grid-cols-2">{(mosaics.scenes as Scene[]).map((scene, index) => <Reveal key={scene.target} delay={index * 100}><MosaicScene scene={scene} index={index} /></Reveal>)}</div>
  </section>;
}

export function Butterflies() {
  return <div className="suri-butterflies" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} className="suri-butterfly" style={{ "--butterfly-index": index } as CSSProperties}><svg width="32" height="26" viewBox="0 0 32 26" fill="none"><path className="butterfly-left" d="M16 13C5-8-8 2 6 17c-9 9 10 8 10-4Z" fill="currentColor" /><path className="butterfly-right" d="M16 13C27-8 40 2 26 17c9 9-10 8-10-4Z" fill="currentColor" /><path d="M16 7v15" stroke="currentColor" strokeWidth="1.5" /></svg></span>)}</div>;
}
