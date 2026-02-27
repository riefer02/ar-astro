import { useRef, useCallback } from "react";
import type { Direction } from "@/lib/games/types";

/**
 * Manages touch-driven input state.
 * The direction ref is read every game-loop tick (same pattern as keyboard keys).
 * Action callbacks are meant to be wired to TouchControls button events.
 */
export function useTouch() {
  const directionRef = useRef<Direction | null>(null);

  const onDpadStart = useCallback((dir: Direction) => {
    directionRef.current = dir;
  }, []);

  const onDpadEnd = useCallback(() => {
    directionRef.current = null;
  }, []);

  return { directionRef, onDpadStart, onDpadEnd };
}
