import { useEffect, useRef } from "react";

/**
 * Generic RAF game loop with pause support.
 * Stores onTick in a ref so the loop never restarts when the callback changes.
 * Only depends on `paused` — fixes the bug where the loop restarted on every direction change.
 */
export function useGameLoop({
  paused,
  onTick,
}: {
  paused: boolean;
  onTick: (deltaTime: number) => void;
}) {
  const onTickRef = useRef(onTick);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    onTickRef.current = onTick;
  });

  useEffect(() => {
    if (paused) return;

    let frameId: number;

    const loop = (time: number) => {
      const delta = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;
      onTickRef.current(delta);
      frameId = requestAnimationFrame(loop);
    };

    lastTimeRef.current = 0;
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, [paused]);
}
