import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tap } from "@/lib/suri-storage";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out active:scale-[0.96] active:brightness-110 select-none";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-[var(--glow-soft)] hover:shadow-[var(--glow-strong)]",
  ghost: "border border-border/70 bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/70",
} as const;

type Variant = keyof typeof variants;

export function SoftButton({
  children,
  className,
  variant = "primary",
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        tap(8);
        onClick?.(e);
      }}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  );
}

export function SoftLink({
  children,
  className,
  variant = "primary",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a
      {...rest}
      onClick={() => tap(8)}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </a>
  );
}
