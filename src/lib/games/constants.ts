import type {
  AttackType,
  Direction,
  EnemyType,
  Position,
  ReactiveObject,
} from "./types";

// Game dimensions
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const PLAYER_SIZE = 40;
export const PLAYER_SPEED = 5;

// Combat
export const ATTACK_DURATION = 300;
export const ATTACK_COOLDOWN = 500;

// Interaction
export const FACING_DISTANCE = 60;
export const INTERACTION_RANGE = 50;

// Direction lookup tables
export const DIRECTION_VECTORS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const ATTACK_OFFSETS: Record<Direction, Position> = {
  up: { x: 0, y: -35 },
  down: { x: 0, y: 35 },
  left: { x: -35, y: 0 },
  right: { x: 35, y: 0 },
};

export const DIRECTION_ROTATIONS: Record<Direction, number> = {
  up: 0,
  down: 180,
  left: -90,
  right: 90,
};

export const DIRECTION_EMOJIS: Record<Direction, string> = {
  up: "\u{1F432}",
  down: "\u{1F409}",
  left: "\u{1F432}",
  right: "\u{1F409}",
};

// Key bindings
export const MOVEMENT_KEYS: Record<Direction, Set<string>> = {
  up: new Set(["w", "arrowup"]),
  down: new Set(["s", "arrowdown"]),
  left: new Set(["a", "arrowleft"]),
  right: new Set(["d", "arrowright"]),
};

export const ALL_MOVEMENT_KEYS = new Set([
  "w",
  "a",
  "s",
  "d",
  "arrowup",
  "arrowdown",
  "arrowleft",
  "arrowright",
]);

export const ATTACK_KEYS = new Set([" "]);
export const INTERACT_KEYS = new Set(["e"]);
export const CLOSE_DIALOGUE_KEYS = new Set([" ", "escape"]);

// Power key bindings
export const FIRE_KEYS = new Set(["1", "q"]);
export const DASH_KEYS = new Set(["2", "shift"]);
export const SPIN_KEYS = new Set(["3", "r"]);
export const ROAR_KEYS = new Set(["4", "f"]);

// Fire Breath
export const FIRE_SPEED = 8;
export const FIRE_DURATION = 800;
export const FIRE_COOLDOWN = 800;

// Wing Dash
export const DASH_DISTANCE = 120;
export const DASH_DURATION = 200;
export const DASH_COOLDOWN = 1000;
export const DASH_SPEED = DASH_DISTANCE / (DASH_DURATION / 16); // ~9.6 per tick

// Spin Attack
export const SPIN_DURATION = 500;
export const SPIN_COOLDOWN = 1500;
export const SPIN_RADIUS = 45;
export const SPIN_ROTATIONS = 2;

// Dragon Roar
export const ROAR_DURATION = 600;
export const ROAR_COOLDOWN = 2000;
export const ROAR_MAX_RADIUS = 120;
export const SHAKE_INTENSITY = 4;

// --- Player Health ---

export const MAX_HP = 5;
export const INVINCIBILITY_DURATION = 1000;

// --- Enemies ---

export const ENEMY_CHASE_RANGE = 150;
export const ENEMY_PATROL_RANGE = 100;
export const ENEMY_SIZE = 35;
export const ENEMY_DEATH_DURATION = 500;
export const HIT_FLASH_DURATION = 150;

export const ENEMY_DEFINITIONS: Record<
  EnemyType,
  { speed: number; hp: number; emoji: string }
> = {
  slime: { speed: 1.5, hp: 2, emoji: "\uD83D\uDFE2" },
  bat: { speed: 3.0, hp: 1, emoji: "\uD83E\uDD87" },
  skeleton: { speed: 2.0, hp: 3, emoji: "\uD83D\uDC80" },
};

export const ENEMY_SPAWNS: Array<{ type: EnemyType; x: number; y: number }> = [
  { type: "slime", x: 200, y: 400 },
  { type: "slime", x: 550, y: 450 },
  { type: "bat", x: 150, y: 250 },
  { type: "bat", x: 650, y: 350 },
  { type: "skeleton", x: 400, y: 150 },
];

export const TOTAL_ENEMIES = ENEMY_SPAWNS.length;

// --- Damage ---

export const DAMAGE_VALUES: Record<AttackType, number> = {
  sword: 1,
  fire: 2,
  dash: 1,
  spin: 1,
  roar: 1,
};

export const ROAR_KNOCKBACK = 60;
export const SPIN_HIT_INTERVAL = 200;
export const CONTACT_DAMAGE = 1;

// --- Collectibles ---

export const GEM_PICKUP_RANGE = 35;
export const GEM_LIFETIME = 10000;
export const GEM_SIZE = 20;
export const SECRET_GEM_TARGET = 8;

// --- Hit Effects ---

export const HIT_EFFECT_DURATION = 400;

// --- Reactive Game Objects ---

export const REACTIVE_OBJECTS: ReactiveObject[] = [
  {
    id: "chest1",
    x: 100,
    y: 100,
    emoji: "\u{1F4E6}",
    name: "Treasure Chest",
    dialogue: "A sturdy chest. Try attacking it!",
    width: 40,
    height: 40,
    objectState: "default",
    reactsTo: ["sword", "spin"],
    activatedEmoji: "\uD83C\uDF81",
    activatedDialogue: "The chest bursts open! Gems scatter everywhere!",
    lootCount: 3,
  },
  {
    id: "rock1",
    x: 650,
    y: 150,
    emoji: "\u{1FAA8}",
    name: "Mysterious Rock",
    dialogue: "This rock looks ancient. Maybe fire could shatter it?",
    width: 40,
    height: 40,
    objectState: "default",
    reactsTo: ["fire", "roar"],
    activatedEmoji: "\uD83D\uDC8E",
    activatedDialogue: "The rock shatters into glittering gems!",
    lootCount: 3,
  },
  {
    id: "door1",
    x: 360,
    y: 20,
    emoji: "\u{1F6AA}",
    name: "Wooden Door",
    dialogue: "The gate is sealed. Something in this grotto needs to be awakened first.",
    width: 80,
    height: 60,
    objectState: "default",
    reactsTo: [],
    activatedEmoji: "\uD83C\uDF00",
    activatedDialogue: "The ancient gate hums to life. Press E to leave the grotto.",
    lootCount: 0,
  },
  {
    id: "potion1",
    x: 700,
    y: 500,
    emoji: "\u{1F9EA}",
    name: "Strange Potion",
    dialogue: "A bubbling green potion. Press E to drink it!",
    width: 30,
    height: 40,
    objectState: "default",
    reactsTo: [],
    activatedEmoji: "\u{1F9EA}",
    activatedDialogue: "",
    lootCount: 0,
    healAmount: 2,
  },
  {
    id: "scroll1",
    x: 50,
    y: 500,
    emoji: "\u{1F4DC}",
    name: "Ancient Scroll",
    dialogue:
      "The scroll reads: 'Crack the chest. Burn the stone. Gather glitter. Silence the cave. Then the gate will wake.'",
    width: 35,
    height: 30,
    objectState: "default",
    reactsTo: [],
    activatedEmoji: "\u{1F4DC}",
    activatedDialogue: "",
    lootCount: 0,
  },
];

// Keep backward-compatible alias
export const INTERACTIVE_OBJECTS = REACTIVE_OBJECTS;
