import { useState, useRef, useCallback } from "react";
import { MAX_HP, INVINCIBILITY_DURATION } from "@/lib/games/constants";

export function usePlayerHealth() {
  const [hp, setHp] = useState(MAX_HP);
  const invincibleUntilRef = useRef(0);

  const takeDamage = useCallback((amount: number): boolean => {
    const now = Date.now();
    if (now < invincibleUntilRef.current) return false;
    invincibleUntilRef.current = now + INVINCIBILITY_DURATION;
    setHp((prev) => Math.max(0, prev - amount));
    return true;
  }, []);

  const heal = useCallback((amount: number) => {
    setHp((prev) => Math.min(MAX_HP, prev + amount));
  }, []);

  const isInvincible = useCallback(() => {
    return Date.now() < invincibleUntilRef.current;
  }, []);

  return { hp, maxHp: MAX_HP, takeDamage, heal, isInvincible, isDead: hp <= 0 };
}
