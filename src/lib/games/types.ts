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

export interface FireProjectile {
  id: number;
  x: number;
  y: number;
  direction: Direction;
  createdAt: number;
  scale: number;
}

export interface DashState {
  active: boolean;
  startX: number;
  startY: number;
  direction: Direction;
  elapsed: number;
  trail: Position[];
}

export interface SpinState {
  active: boolean;
  elapsed: number;
  rotation: number;
}

export interface RoarState {
  active: boolean;
  elapsed: number;
  ringRadius: number;
  shakeOffset: Position;
}

// --- Combat & Enemies ---

export type EnemyType = "slime" | "bat" | "skeleton";
export type EnemyState = "patrol" | "chase" | "dead";

export interface Enemy {
  id: string;
  type: EnemyType;
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  maxHp: number;
  state: EnemyState;
  speed: number;
  emoji: string;
  spawnX: number;
  spawnY: number;
  patrolTarget: Position;
  hitFlashUntil: number;
  deathStartedAt: number | null;
}

// --- Reactive Objects ---

export type ObjectState = "default" | "activated" | "consumed";
export type AttackType = "sword" | "fire" | "dash" | "spin" | "roar";

export interface ReactiveObject extends InteractiveObject {
  objectState: ObjectState;
  reactsTo: AttackType[];
  activatedEmoji: string;
  activatedDialogue: string;
  lootCount: number;
  healAmount?: number;
}

// --- Collectibles ---

export interface Collectible {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

// --- Hit Effects ---

export interface HitEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
  createdAt: number;
}
