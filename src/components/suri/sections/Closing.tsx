import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftLink } from "../SoftButton";

export function Closing() {
  const { closing, contact } = suriConfig;
  const tiles = Array.from({ length: closing.mosaicTiles });

  return (
    <section className="relative px-6 pb-24 pt-10">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <p className="text-[11px] tracking-[0.35em] uppercase text-primary/80">
            {closing.eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-snug text-foreground">
            {closing.title}
          </h2>
          <p className="mt-4 text-balance text-[15px] leading-relaxed text-muted-foreground">
            {closing.promise}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-9">
          <div className="grid grid-cols-6 gap-2">
            {tiles.map((_, i) => {
              const filled = i < closing.mosaicFilled;
              return (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 90}ms` }}
                  className={`aspect-square rounded-md border ${
                    filled
                      ? "animate-[suri-pulse_5s_ease-in-out_infinite] border-primary/50 bg-primary/25"
                      : "animate-[suri-breathe_6s_ease-in-out_infinite] border-border/50 bg-foreground/[0.03]"
                  }`}
                />
              );
            })}
          </div>
          <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-muted-foreground/50">
            {closing.mosaicTiles - closing.mosaicFilled} {closing.mosaicCaption}
          </p>
        </Reveal>

        <Reveal delay={220} className="mt-10 flex flex-wrap justify-center gap-3">
          {contact.primary.enabled && (
            <SoftLink href={contact.primary.href} target="_blank" rel="noreferrer">
              {contact.primary.label}
            </SoftLink>
          )}
          {contact.secondary.enabled && (
            <SoftLink variant="ghost" href={contact.secondary.href} target="_blank" rel="noreferrer">
              {contact.secondary.label}
            </SoftLink>
          )}
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-10 text-[11px] tracking-wide text-muted-foreground/50">
            {closing.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
