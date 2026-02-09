import type { CSSProperties } from "react";
import type { Direction, Position } from "./types";
import {
  ATTACK_OFFSETS,
  DIRECTION_EMOJIS,
  DIRECTION_ROTATIONS,
  DIRECTION_VECTORS,
} from "./constants";

export function getAttackOffset(direction: Direction): Position {
  return ATTACK_OFFSETS[direction];
}

export function getRotationDegrees(direction: Direction): number {
  return DIRECTION_ROTATIONS[direction];
}

export function getDragonEmoji(direction: Direction): string {
  return DIRECTION_EMOJIS[direction];
}

export function getFacingPosition(
  pos: Position,
  direction: Direction,
  distance: number,
): Position {
  const vec = DIRECTION_VECTORS[direction];
  return {
    x: pos.x + vec.x * distance,
    y: pos.y + vec.y * distance,
  };
}

export function getAttackEffectStyle(
  x: number,
  y: number,
  direction: Direction,
): CSSProperties {
  return {
    left: x,
    top: y,
    transform: `rotate(${DIRECTION_ROTATIONS[direction]}deg)`,
  };
}
