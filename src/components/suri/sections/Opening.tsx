import { suriConfig } from "@/config/suri.config";
import { Particles } from "../Particles";
import { SoftButton } from "../SoftButton";

export function Opening({ onEnter }: { onEnter: () => void }) {
  const { opening } = suriConfig;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[var(--gradient-aurora)]" />
      <Particles className="pointer-events-none absolute inset-0 h-full w-full" count={28} />

      <div className="relative z-10 max-w-md">
        <p
          className="animate-[suri-in_1.4s_cubic-bezier(0.16,1,0.3,1)_both] font-serif text-5xl leading-tight text-foreground sm:text-6xl"
          style={{ textShadow: "0 0 40px color-mix(in oklab, var(--primary) 35%, transparent)" }}
        >
          {opening.greeting}
        </p>

        <div className="mt-8 space-y-3">
          {opening.lines.map((line, i) => (
            <p
              key={line}
              className="animate-[suri-in_1.4s_cubic-bezier(0.16,1,0.3,1)_both] text-balance text-[15px] leading-relaxed text-muted-foreground"
              style={{ animationDelay: `${700 + i * 500}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className="mt-12 animate-[suri-in_1.6s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: `${700 + opening.lines.length * 500}ms` }}
        >
          <SoftButton onClick={onEnter} className="px-10 py-4 text-base">
            {opening.cta}
          </SoftButton>
          <p className="mt-5 text-[11px] tracking-[0.3em] uppercase text-muted-foreground/60">
            {opening.hint}
          </p>
        </div>
      </div>
    </section>
  );
}
