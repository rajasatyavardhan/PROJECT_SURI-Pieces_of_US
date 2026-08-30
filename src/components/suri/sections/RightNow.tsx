import { useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { HugHeart } from "../HugHeart";
import { Reveal } from "../Reveal";

export function RightNow() {
  const { rightNow } = suriConfig;
  const [hugged, setHugged] = useState(false);

  return (
    <section id="right-now" className="relative px-6 py-24">
      <div className="mx-auto max-w-md">
        <Reveal>
          <p className="text-[11px] tracking-[0.35em] uppercase text-primary/80">
            {rightNow.eyebrow}
          </p>
          <h2 className="mt-4 text-balance font-serif text-2xl leading-snug text-foreground sm:text-3xl">
            {rightNow.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {rightNow.body}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <HugHeart onComplete={() => setHugged(true)} />
        </Reveal>

        <p
          className={`mt-6 text-center text-[15px] leading-relaxed text-muted-foreground transition-all duration-1000 ${
            hugged ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {rightNow.hugAfter}
        </p>
      </div>
    </section>
  );
}
