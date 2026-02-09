export type Direction = "up" | "down" | "left" | "right";

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emoji: string;
  name: string;
}

export interface InteractiveObject extends GameObject {
  dialogue: string;
}

export interface AttackEffect {
  id: number;
  x: number;
  y: number;
  direction: Direction;
  timestamp: number;
}
