import { cn } from "@/lib/utils";
import { clearText, saveText, tap } from "@/lib/suri-storage";

/**
 * A block of text she can rewrite. Saves to this device only (localStorage).
 * Defaults always live in src/config/suri.config.ts.
 */
export function EditableText({
  storageKey,
  value,
  onChange,
  editing,
  setEditing,
  defaultValue,
  className,
  saveLabel = "Save",
  resetLabel = "Restore original",
}: {
  storageKey: string;
  value: string;
  onChange: (v: string) => void;
  editing: boolean;
  setEditing: (v: boolean) => void;
  defaultValue: string;
  className?: string;
  saveLabel?: string;
  resetLabel?: string;
}) {
  if (!editing) return <p className={className}>{value}</p>;

  return (
    <div onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}>
      <textarea
        value={value}
        autoFocus
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full resize-none rounded-xl border border-primary/40 bg-background/70 p-3 text-[15px] leading-relaxed text-foreground outline-none focus:border-primary",
          className,
        )}
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => {
            tap(8);
            saveText(storageKey, value);
            setEditing(false);
          }}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-transform active:scale-95"
        >
          {saveLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            tap(8);
            clearText(storageKey);
            onChange(defaultValue);
            setEditing(false);
          }}
          className="rounded-full border border-border/70 px-4 py-1.5 text-xs text-muted-foreground transition-transform active:scale-95"
        >
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
