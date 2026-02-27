import { useRef, useCallback } from "react";
import type {
  AttackEffect,
  DashState,
  Enemy,
  FireProjectile,
  Position,
  RoarState,
  SpinState,
} from "@/lib/games/types";
import {
  DAMAGE_VALUES,
  PLAYER_SIZE,
  ROAR_KNOCKBACK,
  SPIN_HIT_INTERVAL,
  SPIN_RADIUS,
} from "@/lib/games/constants";
import { checkAABBCollision } from "@/lib/games/collision";

export function useCombat({
  playerPosRef,
  attackEffects,
  fireProjectiles,
  dashState,
  spinState,
  roarState,
  enemiesRef,
  applyDamage,
}: {
  playerPosRef: React.RefObject<Position>;
  attackEffects: AttackEffect[];
  fireProjectiles: FireProjectile[];
  dashState: DashState;
  spinState: SpinState;
  roarState: RoarState;
  enemiesRef: React.RefObject<Enemy[]>;
  applyDamage: (
    enemyId: string,
    damage: number,
    knockbackX?: number,
    knockbackY?: number,
  ) => void;
}) {
  const hitPairsRef = useRef<Set<string>>(new Set());
  const spinHitTimesRef = useRef<Map<string, number>>(new Map());
  const prevDashActiveRef = useRef(false);
  const prevRoarActiveRef = useRef(false);

  const checkCombat = useCallback(() => {
    const now = Date.now();
    const enemies = enemiesRef.current!.filter((e) => e.state !== "dead");
    const playerPos = playerPosRef.current!;

    // Clear dash hit pairs when dash ends
    if (!dashState.active && prevDashActiveRef.current) {
      for (const key of hitPairsRef.current) {
        if (key.startsWith("dash-")) hitPairsRef.current.delete(key);
      }
    }
    prevDashActiveRef.current = dashState.active;

    // Clear roar hit pairs when roar ends
    if (!roarState.active && prevRoarActiveRef.current) {
      for (const key of hitPairsRef.current) {
        if (key.startsWith("roar-")) hitPairsRef.current.delete(key);
      }
    }
    prevRoarActiveRef.current = roarState.active;

    // Clear spin hit times when spin ends
    if (!spinState.active) {
      spinHitTimesRef.current.clear();
    }

    // Sword hits
    for (const effect of attackEffects) {
      for (const enemy of enemies) {
        const key = `sword-${effect.id}-${enemy.id}`;
        if (hitPairsRef.current.has(key)) continue;
        if (
          checkAABBCollision(
            effect.x - 5,
            effect.y - 5,
            30,
            30,
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height,
          )
        ) {
          hitPairsRef.current.add(key);
          applyDamage(enemy.id, DAMAGE_VALUES.sword);
        }
      }
    }

    // Fire hits
    for (const proj of fireProjectiles) {
      for (const enemy of enemies) {
        const key = `fire-${proj.id}-${enemy.id}`;
        if (hitPairsRef.current.has(key)) continue;
        if (
          checkAABBCollision(
            proj.x - 12,
            proj.y - 12,
            24,
            24,
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height,
          )
        ) {
          hitPairsRef.current.add(key);
          applyDamage(enemy.id, DAMAGE_VALUES.fire);
        }
      }
    }

    // Dash hits (player body)
    if (dashState.active) {
      for (const enemy of enemies) {
        const key = `dash-${enemy.id}`;
        if (hitPairsRef.current.has(key)) continue;
        if (
          checkAABBCollision(
            playerPos.x,
            playerPos.y,
            PLAYER_SIZE,
            PLAYER_SIZE,
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height,
          )
        ) {
          hitPairsRef.current.add(key);
          applyDamage(enemy.id, DAMAGE_VALUES.dash);
        }
      }
    }

    // Spin hits (4 orbs, rate-limited per enemy)
    if (spinState.active) {
      const pcx = playerPos.x + PLAYER_SIZE / 2;
      const pcy = playerPos.y + PLAYER_SIZE / 2;
      const orbs = [0, 1, 2, 3].map((i) => {
        const angle = (spinState.rotation * Math.PI) / 180 + (i * Math.PI) / 2;
        return {
          x: pcx + Math.cos(angle) * SPIN_RADIUS - 10,
          y: pcy + Math.sin(angle) * SPIN_RADIUS - 10,
        };
      });

      for (const enemy of enemies) {
        const lastHit = spinHitTimesRef.current.get(enemy.id) || 0;
        if (now - lastHit < SPIN_HIT_INTERVAL) continue;

        for (const orb of orbs) {
          if (
            checkAABBCollision(
              orb.x,
              orb.y,
              20,
              20,
              enemy.x,
              enemy.y,
              enemy.width,
              enemy.height,
            )
          ) {
            spinHitTimesRef.current.set(enemy.id, now);
            applyDamage(enemy.id, DAMAGE_VALUES.spin);
            break;
          }
        }
      }
    }

    // Roar hits (expanding ring)
    if (roarState.active) {
      const pcx = playerPos.x + PLAYER_SIZE / 2;
      const pcy = playerPos.y + PLAYER_SIZE / 2;

      for (const enemy of enemies) {
        const key = `roar-${enemy.id}`;
        if (hitPairsRef.current.has(key)) continue;

        const ecx = enemy.x + enemy.width / 2;
        const ecy = enemy.y + enemy.height / 2;
        const dist = Math.sqrt((pcx - ecx) ** 2 + (pcy - ecy) ** 2);

        if (dist < roarState.ringRadius + enemy.width / 2) {
          hitPairsRef.current.add(key);
          const norm = dist || 1;
          const kx = ((ecx - pcx) / norm) * ROAR_KNOCKBACK;
          const ky = ((ecy - pcy) / norm) * ROAR_KNOCKBACK;
          applyDamage(enemy.id, DAMAGE_VALUES.roar, kx, ky);
        }
      }
    }
  }, [
    attackEffects,
    fireProjectiles,
    dashState,
    spinState,
    roarState,
    playerPosRef,
    enemiesRef,
    applyDamage,
  ]);

  // Check if active attacks are hitting reactive objects (returns IDs of objects to activate)
  const checkObjectHits = useCallback(
    (
      objects: Array<{
        id: string;
        x: number;
        y: number;
        width: number;
        height: number;
        reactsTo: string[];
        objectState: string;
      }>,
    ): string[] => {
      const playerPos = playerPosRef.current!;
      const pcx = playerPos.x + PLAYER_SIZE / 2;
      const pcy = playerPos.y + PLAYER_SIZE / 2;
      const activated: string[] = [];

      for (const obj of objects) {
        if (obj.objectState !== "default" || obj.reactsTo.length === 0)
          continue;

        // Sword
        if (obj.reactsTo.includes("sword")) {
          for (const effect of attackEffects) {
            if (
              checkAABBCollision(
                effect.x - 5,
                effect.y - 5,
                30,
                30,
                obj.x,
                obj.y,
                obj.width,
                obj.height,
              )
            ) {
              activated.push(obj.id);
              break;
            }
          }
          if (activated.includes(obj.id)) continue;
        }

        // Fire
        if (obj.reactsTo.includes("fire")) {
          for (const proj of fireProjectiles) {
            if (
              checkAABBCollision(
                proj.x - 12,
                proj.y - 12,
                24,
                24,
                obj.x,
                obj.y,
                obj.width,
                obj.height,
              )
            ) {
              activated.push(obj.id);
              break;
            }
          }
          if (activated.includes(obj.id)) continue;
        }

        // Spin
        if (obj.reactsTo.includes("spin") && spinState.active) {
          const orbs = [0, 1, 2, 3].map((i) => {
            const angle =
              (spinState.rotation * Math.PI) / 180 + (i * Math.PI) / 2;
            return {
              x: pcx + Math.cos(angle) * SPIN_RADIUS - 10,
              y: pcy + Math.sin(angle) * SPIN_RADIUS - 10,
            };
          });
          for (const orb of orbs) {
            if (
              checkAABBCollision(
                orb.x,
                orb.y,
                20,
                20,
                obj.x,
                obj.y,
                obj.width,
                obj.height,
              )
            ) {
              activated.push(obj.id);
              break;
            }
          }
          if (activated.includes(obj.id)) continue;
        }

        // Roar
        if (obj.reactsTo.includes("roar") && roarState.active) {
          const ocx = obj.x + obj.width / 2;
          const ocy = obj.y + obj.height / 2;
          const dist = Math.sqrt((pcx - ocx) ** 2 + (pcy - ocy) ** 2);
          if (dist < roarState.ringRadius + obj.width / 2) {
            activated.push(obj.id);
          }
        }
      }

      return activated;
    },
    [attackEffects, fireProjectiles, spinState, roarState, playerPosRef],
  );

  return { checkCombat, checkObjectHits };
}
