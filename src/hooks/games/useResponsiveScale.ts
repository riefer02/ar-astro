import { useState, useEffect, type RefObject } from "react";
import { GAME_WIDTH } from "@/lib/games/constants";

/**
 * Observes a container's width and returns a CSS scale factor
 * so the fixed-size game canvas fits within the available space.
 * Never scales above 1 (native resolution).
 */
export function useResponsiveScale(
  containerRef: RefObject<HTMLElement | null>,
) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setScale(Math.min(1, width / GAME_WIDTH));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return scale;
}
