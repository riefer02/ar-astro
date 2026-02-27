import { useState, useRef, useCallback } from "react";
import type { Collectible } from "@/lib/games/types";
import {
  GEM_LIFETIME,
  GEM_PICKUP_RANGE,
  PLAYER_SIZE,
} from "@/lib/games/constants";

export function useCollectibles() {
  const [gems, setGems] = useState<Collectible[]>([]);
  const [score, setScore] = useState(0);
  const gemsRef = useRef<Collectible[]>([]);
  const nextIdRef = useRef(0);

  const spawnLootBurst = useCallback((x: number, y: number, count: number) => {
    const newGems: Collectible[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const dist = 20 + Math.random() * 15;
      newGems.push({
        id: nextIdRef.current++,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        createdAt: Date.now(),
      });
    }
    gemsRef.current = [...gemsRef.current, ...newGems];
    setGems(gemsRef.current);
  }, []);

  const updateCollectibles = useCallback((playerX: number, playerY: number) => {
    const now = Date.now();
    let collected = 0;
    const pcx = playerX + PLAYER_SIZE / 2;
    const pcy = playerY + PLAYER_SIZE / 2;

    const remaining = gemsRef.current.filter((gem) => {
      if (now - gem.createdAt > GEM_LIFETIME) return false;
      const dx = pcx - gem.x;
      const dy = pcy - gem.y;
      if (Math.sqrt(dx * dx + dy * dy) < GEM_PICKUP_RANGE) {
        collected++;
        return false;
      }
      return true;
    });

    if (collected > 0 || remaining.length !== gemsRef.current.length) {
      gemsRef.current = remaining;
      setGems(remaining);
      if (collected > 0) {
        setScore((prev) => prev + collected);
      }
    }
  }, []);

  return { gems, score, spawnLootBurst, updateCollectibles };
}
