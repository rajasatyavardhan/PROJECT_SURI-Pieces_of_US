import { type PointerEvent, useEffect, useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";

const heartRows = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];
const heartCells = heartRows.join("").split("");
const photosPerHeart = heartCells.filter(cell => cell === "1").length;

const torontoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});

function torontoClockParts(instant: Date) {
  const parts = torontoFormatter.formatToParts(instant);
  const value = (type: string) => {
    const part = parts.find(item => item.type === type);
    if (!part) throw new Error(`Missing ${type} in Toronto clock`);
    return Number(part.value);
  };
  return { year: value("year"), month: value("month"), day: value("day"),
    hour: value("hour"), minute: value("minute"), second: value("second") };
}

function calendarElapsed(instant: Date) {
  const start = suriConfig.birthday.togetherSince;
  const begun = {
    year: Number(start.slice(0, 4)), month: Number(start.slice(5, 7)), day: Number(start.slice(8, 10)),
    hour: Number(start.slice(11, 13)), minute: Number(start.slice(14, 16)), second: Number(start.slice(17, 19)),
  };
  const current = torontoClockParts(instant);
  let { year, month, day, hour, minute, second } = current;
  if (second < begun.second) { second += 60; minute--; }
  if (minute < begun.minute) { minute += 60; hour--; }
  if (hour < begun.hour) { hour += 24; day--; }
  if (day < begun.day) {
    month--;
    const previousMonth = month === 0 ? 12 : month;
    const previousYear = month === 0 ? year - 1 : year;
    day += new Date(Date.UTC(previousYear, previousMonth, 0)).getUTCDate();
  }
  if (month < begun.month) { month += 12; year--; }
  return { years: year - begun.year, months: month - begun.month, days: day - begun.day,
    hours: hour - begun.hour, minutes: minute - begun.minute, seconds: second - begun.second };
}

function TogetherCounter() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const start = suriConfig.birthday.togetherSince;
  const duration = now ? calendarElapsed(now) : null;
  const units = [
    ["Years", duration?.years], ["Months", duration?.months], ["Days", duration?.days],
    ["Hours", duration?.hours], ["Minutes", duration?.minutes], ["Seconds", duration?.seconds],
  ] as const;

  return <div className="birthday-together" aria-label="Time together since 21 April 2024 at 6 a.m. Toronto time">
    <p className="birthday-eyebrow">Together for</p>
    <div className="birthday-together-grid" aria-live="off">
      {units.map(([label, value]) => <div key={label} className="birthday-together-unit">
        <span>{value === undefined ? "—" : value}</span><small>{label}</small>
      </div>)}
    </div>
    <time dateTime={start} className="birthday-together-since">Since 21 April 2024 · 6:00 a.m. Toronto time</time>
  </div>;
}

export function WorldIntro() {
  const { birthday } = suriConfig;
  return (
    <section id="suri-world" className="birthday-section birthday-world px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="birthday-eyebrow">01 / A little world</p>
          <h2 className="birthday-title mt-5">{birthday.worldTitle}</h2>
          <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">{birthday.worldNote}</p>
          <TogetherCounter />
        </Reveal>
        <Reveal delay={150} className="birthday-world-card">
          <div className="birthday-world-ring" aria-hidden="true" />
          <p className="relative z-10 font-serif text-5xl leading-tight sm:text-6xl">A story told in<br /><em className="text-primary">little pieces.</em></p>
          <p className="relative z-10 mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">A gentle beginning. Then some mischief. Then every photo finding its way back to us.</p>
          <span className="relative z-10 mt-10 text-[11px] uppercase tracking-[0.25em] text-primary/70">Keep scrolling ↓</span>
        </Reveal>
      </div>
    </section>
  );
}

export function SuriStory() {
  const { birthday } = suriConfig;
  return (
    <section className="birthday-section px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="suri-story-title">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="birthday-eyebrow">02 / Before and after we met</p>
          <h2 id="suri-story-title" className="birthday-title mt-5">Every version of <em className="text-primary">you.</em></h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">A little journey from childhood to now. Your chosen photographs will turn these frames into our filmstrip.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {birthday.chapters.map((chapter, index) => (
            <Reveal key={chapter.number} delay={index * 90} className="birthday-story-card">
              <div className="birthday-story-image" role="img" aria-label={chapter.mediaLabel}>
                {chapter.ready ? <img src={chapter.imageSrc} alt={chapter.mediaLabel} loading="lazy" className="h-full w-full object-cover" /> : <>
                  <span className="font-serif text-6xl text-primary/45">{chapter.number}</span>
                  <span className="mt-3 max-w-36 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{chapter.mediaLabel}</span>
                </>}
              </div>
              <div className="p-6">
                <span className="birthday-eyebrow">Chapter {chapter.number}</span>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{chapter.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhotoSky() {
  const { birthday, memories, mosaicOnlyMemories } = suriConfig;
  const approved = [...memories, ...mosaicOnlyMemories].filter(memory => memory.ready);
  const [burst, setBurst] = useState(0);
  let photoIndex = burst * photosPerHeart;

  return (
    <section className="birthday-section birthday-sky px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="photo-sky-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="birthday-eyebrow">05 / The sky we made</p>
          <h2 id="photo-sky-title" className="birthday-title mt-5">{birthday.skyTitle}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{birthday.skyBody}</p>
          <p className="mt-5 text-sm leading-relaxed text-primary/80">Each sparkle reveals another little piece. Photos left out of the main story can still belong in our sky.</p>
          <SoftButton type="button" onClick={() => setBurst(previous => previous + 1)} className="mt-8 min-h-12 px-7 py-3">
            <Sparkles className="mr-2 inline h-4 w-4" aria-hidden="true" /> Send a little love skyward
          </SoftButton>
        </Reveal>
        <Reveal delay={130} className="birthday-sky-stage" aria-label="Heart-shaped preview of the photo mosaic">
          <div className="birthday-sky-glow" aria-hidden="true" />
          <div className="birthday-heart-grid">
            {heartCells.map((cell, index) => {
              if (cell === "0") return <span key={index} aria-hidden="true" />;
              const memory = approved.length ? approved[photoIndex++ % approved.length] : undefined;
              return <span key={index} className="birthday-heart-tile" aria-hidden="true">
                {memory ? <img src={memory.imageSrc} alt="" loading="lazy" /> : <Heart className="h-4 w-4 text-primary/60" />}
              </span>;
            })}
          </div>
          {burst > 0 && <div key={burst} className="birthday-burst" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ transform: `rotate(${index * 20}deg)` }} />)}
          </div>}
          <p className="relative mt-8 text-center font-serif text-2xl text-foreground/80">All our little pieces, one heart.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function BirthdayCake() {
  const [stage, setStage] = useState<"lit" | "wished" | "cut">("lit");
  const [cutProgress, setCutProgress] = useState(0);
  const [isCutting, setIsCutting] = useState(false);
  const cutStartY = useRef<number | null>(null);

  const advanceCut = (event: PointerEvent<HTMLDivElement>) => {
    if (stage !== "wished" || cutStartY.current === null) return;
    const distance = event.clientY - cutStartY.current;
    setCutProgress(Math.max(0, Math.min(1, distance / 105)));
  };

  const finishCut = (event: PointerEvent<HTMLDivElement>) => {
    if (stage === "wished" && cutStartY.current !== null && event.clientY - cutStartY.current >= 85) {
      setStage("cut");
      setCutProgress(1);
    } else {
      setCutProgress(0);
    }
    cutStartY.current = null;
    setIsCutting(false);
  };

  return (
    <section className="birthday-section px-5 py-24 text-center sm:px-10" aria-labelledby="cake-title">
      <Reveal className="mx-auto max-w-3xl">
        <p className="birthday-eyebrow">06 / A playful little pause</p>
        <h2 id="cake-title" className="birthday-title mt-5">{suriConfig.birthday.cakeTitle}</h2>
        <p className="mt-5 text-base text-muted-foreground">Make a wish, tap the candle, then drag your finger down through the chocolate cake to cut a slice.</p>
        <div
          className={`birthday-cake-scene ${stage === "wished" ? "birthday-cake-ready" : ""}`}
          role={stage === "wished" ? "button" : "img"}
          tabIndex={stage === "wished" ? 0 : undefined}
          aria-label={stage === "lit" ? "A chocolate birthday cake with a lit candle" : stage === "cut" ? "A sliced chocolate birthday cake" : "Drag down to cut the chocolate cake, or press Enter"}
          onPointerDown={event => {
            if (stage !== "wished") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const relativeY = event.clientY - bounds.top;
            if (relativeY < 90 || relativeY > 180) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            cutStartY.current = event.clientY;
            setCutProgress(0);
            setIsCutting(true);
          }}
          onPointerMove={advanceCut}
          onPointerUp={finishCut}
          onPointerCancel={() => { cutStartY.current = null; setCutProgress(0); setIsCutting(false); }}
          onKeyDown={event => { if (stage === "wished" && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); setStage("cut"); setCutProgress(1); } }}
        >
          <span className={`birthday-flame ${stage === "lit" ? "" : "birthday-flame-out"}`} onClick={() => { if (stage === "lit") setStage("wished"); }} />
          <span className="birthday-candle" />
          <span className={`birthday-cake-top ${stage === "cut" ? "birthday-cake-cut" : ""}`} />
          <span className="birthday-cake-base" />
          <span className={`birthday-cake-slice ${stage === "cut" ? "birthday-cake-slice-served" : ""}`} />
          {stage === "wished" && <span className="birthday-cake-guide" aria-hidden="true">↓ drag here to cut</span>}
          {isCutting && <span className="birthday-cut-line" style={{ height: `${cutProgress * 125}px` }} aria-hidden="true" />}
          {isCutting && <span className="birthday-knife" style={{ top: `${95 + cutProgress * 125}px` }} aria-hidden="true">✦</span>}
          <span className="birthday-cake-plate" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {stage === "lit" && <SoftButton type="button" onClick={() => setStage("wished")}>Blow out the candle ✨</SoftButton>}
          {stage === "cut" && <SoftButton type="button" onClick={() => { setStage("lit"); setCutProgress(0); }}>Make another wish</SoftButton>}
        </div>
        <p role="status" className="mt-6 min-h-6 font-serif text-2xl text-primary">{stage === "wished" ? (isCutting ? "Keep pulling your finger down…" : "Wish made. Drag down through the cake to cut it.") : stage === "cut" ? "The first slice is yours, birthday girl." : ""}</p>
      </Reveal>
    </section>
  );
}
