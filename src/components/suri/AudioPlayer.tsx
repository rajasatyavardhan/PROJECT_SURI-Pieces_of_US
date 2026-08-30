import { useEffect, useRef, useState } from "react";
import { Pause, Play, Mic } from "lucide-react";
import { tap } from "@/lib/suri-storage";

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/** Elegant minimal audio player with a static waveform that lights up as it plays. */
export function AudioPlayer({
  src,
  title,
  subtitle,
}: {
  src: string;
  title: string;
  subtitle?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const bars = useRef(
    Array.from({ length: 44 }, (_, i) => 0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75),
  ).current;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    tap(8);
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const pct = duration ? time / duration : 0;

  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause voice note" : "Play voice note"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--glow-soft)] transition-transform duration-300 active:scale-90"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-foreground">{title}</p>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
          <div className="mt-2 flex h-8 items-center gap-[3px]">
            {bars.map((b, i) => {
              const active = i / bars.length <= pct;
              return (
                <span
                  key={i}
                  className={`w-[3px] rounded-full transition-colors duration-300 ${
                    active ? "bg-primary" : "bg-muted-foreground/25"
                  }`}
                  style={{ height: `${b * 100}%` }}
                />
              );
            })}
          </div>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

export function AudioPlaceholder({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-border/70 bg-card/30 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground">
        <Mic className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-foreground/80">Voice note placeholder</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
