import { useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";

const heartRows = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];
const heartCells = heartRows.join("").split("");

export function WorldIntro() {
  const { birthday } = suriConfig;
  return (
    <section id="suri-world" className="birthday-section birthday-world px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="birthday-eyebrow">01 / A little world</p>
          <h2 className="birthday-title mt-5">{birthday.worldTitle}</h2>
          <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">{birthday.worldNote}</p>
          <div className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-full border border-primary/25 bg-primary/5 px-5 py-3 text-sm text-foreground/85">
            <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Together since 21 April 2024</span>
          </div>
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
  const { birthday, memories } = suriConfig;
  const approved = memories.filter(memory => memory.ready);
  const [burst, setBurst] = useState(0);
  let photoIndex = 0;

  return (
    <section className="birthday-section birthday-sky px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="photo-sky-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="birthday-eyebrow">05 / The sky we made</p>
          <h2 id="photo-sky-title" className="birthday-title mt-5">{birthday.skyTitle}</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{birthday.skyBody}</p>
          <p className="mt-5 text-sm leading-relaxed text-primary/80">This is a preview. The final photo fireworks and 556-piece mosaic wait for your approved favourites.</p>
          <SoftButton type="button" onClick={() => setBurst(previous => previous + 1)} className="mt-8 min-h-12 px-7 py-3">
            <Sparkles className="mr-2 inline h-4 w-4" aria-hidden="true" /> Send a little love skyward
          </SoftButton>
        </Reveal>
        <Reveal delay={130} className="birthday-sky-stage" aria-label="Heart-shaped preview of the future photo mosaic">
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
  const cutStartX = useRef<number | null>(null);

  const finishCut = (endX: number) => {
    if (stage === "wished" && cutStartX.current !== null && Math.abs(endX - cutStartX.current) > 55) {
      setStage("cut");
    }
    cutStartX.current = null;
  };

  return (
    <section className="birthday-section px-5 py-24 text-center sm:px-10" aria-labelledby="cake-title">
      <Reveal className="mx-auto max-w-3xl">
        <p className="birthday-eyebrow">06 / A playful little pause</p>
        <h2 id="cake-title" className="birthday-title mt-5">{suriConfig.birthday.cakeTitle}</h2>
        <p className="mt-5 text-base text-muted-foreground">Make a wish, blow out the candle, then swipe across the chocolate cake to cut the first slice.</p>
        <div
          className={`birthday-cake-scene ${stage === "wished" ? "birthday-cake-ready" : ""}`}
          role="img"
          aria-label={stage === "lit" ? "A chocolate birthday cake with a lit candle" : stage === "cut" ? "A sliced chocolate birthday cake" : "A chocolate birthday cake ready to cut"}
          onPointerDown={event => { if (stage === "wished") cutStartX.current = event.clientX; }}
          onPointerUp={event => finishCut(event.clientX)}
          onPointerCancel={() => { cutStartX.current = null; }}
        >
          <span className={`birthday-flame ${stage === "lit" ? "" : "birthday-flame-out"}`} />
          <span className="birthday-candle" />
          <span className={`birthday-cake-top ${stage === "cut" ? "birthday-cake-cut" : ""}`} />
          <span className="birthday-cake-base" />
          <span className={`birthday-cake-slice ${stage === "cut" ? "birthday-cake-slice-served" : ""}`} />
          <span className="birthday-cake-plate" />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {stage === "lit" && <SoftButton type="button" onClick={() => setStage("wished")}>Blow out the candle ✨</SoftButton>}
          {stage === "wished" && <SoftButton type="button" onClick={() => setStage("cut")}>Cut the cake 🎂</SoftButton>}
          {stage === "cut" && <SoftButton type="button" onClick={() => setStage("lit")}>Make another wish</SoftButton>}
        </div>
        <p role="status" className="mt-6 min-h-6 font-serif text-2xl text-primary">{stage === "wished" ? "Wish made. I hope every bit comes true." : stage === "cut" ? "The first slice is yours, birthday girl." : ""}</p>
      </Reveal>
    </section>
  );
}
