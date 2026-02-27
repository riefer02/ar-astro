import { useCallback, type MutableRefObject } from "react";
import type { Direction } from "@/lib/games/types";
import { MOVEMENT_KEYS } from "@/lib/games/constants";

/**
 * Unified input adapter that merges keyboard and touch direction queries.
 * `usePlayer` calls `isDirectionActive(dir)` each tick — this checks both sources.
 */
export function useInput({
  keyboard,
  touchDirection,
}: {
  keyboard: { isAnyKeyPressed: (keys: Set<string>) => boolean };
  touchDirection: MutableRefObject<Direction | null>;
}) {
  const isDirectionActive = useCallback(
    (dir: Direction): boolean => {
      if (keyboard.isAnyKeyPressed(MOVEMENT_KEYS[dir])) return true;
      return touchDirection.current === dir;
    },
    [keyboard, touchDirection],
  );

  return { isDirectionActive };
}
