import { useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { SoftButton } from "../SoftButton";
import { tap } from "@/lib/suri-storage";

export function Diagnostic() {
  const { diagnostic } = suriConfig;
  const [step, setStep] = useState(-1); // -1 idle, 0..n-1 questions, n result
  const [score, setScore] = useState(0);

  const total = diagnostic.questions.length;
  const question = step >= 0 && step < total ? diagnostic.questions[step] : null;
  const result =
    step >= total ? diagnostic.results[score % diagnostic.results.length] : null;

  const answer = (i: number) => {
    tap(8);
    setScore((s) => s + i + 1);
    setStep((s) => s + 1);
  };

  return (
    <Reveal className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl text-foreground">{diagnostic.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{diagnostic.subtitle}</p>

      <div className="mt-5 min-h-44">
        {step === -1 && (
          <SoftButton className="w-full" onClick={() => setStep(0)}>
            {diagnostic.startButton}
          </SoftButton>
        )}

        {question && (
          <div key={step} className="animate-[suri-in_700ms_cubic-bezier(0.16,1,0.3,1)_both]">
            <div className="mb-4 flex gap-1.5">
              {diagnostic.questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
            <p className="text-[15px] text-foreground">{question.q}</p>
            <div className="mt-4 grid gap-2">
              {question.options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => answer(i)}
                  className="rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-left text-sm text-foreground/90 transition-all duration-300 active:scale-[0.97] hover:border-primary/50 hover:bg-background/70"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="animate-[suri-in_900ms_cubic-bezier(0.16,1,0.3,1)_both]">
            <p className="font-serif text-lg text-primary">{result.title}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {result.body}
            </p>
            <SoftButton
              variant="ghost"
              className="mt-5 w-full"
              onClick={() => {
                setStep(0);
                setScore(0);
              }}
            >
              {diagnostic.restartButton}
            </SoftButton>
          </div>
        )}
      </div>
    </Reveal>
  );
}
