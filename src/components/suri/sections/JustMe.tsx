import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";

export function JustMe() {
  const { justMe, media } = suriConfig;
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = media.photo.ready && !photoFailed;

  return (
    <Reveal className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl text-foreground">{justMe.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{justMe.subtitle}</p>

      <div className="mt-5">
        {showPhoto ? (
          <figure>
            <img
              src={media.photo.src}
              alt={media.photo.alt}
              loading="lazy"
              onError={() => setPhotoFailed(true)}
              className="max-h-[75svh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {media.photo.caption}
            </figcaption>
          </figure>
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-background/30 px-6 text-center">
            <ImageIcon className="h-7 w-7 text-muted-foreground" />
            <p className="text-sm text-foreground/80">Photo placeholder</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {media.photo.placeholder}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-[11px] tracking-wide text-muted-foreground/50">{justMe.note}</p>
    </Reveal>
  );
}
