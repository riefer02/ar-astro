import { useState, useCallback, useMemo } from "react";
import type {
  Direction,
  ObjectState,
  Position,
  ReactiveObject,
} from "@/lib/games/types";
import { FACING_DISTANCE, INTERACTION_RANGE } from "@/lib/games/constants";
import { getFacingPosition } from "@/lib/games/direction-utils";
import { findClosestObject } from "@/lib/games/collision";

export function useGameObjects({
  objects: initialObjects,
}: {
  objects: ReactiveObject[];
}) {
  const [objectStates, setObjectStates] = useState<Map<string, ObjectState>>(
    () => {
      const map = new Map<string, ObjectState>();
      for (const obj of initialObjects) {
        map.set(obj.id, obj.objectState);
      }
      return map;
    },
  );

  const activateObject = useCallback((id: string) => {
    setObjectStates((prev) => {
      const next = new Map(prev);
      next.set(id, "activated");
      return next;
    });
  }, []);

  const consumeObject = useCallback((id: string) => {
    setObjectStates((prev) => {
      const next = new Map(prev);
      next.set(id, "consumed");
      return next;
    });
  }, []);

  const visibleObjects = useMemo(() => {
    return initialObjects
      .filter((obj) => objectStates.get(obj.id) !== "consumed")
      .map((obj) => {
        const state = objectStates.get(obj.id) || "default";
        if (state === "activated") {
          return {
            ...obj,
            emoji: obj.activatedEmoji,
            dialogue: obj.activatedDialogue,
            objectState: state,
          };
        }
        return { ...obj, objectState: state };
      });
  }, [initialObjects, objectStates]);

  const getFacingObject = useCallback(
    (pos: Position, dir: Direction): ReactiveObject | null => {
      const facingPos = getFacingPosition(pos, dir, FACING_DISTANCE);
      return findClosestObject(facingPos, visibleObjects, INTERACTION_RANGE);
    },
    [visibleObjects],
  );

  return {
    visibleObjects,
    objectStates,
    getFacingObject,
    activateObject,
    consumeObject,
  };
}
