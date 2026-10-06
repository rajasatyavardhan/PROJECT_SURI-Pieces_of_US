import { useEffect, useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";

const torontoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Toronto",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});
const localClocks = [
  { label: "Raja · Toronto", zone: "America/Toronto" },
  { label: "Suri · Vietnam", zone: "Asia/Ho_Chi_Minh" },
].map(clock => ({ ...clock, formatter: new Intl.DateTimeFormat("en-CA", {
  timeZone: clock.zone, month: "short", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
}) }));
const birthdayInstant = new Date("2026-10-07T00:00:00+07:00");

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
    <time dateTime={start} className="birthday-together-since">Since 21 April 2024 · 6:00 a.m. Toronto / 5:00 p.m. Vietnam</time>
    <div className="suri-local-clocks">
      {localClocks.map(clock => <div key={clock.zone}><span>{clock.label}</span><time dateTime={now?.toISOString()}>{now ? clock.formatter.format(now) : "—"}</time></div>)}
    </div>
    <p className="mt-4 text-xs leading-relaxed text-primary" aria-live="off">
      {now ? now >= birthdayInstant ? "It's your birthday in Vietnam. Happy 20th, Bujjodaa! ♡" : (() => {
        const seconds = Math.max(0, Math.ceil((birthdayInstant.getTime() - now.getTime()) / 1000));
        return `Your birthday begins in ${Math.floor(seconds / 86400)}d ${Math.floor(seconds / 3600) % 24}h ${Math.floor(seconds / 60) % 60}m ${seconds % 60}s · midnight Vietnam / 1 p.m. Toronto, 6 October`;
      })() : "Two time zones. One little us."}
    </p>
  </div>;
}

export function WorldIntro() {
  const { birthday } = suriConfig;
  return (
    <section id="suri-world" className="birthday-section birthday-world px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="birthday-eyebrow">A little world</p>
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
          <p className="birthday-eyebrow">Before and after we met</p>
          <h2 id="suri-story-title" className="birthday-title mt-5">Every version of <em className="text-primary">you.</em></h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">A little journey from childhood to now, with your favourite moments finding their places along the way.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
          {birthday.chapters.map((chapter, index) => (
            <Reveal key={chapter.number} delay={index * 90} className="birthday-story-card">
              <div className="birthday-story-image" role="img" aria-label={chapter.mediaLabel}>
                {chapter.ready ? <img src={chapter.imageSrc} alt={chapter.mediaLabel} loading="lazy" className="h-full w-full object-contain" /> : <>
                  <span className="font-serif text-6xl text-primary/45">{chapter.number}</span>
                  <span className="mt-3 max-w-36 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{chapter.mediaLabel}</span>
                </>}
              </div>
              <div className="p-6">
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

export function MbbsChapter() {
  const chapter = suriConfig.mbbs;
  return <section className="birthday-section px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="mbbs-title">
    <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
      <Reveal>
        <p className="birthday-eyebrow">Future doctor gaaru</p>
        <h2 id="mbbs-title" className="birthday-title mt-5">{chapter.title}</h2>
        <p className="mt-6 max-w-xl font-serif text-2xl leading-relaxed text-primary">{chapter.note}</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{chapter.caption}</p>
      </Reveal>
      <Reveal delay={100} className="birthday-story-card">
        <img src={chapter.imageSrc} alt={chapter.imageAlt} loading="lazy" className="max-h-[70svh] w-full object-contain" />
      </Reveal>
    </div>
    {chapter.videos.length > 0 && <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2">
      {chapter.videos.map(video => <figure key={video.src}>
        <video controls playsInline preload="none" poster={video.poster} className="max-h-[70svh] w-full rounded-2xl">
          <source src={video.src} />
          Your browser cannot play this video.
        </video>
        <figcaption className="mt-3 text-sm text-muted-foreground">{video.title}</figcaption>
      </figure>)}
    </div>}
  </section>;
}


export { ChocolateCake as BirthdayCake } from "./ChocolateCake";
