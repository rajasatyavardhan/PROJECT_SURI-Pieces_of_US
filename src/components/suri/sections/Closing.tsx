import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftLink } from "../SoftButton";
import { AudioPlayer } from "../AudioPlayer";

export function Closing() {
  const { closing, birthday, contact, media } = suriConfig;

  return (
    <section className="birthday-section birthday-ending relative px-5 pb-24 pt-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="birthday-eyebrow">
            {closing.eyebrow}
          </p>
          <h2 className="mt-6 font-serif text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] text-foreground">
            {birthday.endingTitle}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {closing.promise}
          </p>
        </Reveal>

        {media.voice.ready && <Reveal delay={150} className="mx-auto mt-12 max-w-md text-left">
          <AudioPlayer src={media.voice.src} title={media.voice.title} subtitle={media.voice.subtitle} />
        </Reveal>}

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
          <svg role="img" aria-label="Raja’s selected 2.1 gold circular signature emblem" viewBox="333 345 220 210" className="mx-auto mt-16 h-24 w-24 rounded-full">
            <image href="/media/signature-reference.png" width="1533" height="1023" />
          </svg>
          <p className="mt-6 text-[11px] tracking-wide text-muted-foreground/70">
            {closing.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
