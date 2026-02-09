import { useState, useRef, useCallback, type MutableRefObject } from "react";
import type { Bounds, Direction, GameObject, Position } from "@/lib/games/types";
import { MOVEMENT_KEYS, PLAYER_SIZE, PLAYER_SPEED } from "@/lib/games/constants";
import { checkCollision } from "@/lib/games/collision";

/**
 * Manages player position, direction, and movement with collision detection.
 * Accepts optional external refs so callers can read position/direction without stale closures.
 */
export function usePlayer({
  initialPosition,
  bounds,
  obstacles,
  keyboard,
  positionRef: externalPosRef,
  directionRef: externalDirRef,
}: {
  initialPosition: Position;
  bounds: Bounds;
  obstacles: GameObject[];
  keyboard: {
    isAnyKeyPressed: (keys: Set<string>) => boolean;
  };
  positionRef?: MutableRefObject<Position>;
  directionRef?: MutableRefObject<Direction>;
}) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [direction, setDirection] = useState<Direction>("down");
  const [isMoving, setIsMoving] = useState(false);

  const internalPosRef = useRef(position);
  const internalDirRef = useRef(direction);

  const positionRef = externalPosRef ?? internalPosRef;
  const directionRef = externalDirRef ?? internalDirRef;

  const updateMovement = useCallback(() => {
    let dx = 0;
    let dy = 0;
    let newDirection: Direction | null = null;

    if (keyboard.isAnyKeyPressed(MOVEMENT_KEYS.up)) {
      dy = -PLAYER_SPEED;
      newDirection = "up";
    }
    if (keyboard.isAnyKeyPressed(MOVEMENT_KEYS.down)) {
      dy = PLAYER_SPEED;
      newDirection = "down";
    }
    if (keyboard.isAnyKeyPressed(MOVEMENT_KEYS.left)) {
      dx = -PLAYER_SPEED;
      newDirection = "left";
    }
    if (keyboard.isAnyKeyPressed(MOVEMENT_KEYS.right)) {
      dx = PLAYER_SPEED;
      newDirection = "right";
    }

    if (dx !== 0 || dy !== 0) {
      const current = positionRef.current;
      const newX = current.x + dx;
      const newY = current.y + dy;

      let nextPos: Position | null = null;

      if (!checkCollision(newX, newY, PLAYER_SIZE, PLAYER_SIZE, bounds, obstacles)) {
        nextPos = { x: newX, y: newY };
      } else if (
        !checkCollision(current.x + dx, current.y, PLAYER_SIZE, PLAYER_SIZE, bounds, obstacles)
      ) {
        nextPos = { x: current.x + dx, y: current.y };
      } else if (
        !checkCollision(current.x, current.y + dy, PLAYER_SIZE, PLAYER_SIZE, bounds, obstacles)
      ) {
        nextPos = { x: current.x, y: current.y + dy };
      }

      if (nextPos) {
        positionRef.current = nextPos;
        setPosition(nextPos);
      }

      if (newDirection) {
        directionRef.current = newDirection;
        setDirection(newDirection);
      }

      setIsMoving(true);
    } else {
      setIsMoving(false);
    }
  }, [bounds, obstacles, keyboard, positionRef, directionRef]);

  return {
    position,
    direction,
    isMoving,
    positionRef,
    directionRef,
    updateMovement,
  };
}
