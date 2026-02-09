import { useCallback } from "react";
import type { Direction, InteractiveObject, Position } from "@/lib/games/types";
import { FACING_DISTANCE, INTERACTION_RANGE } from "@/lib/games/constants";
import { getFacingPosition } from "@/lib/games/direction-utils";
import { findClosestObject } from "@/lib/games/collision";

/**
 * Provides interaction proximity detection using collision utils.
 */
export function useGameObjects({
  objects,
}: {
  objects: InteractiveObject[];
}) {
  const getFacingObject = useCallback(
    (pos: Position, dir: Direction): InteractiveObject | null => {
      const facingPos = getFacingPosition(pos, dir, FACING_DISTANCE);
      return findClosestObject(facingPos, objects, INTERACTION_RANGE);
    },
    [objects],
  );

  return { getFacingObject };
}
