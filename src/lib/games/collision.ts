import type { Bounds, GameObject, Position } from "./types";

export function isWithinBounds(
  x: number,
  y: number,
  width: number,
  height: number,
  bounds: Bounds,
): boolean {
  return x >= 0 && x + width <= bounds.width && y >= 0 && y + height <= bounds.height;
}

export function checkAABBCollision(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number,
): boolean {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

export function checkCollision(
  x: number,
  y: number,
  width: number,
  height: number,
  bounds: Bounds,
  objects: GameObject[],
): boolean {
  if (!isWithinBounds(x, y, width, height, bounds)) {
    return true;
  }

  for (const obj of objects) {
    if (checkAABBCollision(x, y, width, height, obj.x, obj.y, obj.width, obj.height)) {
      return true;
    }
  }

  return false;
}

export function getDistance(a: Position, b: Position): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function findClosestObject<T extends GameObject>(
  pos: Position,
  objects: T[],
  maxDistance: number,
): T | null {
  let closest: T | null = null;
  let closestDist = maxDistance;

  for (const obj of objects) {
    const center: Position = {
      x: obj.x + obj.width / 2,
      y: obj.y + obj.height / 2,
    };
    const dist = getDistance(pos, center);
    if (dist < closestDist) {
      closest = obj;
      closestDist = dist;
    }
  }

  return closest;
}
