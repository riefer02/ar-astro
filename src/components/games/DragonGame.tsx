import { useState, useCallback, useRef } from "react";
import type { Direction, InteractiveObject, Position } from "@/lib/games/types";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  INTERACTIVE_OBJECTS,
  ALL_MOVEMENT_KEYS,
  ATTACK_KEYS,
  INTERACT_KEYS,
  CLOSE_DIALOGUE_KEYS,
} from "@/lib/games/constants";
import { useGameLoop } from "@/hooks/games/useGameLoop";
import { useKeyboard } from "@/hooks/games/useKeyboard";
import { usePlayer } from "@/hooks/games/usePlayer";
import { useAttackSystem } from "@/hooks/games/useAttackSystem";
import { useGameObjects } from "@/hooks/games/useGameObjects";
import { GameCanvas } from "./GameCanvas";
import { GameUI } from "./GameUI";

const BOUNDS = { width: GAME_WIDTH, height: GAME_HEIGHT };
const INITIAL_POSITION = { x: 400, y: 300 };

export function DragonGame() {
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [dialogueTarget, setDialogueTarget] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Refs to break circular dependency between keyboard handler and player
  const playerPosRef = useRef<Position>(INITIAL_POSITION);
  const playerDirRef = useRef<Direction>("down");

  const { isAttacking, attackEffects, performAttack } = useAttackSystem();
  const { getFacingObject } = useGameObjects({ objects: INTERACTIVE_OBJECTS });

  const closeDialogue = useCallback(() => {
    setDialogue(null);
    setDialogueTarget(null);
  }, []);

  const handleKeyDown = useCallback(
    (key: string) => {
      if (dialogue) {
        if (CLOSE_DIALOGUE_KEYS.has(key)) {
          closeDialogue();
        }
        return;
      }

      if (ATTACK_KEYS.has(key)) {
        performAttack(playerDirRef.current, playerPosRef.current);
      }

      if (INTERACT_KEYS.has(key)) {
        const facing = getFacingObject(
          playerPosRef.current,
          playerDirRef.current,
        );
        if (facing) {
          setDialogue(facing.dialogue);
          setDialogueTarget(facing.name);
        }
      }

      if (showControls && ALL_MOVEMENT_KEYS.has(key)) {
        setShowControls(false);
      }
    },
    [dialogue, showControls, closeDialogue, performAttack, getFacingObject],
  );

  const keyboard = useKeyboard({ onKeyDown: handleKeyDown });

  const player = usePlayer({
    initialPosition: INITIAL_POSITION,
    bounds: BOUNDS,
    obstacles: INTERACTIVE_OBJECTS,
    keyboard,
    positionRef: playerPosRef,
    directionRef: playerDirRef,
  });

  useGameLoop({
    paused: !!dialogue,
    onTick: () => {
      player.updateMovement();
    },
  });

  const facingObject: InteractiveObject | null = !dialogue
    ? getFacingObject(player.position, player.direction)
    : null;

  return (
    <div className="flex flex-col items-center gap-4">
      <GameCanvas
        playerPosition={player.position}
        playerDirection={player.direction}
        playerIsMoving={player.isMoving}
        playerIsAttacking={isAttacking}
        objects={INTERACTIVE_OBJECTS}
        attackEffects={attackEffects}
      >
        <GameUI
          dialogue={dialogue}
          dialogueTarget={dialogueTarget}
          facingObject={facingObject}
          showControls={showControls}
          onCloseDialogue={closeDialogue}
        />
      </GameCanvas>

      <div className="max-w-[800px] text-center text-sm text-stone-600">
        <p className="font-semibold">Dragon Quest - Proof of Concept</p>
        <p>
          Use WASD or Arrow Keys to move. Press SPACE to attack. Press E when
          near objects to interact.
        </p>
      </div>
    </div>
  );
}
