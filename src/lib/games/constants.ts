import type { Direction, InteractiveObject, Position } from "./types";

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

// Game objects
export const INTERACTIVE_OBJECTS: InteractiveObject[] = [
  {
    id: "chest1",
    x: 100,
    y: 100,
    emoji: "\u{1F4E6}",
    name: "Treasure Chest",
    dialogue: "It's locked tight. Maybe there's a key somewhere?",
    width: 40,
    height: 40,
  },
  {
    id: "rock1",
    x: 650,
    y: 150,
    emoji: "\u{1FAA8}",
    name: "Mysterious Rock",
    dialogue: "This rock looks ancient. Runes are carved into its surface.",
    width: 40,
    height: 40,
  },
  {
    id: "door1",
    x: 360,
    y: 20,
    emoji: "\u{1F6AA}",
    name: "Wooden Door",
    dialogue: "The door is barred from the other side. You can't leave yet!",
    width: 80,
    height: 60,
  },
  {
    id: "potion1",
    x: 700,
    y: 500,
    emoji: "\u{1F9EA}",
    name: "Strange Potion",
    dialogue: "A bubbling green potion. It smells like... cinnamon?",
    width: 30,
    height: 40,
  },
  {
    id: "scroll1",
    x: 50,
    y: 500,
    emoji: "\u{1F4DC}",
    name: "Ancient Scroll",
    dialogue:
      "The scroll reads: 'Beware the dragon's wrath... wait, that's you!'",
    width: 35,
    height: 30,
  },
];
