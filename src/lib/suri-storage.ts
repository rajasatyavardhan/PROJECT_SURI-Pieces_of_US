/**
 * Tiny on-device persistence for the editable messages.
 * No accounts, no network, no analytics — just localStorage on her phone.
 */
const PREFIX = "project-suri:";

export function loadText(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(PREFIX + key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveText(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    /* private mode — silently ignore */
  }
}

export function clearText(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}

/** Gentle haptic-like feedback on press (no-op where unsupported). */
export function tap(pattern: number | number[] = 8) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}
