import { useState, useRef, useCallback } from "react";
import type { Bounds, Enemy, HitEffect, Position } from "@/lib/games/types";
import {
  ENEMY_CHASE_RANGE,
  ENEMY_DEATH_DURATION,
  ENEMY_DEFINITIONS,
  ENEMY_PATROL_RANGE,
  ENEMY_SIZE,
  ENEMY_SPAWNS,
  HIT_EFFECT_DURATION,
} from "@/lib/games/constants";

function randomPatrolTarget(
  spawnX: number,
  spawnY: number,
  bounds: Bounds,
): Position {
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * ENEMY_PATROL_RANGE;
  return {
    x: Math.max(
      0,
      Math.min(bounds.width - ENEMY_SIZE, spawnX + Math.cos(angle) * dist),
    ),
    y: Math.max(
      0,
      Math.min(bounds.height - ENEMY_SIZE, spawnY + Math.sin(angle) * dist),
    ),
  };
}

function createInitialEnemies(bounds: Bounds): Enemy[] {
  return ENEMY_SPAWNS.map((spawn, i) => {
    const def = ENEMY_DEFINITIONS[spawn.type];
    return {
      id: `enemy-${i}`,
      type: spawn.type,
      x: spawn.x,
      y: spawn.y,
      width: ENEMY_SIZE,
      height: ENEMY_SIZE,
      hp: def.hp,
      maxHp: def.hp,
      state: "patrol" as const,
      speed: def.speed,
      emoji: def.emoji,
      spawnX: spawn.x,
      spawnY: spawn.y,
      patrolTarget: randomPatrolTarget(spawn.x, spawn.y, bounds),
      hitFlashUntil: 0,
      deathStartedAt: null,
    };
  });
}

export function useEnemies({
  bounds,
  onEnemyDeath,
}: {
  bounds: Bounds;
  onEnemyDeath: (x: number, y: number) => void;
}) {
  const [enemies, setEnemies] = useState<Enemy[]>(() =>
    createInitialEnemies(bounds),
  );
  const enemiesRef = useRef<Enemy[]>(enemies);
  enemiesRef.current = enemies;

  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const hitEffectsRef = useRef<HitEffect[]>([]);
  const hitEffectIdRef = useRef(0);

  const updateEnemies = useCallback(
    (deltaTime: number, playerPos: Position) => {
      const now = Date.now();

      // Clean up expired hit effects
      const activeEffects = hitEffectsRef.current.filter(
        (e) => now - e.createdAt < HIT_EFFECT_DURATION,
      );
      if (activeEffects.length !== hitEffectsRef.current.length) {
        hitEffectsRef.current = activeEffects;
        setHitEffects(activeEffects);
      }

      // Remove enemies whose death animation is complete
      const alive = enemiesRef.current.filter((enemy) => {
        if (
          enemy.state === "dead" &&
          enemy.deathStartedAt &&
          now - enemy.deathStartedAt > ENEMY_DEATH_DURATION
        ) {
          return false;
        }
        return true;
      });

      const updated = alive.map((enemy) => {
        if (enemy.state === "dead") return enemy;

        const pcx = playerPos.x + 20;
        const pcy = playerPos.y + 20;
        const ecx = enemy.x + enemy.width / 2;
        const ecy = enemy.y + enemy.height / 2;
        const dx = pcx - ecx;
        const dy = pcy - ecy;
        const distToPlayer = Math.sqrt(dx * dx + dy * dy);

        let newX = enemy.x;
        let newY = enemy.y;
        let newState = enemy.state;
        let newPatrolTarget = enemy.patrolTarget;

        if (distToPlayer < ENEMY_CHASE_RANGE) {
          newState = "chase";
          const speed = enemy.speed * (deltaTime / 16);
          const norm = distToPlayer || 1;
          newX += (dx / norm) * speed;
          newY += (dy / norm) * speed;
        } else {
          newState = "patrol";
          const pdx = enemy.patrolTarget.x - enemy.x;
          const pdy = enemy.patrolTarget.y - enemy.y;
          const patrolDist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (patrolDist < 5) {
            newPatrolTarget = randomPatrolTarget(
              enemy.spawnX,
              enemy.spawnY,
              bounds,
            );
          } else {
            const speed = enemy.speed * 0.5 * (deltaTime / 16);
            const norm = patrolDist || 1;
            newX += (pdx / norm) * speed;
            newY += (pdy / norm) * speed;
          }
        }

        newX = Math.max(0, Math.min(bounds.width - enemy.width, newX));
        newY = Math.max(0, Math.min(bounds.height - enemy.height, newY));

        return {
          ...enemy,
          x: newX,
          y: newY,
          state: newState as Enemy["state"],
          patrolTarget: newPatrolTarget,
        };
      });

      enemiesRef.current = updated;
      setEnemies(updated);
    },
    [bounds],
  );

  const applyDamage = useCallback(
    (
      enemyId: string,
      damage: number,
      knockbackX?: number,
      knockbackY?: number,
    ) => {
      const now = Date.now();

      // Spawn hit effect
      const enemy = enemiesRef.current.find((e) => e.id === enemyId);
      if (enemy && enemy.state !== "dead") {
        const effect: HitEffect = {
          id: hitEffectIdRef.current++,
          x: enemy.x + enemy.width / 2,
          y: enemy.y,
          emoji: damage >= 2 ? "\uD83D\uDCA5" : "\u2728",
          createdAt: now,
        };
        hitEffectsRef.current = [...hitEffectsRef.current, effect];
        setHitEffects(hitEffectsRef.current);
      }

      enemiesRef.current = enemiesRef.current.map((e) => {
        if (e.id !== enemyId || e.state === "dead") return e;

        const newHp = e.hp - damage;
        let newX = e.x + (knockbackX || 0);
        let newY = e.y + (knockbackY || 0);

        newX = Math.max(0, Math.min(bounds.width - e.width, newX));
        newY = Math.max(0, Math.min(bounds.height - e.height, newY));

        if (newHp <= 0) {
          onEnemyDeath(e.x + e.width / 2, e.y + e.height / 2);
          return {
            ...e,
            hp: 0,
            x: newX,
            y: newY,
            state: "dead" as const,
            deathStartedAt: now,
            hitFlashUntil: 0,
          };
        }

        return {
          ...e,
          hp: newHp,
          x: newX,
          y: newY,
          hitFlashUntil: now + 150,
        };
      });
      setEnemies(enemiesRef.current);
    },
    [bounds, onEnemyDeath],
  );

  return { enemies, enemiesRef, hitEffects, updateEnemies, applyDamage };
}
