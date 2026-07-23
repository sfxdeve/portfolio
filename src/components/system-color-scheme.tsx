import { ScriptOnce } from "@tanstack/react-router";
import { useEffect } from "react";

const PREFERS_DARK = "(prefers-color-scheme: dark)";

// Keep in sync with `applySystemColorScheme` — FOUC script must be a plain string.
const COLOR_SCHEME_SCRIPT = `(function(){try{var d=matchMedia('${PREFERS_DARK}').matches;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light'}catch(e){}})();`;

function applySystemColorScheme() {
  const root = document.documentElement;
  const dark = window.matchMedia(PREFERS_DARK).matches;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

/**
 * Syncs the `.dark` class and `color-scheme` on `<html>` with the OS preference.
 * Renders a one-shot SSR script so the class is set before paint (no FOUC).
 */
export function SystemColorScheme() {
  useEffect(() => {
    applySystemColorScheme();
    const media = window.matchMedia(PREFERS_DARK);
    const onChange = () => applySystemColorScheme();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return <ScriptOnce>{COLOR_SCHEME_SCRIPT}</ScriptOnce>;
}
