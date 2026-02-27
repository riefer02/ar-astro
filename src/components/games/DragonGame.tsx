import { useState, useCallback, useRef } from "react";
import type { Direction, Position, ReactiveObject } from "@/lib/games/types";
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  REACTIVE_OBJECTS,
  ALL_MOVEMENT_KEYS,
  ATTACK_KEYS,
  INTERACT_KEYS,
  CLOSE_DIALOGUE_KEYS,
  FIRE_KEYS,
  DASH_KEYS,
  SPIN_KEYS,
  ROAR_KEYS,
  CONTACT_DAMAGE,
  PLAYER_SIZE,
} from "@/lib/games/constants";
import { checkAABBCollision } from "@/lib/games/collision";
import { useGameLoop } from "@/hooks/games/useGameLoop";
import { useKeyboard } from "@/hooks/games/useKeyboard";
import { usePlayer } from "@/hooks/games/usePlayer";
import { useAttackSystem } from "@/hooks/games/useAttackSystem";
import { useGameObjects } from "@/hooks/games/useGameObjects";
import { usePowers } from "@/hooks/games/usePowers";
import { useResponsiveScale } from "@/hooks/games/useResponsiveScale";
import { useIsTouchDevice } from "@/hooks/games/useIsTouchDevice";
import { useTouch } from "@/hooks/games/useTouch";
import { useInput } from "@/hooks/games/useInput";
import { usePlayerHealth } from "@/hooks/games/usePlayerHealth";
import { useEnemies } from "@/hooks/games/useEnemies";
import { useCombat } from "@/hooks/games/useCombat";
import { useCollectibles } from "@/hooks/games/useCollectibles";
import { GameCanvas } from "./GameCanvas";
import { GameUI } from "./GameUI";
import { TouchControls } from "./TouchControls";

const BOUNDS = { width: GAME_WIDTH, height: GAME_HEIGHT };
const INITIAL_POSITION = { x: 400, y: 300 };

export function DragonGame() {
  const [gameKey, setGameKey] = useState(0);
  const handleRestart = useCallback(() => setGameKey((k) => k + 1), []);
  return <DragonGameInner key={gameKey} onRestart={handleRestart} />;
}

function DragonGameInner({ onRestart }: { onRestart: () => void }) {
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [dialogueTarget, setDialogueTarget] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);

  // Refs to break circular dependency between keyboard handler and player
  const playerPosRef = useRef<Position>(INITIAL_POSITION);
  const playerDirRef = useRef<Direction>("down");

  // Responsive scaling
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useResponsiveScale(containerRef);
  const isTouchDevice = useIsTouchDevice();

  const { isAttacking, attackEffects, performAttack } = useAttackSystem();
  const {
    visibleObjects,
    objectStates,
    getFacingObject,
    activateObject,
    consumeObject,
  } = useGameObjects({ objects: REACTIVE_OBJECTS });

  // Player health
  const health = usePlayerHealth();

  // Collectibles
  const collectibles = useCollectibles();

  // Enemies
  const enemySystem = useEnemies({
    bounds: BOUNDS,
    onEnemyDeath: (x, y) => collectibles.spawnLootBurst(x, y, 2),
  });

  const closeDialogue = useCallback(() => {
    setDialogue(null);
    setDialogueTarget(null);
  }, []);

  // Touch input
  const touch = useTouch();

  // Powers ref to break ordering dependency (powers defined after keyboard)
  const powersRef = useRef<ReturnType<typeof usePowers> | null>(null);

  const handleInteract = useCallback(() => {
    const facing = getFacingObject(playerPosRef.current, playerDirRef.current);
    if (!facing) return;

    // Potion: heal + consume instead of dialogue
    if (
      facing.healAmount &&
      facing.healAmount > 0 &&
      (objectStates.get(facing.id) || "default") === "default"
    ) {
      health.heal(facing.healAmount);
      consumeObject(facing.id);
      setDialogue(`You drank the potion! +${facing.healAmount} HP`);
      setDialogueTarget(facing.name);
      return;
    }

    setDialogue(facing.dialogue);
    setDialogueTarget(facing.name);
  }, [getFacingObject, objectStates, health, consumeObject]);

  const handleAttack = useCallback(() => {
    if (dialogue) return;
    performAttack(playerDirRef.current, playerPosRef.current);
  }, [dialogue, performAttack]);

  const dismissControls = useCallback(() => {
    if (showControls) setShowControls(false);
  }, [showControls]);

  const handleTouchAttack = useCallback(() => {
    dismissControls();
    if (dialogue) {
      closeDialogue();
      return;
    }
    handleAttack();
  }, [dialogue, closeDialogue, handleAttack, dismissControls]);

  const handleTouchInteract = useCallback(() => {
    dismissControls();
    if (dialogue) {
      closeDialogue();
      return;
    }
    handleInteract();
  }, [dialogue, closeDialogue, handleInteract, dismissControls]);

  const handleKeyDown = useCallback(
    (key: string) => {
      if (health.isDead) return;

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
        handleInteract();
      }

      // Power keys
      const p = powersRef.current;
      if (p) {
        if (FIRE_KEYS.has(key)) p.fireBreath();
        else if (DASH_KEYS.has(key)) p.wingDash();
        else if (SPIN_KEYS.has(key)) p.spinAttack();
        else if (ROAR_KEYS.has(key)) p.dragonRoar();
      }

      if (showControls && ALL_MOVEMENT_KEYS.has(key)) {
        setShowControls(false);
      }
    },
    [
      dialogue,
      showControls,
      closeDialogue,
      performAttack,
      handleInteract,
      health.isDead,
    ],
  );

  const keyboard = useKeyboard({ onKeyDown: handleKeyDown });
  const input = useInput({ keyboard, touchDirection: touch.directionRef });

  const player = usePlayer({
    initialPosition: INITIAL_POSITION,
    bounds: BOUNDS,
    obstacles: visibleObjects,
    input,
    positionRef: playerPosRef,
    directionRef: playerDirRef,
  });

  const powers = usePowers({
    positionRef: playerPosRef,
    directionRef: playerDirRef,
    bounds: BOUNDS,
    obstacles: visibleObjects,
    forcePosition: player.forcePosition,
  });
  powersRef.current = powers;

  // Combat system
  const combat = useCombat({
    playerPosRef,
    attackEffects,
    fireProjectiles: powers.fireProjectiles,
    dashState: powers.dashState,
    spinState: powers.spinState,
    roarState: powers.roarState,
    enemiesRef: enemySystem.enemiesRef,
    applyDamage: enemySystem.applyDamage,
  });

  // Track which objects we've already activated (to prevent repeated activation in same tick)
  const activatedObjectsRef = useRef<Set<string>>(new Set());

  // Touch handlers for powers
  const handleTouchFire = useCallback(() => {
    dismissControls();
    if (dialogue || health.isDead) return;
    powers.fireBreath();
  }, [dialogue, powers, dismissControls, health.isDead]);

  const handleTouchDash = useCallback(() => {
    dismissControls();
    if (dialogue || health.isDead) return;
    powers.wingDash();
  }, [dialogue, powers, dismissControls, health.isDead]);

  const handleTouchSpin = useCallback(() => {
    dismissControls();
    if (dialogue || health.isDead) return;
    powers.spinAttack();
  }, [dialogue, powers, dismissControls, health.isDead]);

  const handleTouchRoar = useCallback(() => {
    dismissControls();
    if (dialogue || health.isDead) return;
    powers.dragonRoar();
  }, [dialogue, powers, dismissControls, health.isDead]);

  useGameLoop({
    paused: !!dialogue || health.isDead,
    onTick: (deltaTime) => {
      // 1. Player movement
      if (!powers.isDashing) {
        player.updateMovement();
      }

      // 2. Powers tick
      powers.updatePowers(deltaTime);

      // 3. Combat hit detection (enemies)
      combat.checkCombat();

      // 4. Object reactivity
      const hitObjectIds = combat.checkObjectHits(visibleObjects);
      for (const id of hitObjectIds) {
        if (activatedObjectsRef.current.has(id)) continue;
        activatedObjectsRef.current.add(id);
        const obj = REACTIVE_OBJECTS.find((o) => o.id === id);
        if (obj && obj.lootCount > 0) {
          collectibles.spawnLootBurst(
            obj.x + obj.width / 2,
            obj.y + obj.height / 2,
            obj.lootCount,
          );
        }
        activateObject(id);
        if (obj) {
          setDialogue(obj.activatedDialogue);
          setDialogueTarget(obj.name);
        }
      }

      // 5. Enemy AI
      enemySystem.updateEnemies(deltaTime, playerPosRef.current);

      // 6. Contact damage (enemies touching player)
      if (!health.isInvincible() && !health.isDead) {
        const pos = playerPosRef.current;
        for (const enemy of enemySystem.enemiesRef.current!) {
          if (enemy.state === "dead") continue;
          if (
            checkAABBCollision(
              pos.x,
              pos.y,
              PLAYER_SIZE,
              PLAYER_SIZE,
              enemy.x,
              enemy.y,
              enemy.width,
              enemy.height,
            )
          ) {
            health.takeDamage(CONTACT_DAMAGE);
            break;
          }
        }
      }

      // 7. Collectible pickup
      collectibles.updateCollectibles(
        playerPosRef.current.x,
        playerPosRef.current.y,
      );
    },
  });

  const facingObject: ReactiveObject | null = !dialogue
    ? getFacingObject(player.position, player.direction)
    : null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Outer container for measuring available width + reserving scaled height */}
      <div
        ref={containerRef}
        className="w-full max-w-[800px]"
        style={{ height: GAME_HEIGHT * scale }}
      >
        {/* Scaled wrapper — CSS transform keeps game logic at 800x600 */}
        <div
          style={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <GameCanvas
            playerPosition={player.position}
            playerDirection={player.direction}
            playerIsMoving={player.isMoving}
            playerIsAttacking={isAttacking}
            playerIsInvincible={health.isInvincible()}
            objects={visibleObjects}
            attackEffects={attackEffects}
            fireProjectiles={powers.fireProjectiles}
            dashState={powers.dashState}
            spinState={powers.spinState}
            roarState={powers.roarState}
            enemies={enemySystem.enemies}
            gems={collectibles.gems}
            hitEffects={enemySystem.hitEffects}
            hp={health.hp}
            maxHp={health.maxHp}
            score={collectibles.score}
            isDead={health.isDead}
            onRestart={onRestart}
          >
            <GameUI
              dialogue={dialogue}
              dialogueTarget={dialogueTarget}
              facingObject={facingObject}
              showControls={showControls}
              onCloseDialogue={closeDialogue}
              isTouchDevice={isTouchDevice}
            />
          </GameCanvas>
        </div>
      </div>

      {/* Touch controls — rendered at native resolution outside the scaled area */}
      {isTouchDevice && (
        <TouchControls
          onDpadStart={touch.onDpadStart}
          onDpadEnd={touch.onDpadEnd}
          onAttack={handleTouchAttack}
          onInteract={handleTouchInteract}
          onFire={handleTouchFire}
          onDash={handleTouchDash}
          onSpin={handleTouchSpin}
          onRoar={handleTouchRoar}
        />
      )}

      <div className="max-w-[800px] text-center text-sm text-muted-foreground">
        <p className="font-semibold">Dragon Quest</p>
        {isTouchDevice ? (
          <p>
            Use the D-pad to move. Tap {"\u2694\uFE0F"} to attack,{" "}
            {"\uD83D\uDCAC"} to interact, {"\uD83D\uDD25"} fire breath,{" "}
            {"\uD83D\uDCA8"} dash, {"\uD83C\uDF00"} spin, {"\uD83D\uDCE2"} roar.
          </p>
        ) : (
          <p>
            WASD to move, SPACE to attack, E to interact. Powers: Q fire, Shift
            dash, R spin, F roar.
          </p>
        )}
      </div>
    </div>
  );
}
