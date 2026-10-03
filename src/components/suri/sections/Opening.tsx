import { suriConfig } from "@/config/suri.config";
import { Particles } from "../Particles";
import { SoftButton } from "../SoftButton";

export function Opening({ onEnter }: { onEnter: () => void }) {
  const { opening, birthday } = suriConfig;

  return (
    <section className="birthday-hero relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 py-16 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-aurora)]" />
      <Particles className="pointer-events-none absolute inset-0 h-full w-full" count={28} />
      <div className="birthday-orbit birthday-orbit-one" aria-hidden="true" />
      <div className="birthday-orbit birthday-orbit-two" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="max-w-3xl text-center lg:text-left">
          <p className="birthday-eyebrow animate-[suri-in_1s_ease-out_both]">{birthday.eyebrow}</p>
          <h1 className="mt-5 animate-[suri-in_1.2s_ease-out_both] font-serif text-[clamp(4.2rem,12vw,9rem)] leading-[0.85] tracking-[-0.035em] text-foreground">
            Happy <span className="text-primary">20th</span><br />Birthday
          </h1>
          <p className="mt-7 animate-[suri-in_1.3s_ease-out_both] text-sm font-semibold tracking-[0.18em] text-foreground sm:text-lg sm:tracking-[0.24em]" style={{ animationDelay: "200ms" }}>
            MADIREDDY SAI SUSRITHA
          </p>
          <p className="mx-auto mt-6 max-w-xl animate-[suri-in_1.3s_ease-out_both] text-balance text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0" style={{ animationDelay: "350ms" }}>
            {birthday.wish} <span className="text-foreground">{birthday.dedication}</span>
          </p>
          <div className="mt-9 animate-[suri-in_1.3s_ease-out_both]" style={{ animationDelay: "500ms" }}>
            <SoftButton onClick={onEnter} className="min-h-12 px-8 py-3 text-sm sm:text-base">{opening.cta}</SoftButton>
            <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">{opening.hint}</p>
          </div>
        </div>

        <div className="birthday-hero-portrait mx-auto flex w-full max-w-[360px] items-center justify-center lg:max-w-[450px]" aria-label="Portrait space reserved for Suri's chosen hero photo">
          {suriConfig.media.hero.ready ? <img src={suriConfig.media.hero.src} alt={suriConfig.media.hero.alt} className="h-full w-full rounded-[inherit] object-cover" /> : <div className="birthday-portrait-inner">
            <span className="font-serif text-7xl text-primary/80 sm:text-8xl" aria-hidden="true">S</span>
            <span className="mt-3 text-center text-[11px] uppercase tracking-[0.24em] text-foreground/70">Her favourite portrait<br />will appear here</span>
          </div>}
          <span className="birthday-portrait-caption">For Suri, with love · 07.10.2006</span>
        </div>
      </div>
      <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Keep going ↓</span>
    </section>
  );
}
