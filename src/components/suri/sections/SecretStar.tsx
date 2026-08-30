import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { suriConfig } from "@/config/suri.config";
import { EditableText } from "../EditableText";
import { loadText, tap } from "@/lib/suri-storage";

const KEY = "secret-message";

/** A discreet star, hiding in the layout. Tap it to open the secret note. */
export function SecretStar() {
  const { secret } = suriConfig;
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>(secret.message);

  useEffect(() => {
    setValue(loadText(KEY, secret.message));
  }, [secret.message]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Something hidden"
        onClick={() => {
          tap([8, 30, 8]);
          setOpen(true);
        }}
        className="group mx-auto block p-3 opacity-40 transition-opacity duration-700 hover:opacity-100 active:scale-90"
      >
        <Sparkles className="h-4 w-4 animate-[suri-twinkle_4.5s_ease-in-out_infinite] text-primary" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 px-5 backdrop-blur-md animate-[suri-fade_500ms_ease-out_both]"
          onClick={() => !editing && setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md animate-[suri-in_800ms_cubic-bezier(0.16,1,0.3,1)_both] rounded-3xl border border-primary/25 bg-card/90 p-6 shadow-[var(--glow-strong)]"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground transition-transform active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-[11px] tracking-[0.3em] uppercase text-primary/80">
              {secret.foundLabel}
            </p>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground">
              {secret.title}
            </h3>
            <div className="mt-4">
              <EditableText
                storageKey={KEY}
                value={value}
                onChange={setValue}
                editing={editing}
                setEditing={setEditing}
                defaultValue={secret.message}
                saveLabel={secret.saveLabel}
                resetLabel={secret.resetLabel}
                className="text-[15px] leading-relaxed text-muted-foreground"
              />
            </div>
            {!editing && (
              <div className="mt-5 flex items-center justify-between">
                <span className="font-serif text-sm text-primary">{secret.signature}</span>
                <button
                  type="button"
                  onClick={() => {
                    tap(8);
                    setEditing(true);
                  }}
                  className="text-xs text-muted-foreground underline underline-offset-4"
                >
                  {secret.editLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
