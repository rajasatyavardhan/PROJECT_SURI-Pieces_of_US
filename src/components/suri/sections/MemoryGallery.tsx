import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { suriConfig, type SuriMemory } from "@/config/suri.config";
import { SoftButton } from "../SoftButton";
import { Reveal } from "../Reveal";

const memories = suriConfig.memories;

function MemoryImage({ memory, onError, className }: {
  memory: SuriMemory;
  onError: () => void;
  className?: string;
}) {
  return (
    <img
      src={memory.imageSrc}
      alt={memory.alt}
      loading="lazy"
      decoding="async"
      onError={onError}
      className={className}
    />
  );
}

function MemoryDetails({ memory, large = false }: { memory: SuriMemory; large?: boolean }) {
  return (
    <div className={large ? "space-y-2" : "space-y-1.5"}>
      {(memory.dateLabel || memory.locationLabel) && (
        <div className="flex flex-wrap gap-1.5">
          {memory.dateLabel && <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{memory.dateLabel}</span>}
          {memory.locationLabel && <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{memory.locationLabel}</span>}
        </div>
      )}
      <p className={large ? "font-serif text-2xl text-foreground" : "font-serif text-lg leading-tight text-foreground"}>{memory.title}</p>
      {memory.shortCaption && <p className={large ? "text-sm leading-relaxed text-muted-foreground" : "text-xs leading-relaxed text-muted-foreground"}>{memory.shortCaption}</p>}
      {memory.tags.length > 0 && <p className="text-[11px] text-primary/70">{memory.tags.map(tag => `#${tag}`).join("  ")}</p>}
    </div>
  );
}

export function MemoryGallery() {
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const readyMemories = memories.filter(memory => memory.ready && !failedIds.has(memory.id));
  const activeIndex = readyMemories.findIndex(memory => memory.id === activeId);
  const active = activeIndex >= 0 ? readyMemories[activeIndex] : undefined;
  const revealed = memories.filter(memory => memory.ready).length;

  const markFailed = (id: string) => {
    setFailedIds(previous => new Set(previous).add(id));
    if (activeId === id) setActiveId(null);
  };

  useEffect(() => {
    if (activeId === null) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [activeId !== null]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveId(null);
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        setActiveId(readyMemories[(activeIndex + offset + readyMemories.length) % readyMemories.length].id);
      } else if (event.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? []);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, activeIndex, readyMemories.length]);

  const step = (offset: number) => {
    if (!readyMemories.length || activeIndex < 0) return;
    setActiveId(readyMemories[(activeIndex + offset + readyMemories.length) % readyMemories.length].id);
  };

  return (
    <section aria-labelledby="memories-heading" className="relative px-6 pb-16 pt-10">
      <div className="mx-auto max-w-md">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="memories-heading" className="font-serif text-3xl text-foreground">Pieces of us</h2>
              <p className="mt-1 text-sm text-muted-foreground">Little moments I keep returning to.</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-primary/75">{revealed} of {memories.length} revealed</p>
        </Reveal>

        <div className="mt-7 grid grid-cols-2 items-start gap-x-3 gap-y-5">
          {memories.map((memory, index) => {
            const available = memory.ready && !failedIds.has(memory.id);
            const portrait = index % 4 === 0 || index % 4 === 3;
            const mediaClass = `relative w-full overflow-hidden rounded-md border border-border/60 ${portrait ? "aspect-[3/4]" : "aspect-[4/3]"}`;
            return (
              <Reveal key={memory.id} as="div" className={index % 2 ? "pt-7" : ""}>
                {available ? (
                  <SoftButton
                    variant="ghost"
                    type="button"
                    aria-label={`View ${memory.title}`}
                    onClick={() => setActiveId(memory.id)}
                    className="block w-full rounded-none border-0 bg-transparent p-0 text-left shadow-none hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span className="block w-full">
                      <span className={`block ${mediaClass}`}>
                        <MemoryImage memory={memory} onError={() => markFailed(memory.id)} className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none" />
                      </span>
                      <span className="mt-3 block"><MemoryDetails memory={memory} /></span>
                    </span>
                  </SoftButton>
                ) : (
                  <div className="w-full" aria-label={`${memory.title}, not yet revealed`}>
                    <div className={`${mediaClass} memory-placeholder flex items-center justify-center`}>
                      <span className="relative font-serif text-2xl text-foreground/80">Piece {String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {active && typeof document !== "undefined" && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title}, piece ${activeIndex + 1} of ${readyMemories.length}`}
          className="fixed inset-0 z-50 flex flex-col bg-background/98 text-foreground"
          onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
          onTouchEnd={event => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4">
            <span className="text-xs tracking-wide text-muted-foreground">{activeIndex + 1} / {readyMemories.length}</span>
            <SoftButton ref={closeRef} type="button" variant="ghost" aria-label="Close gallery" title="Close" onClick={() => setActiveId(null)} className="h-11 w-11 rounded-full p-0"><X className="h-5 w-5" /></SoftButton>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-4">
            <img src={active.imageSrc} alt={active.alt} onError={() => markFailed(active.id)} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="mx-auto w-full max-w-md shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <MemoryDetails memory={active} large />
            <div className="mt-5 flex justify-between gap-3">
              <SoftButton type="button" variant="ghost" aria-label="Previous memory" title="Previous" onClick={() => step(-1)} disabled={readyMemories.length < 2} className="h-12 w-12 p-0 disabled:opacity-40"><ArrowLeft className="h-5 w-5" /></SoftButton>
              <SoftButton type="button" variant="ghost" aria-label="Next memory" title="Next" onClick={() => step(1)} disabled={readyMemories.length < 2} className="h-12 w-12 p-0 disabled:opacity-40"><ArrowRight className="h-5 w-5" /></SoftButton>
            </div>
          </div>
        </div>, document.body
      )}
    </section>
  );
}