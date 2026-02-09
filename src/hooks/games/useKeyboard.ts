import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks pressed keys in a Set ref (no re-renders per keypress).
 * Provides helpers to query key state and an optional onKeyDown callback for action keys.
 */
export function useKeyboard({
  enabled = true,
  onKeyDown,
}: {
  enabled?: boolean;
  onKeyDown?: (key: string, event: KeyboardEvent) => void;
} = {}) {
  const keysRef = useRef<Set<string>>(new Set());
  const onKeyDownRef = useRef(onKeyDown);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  });

  useEffect(() => {
    enabledRef.current = enabled;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      if (e.key === " " || key === "e") {
        e.preventDefault();
      }

      onKeyDownRef.current?.(key, e);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const isKeyPressed = useCallback((key: string) => {
    return keysRef.current.has(key);
  }, []);

  const isAnyKeyPressed = useCallback((keys: Set<string>) => {
    for (const key of keys) {
      if (keysRef.current.has(key)) return true;
    }
    return false;
  }, []);

  return { isKeyPressed, isAnyKeyPressed, keysRef };
}
