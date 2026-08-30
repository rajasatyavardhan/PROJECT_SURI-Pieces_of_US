import { useEffect, useRef, useState } from "react";
import { suriConfig } from "@/config/suri.config";
import { Reveal } from "../Reveal";
import { EditableText } from "../EditableText";
import { loadText, tap } from "@/lib/suri-storage";

function Tile({ id, label, text }: { id: string; label: string; text: string }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>(text);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressed = useRef(false);

  useEffect(() => {
    setValue(loadText(`msg:${id}`, text));
  }, [id, text]);

  const down = () => {
    longPressed.current = false;
    timer.current = setTimeout(() => {
      longPressed.current = true;
      tap([10, 40, 10]);
      setOpen(true);
      setEditing(true);
    }, 550);
  };
  const up = () => {
    if (timer.current) clearTimeout(timer.current);
    if (!longPressed.current) {
      tap(8);
      setOpen((o) => !o);
    }
  };

  return (
    <div
      onPointerDown={down}
      onPointerUp={up}
      onPointerLeave={() => timer.current && clearTimeout(timer.current)}
      onContextMenu={(e) => e.preventDefault()}
      className={`cursor-pointer select-none rounded-2xl border p-4 transition-all duration-500 active:scale-[0.98] ${
        open
          ? "border-primary/40 bg-primary/[0.07] shadow-[var(--glow-soft)]"
          : "border-border/60 bg-background/40 hover:border-primary/30"
      }`}
    >
      <p className="text-[11px] tracking-[0.22em] uppercase text-primary/75">{label}</p>
      <div
        className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <EditableText
            storageKey={`msg:${id}`}
            value={value}
            onChange={setValue}
            editing={editing}
            setEditing={setEditing}
            defaultValue={text}
            className="text-[15px] leading-relaxed text-foreground"
          />
        </div>
      </div>
      {!open && (
        <p className="mt-2 text-xs text-muted-foreground/60">tap to reveal</p>
      )}
    </div>
  );
}

export function LoveMessages() {
  const { messages } = suriConfig;
  return (
    <Reveal className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl text-foreground">{messages.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{messages.subtitle}</p>
      <div className="mt-5 grid gap-3">
        {messages.items.map((m) => (
          <Tile key={m.id} id={m.id} label={m.label} text={m.text} />
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] tracking-wide text-muted-foreground/60">
        {messages.editHint}
      </p>
    </Reveal>
  );
}
