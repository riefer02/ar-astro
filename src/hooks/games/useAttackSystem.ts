import { useState, useRef, useCallback } from "react";
import type { AttackEffect, Direction, Position } from "@/lib/games/types";
import { ATTACK_COOLDOWN, ATTACK_DURATION } from "@/lib/games/constants";
import { getAttackOffset } from "@/lib/games/direction-utils";

/**
 * Manages attack cooldown, effects array, and auto-cleanup.
 * Uses refs for lastAttackTime to avoid stale closures.
 */
export function useAttackSystem() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackEffects, setAttackEffects] = useState<AttackEffect[]>([]);
  const lastAttackTimeRef = useRef(0);

  const performAttack = useCallback(
    (direction: Direction, position: Position) => {
      const now = Date.now();
      if (now - lastAttackTimeRef.current < ATTACK_COOLDOWN) return;

      lastAttackTimeRef.current = now;
      setIsAttacking(true);

      const offset = getAttackOffset(direction);
      const effect: AttackEffect = {
        id: now,
        x: position.x + offset.x,
        y: position.y + offset.y,
        direction,
        timestamp: now,
      };

      setAttackEffects((prev) => [...prev, effect]);

      setTimeout(() => {
        setIsAttacking(false);
      }, ATTACK_DURATION);

      setTimeout(() => {
        setAttackEffects((prev) => prev.filter((e) => e.id !== now));
      }, ATTACK_DURATION + 100);
    },
    [],
  );

  return { isAttacking, attackEffects, performAttack };
}
