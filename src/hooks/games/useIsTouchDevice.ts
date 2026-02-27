import { useState, useEffect } from "react";

/**
 * Returns true when the primary pointer is coarse (finger / stylus),
 * i.e. a phone or tablet without a mouse connected.
 * Listens for changes so it updates if a user docks a tablet with a keyboard.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isTouch;
}
