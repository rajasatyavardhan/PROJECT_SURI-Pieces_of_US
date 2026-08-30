import { useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";

export function Comfort() {
  const { comfort } = suriConfig;
  const [index, setIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0);

  const next = () => {
    setIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % comfort.cards.length;
    });
    setKey((k) => k + 1);
  };

  return (
    <Reveal className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl text-foreground">{comfort.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{comfort.subtitle}</p>

      <div className="mt-5 flex min-h-28 items-center rounded-2xl border border-border/50 bg-background/40 p-5">
        {index === null ? (
          <p className="text-sm text-muted-foreground/70">Nothing yet. Ask for one.</p>
        ) : (
          <p
            key={key}
            className="animate-[suri-in_900ms_cubic-bezier(0.16,1,0.3,1)_both] text-balance text-[15px] leading-relaxed text-foreground"
          >
            {comfort.cards[index]}
          </p>
        )}
      </div>

      <SoftButton variant="ghost" className="mt-5 w-full" onClick={next}>
        {comfort.button}
      </SoftButton>
    </Reveal>
  );
}
