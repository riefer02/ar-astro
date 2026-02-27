import { useState, useRef, useCallback } from "react";
import type {
  Bounds,
  DashState,
  Direction,
  FireProjectile,
  GameObject,
  Position,
  RoarState,
  SpinState,
} from "@/lib/games/types";
import {
  DIRECTION_VECTORS,
  PLAYER_SIZE,
  FIRE_SPEED,
  FIRE_DURATION,
  FIRE_COOLDOWN,
  DASH_DURATION,
  DASH_COOLDOWN,
  DASH_SPEED,
  SPIN_DURATION,
  SPIN_COOLDOWN,
  SPIN_ROTATIONS,
  ROAR_DURATION,
  ROAR_COOLDOWN,
  ROAR_MAX_RADIUS,
  SHAKE_INTENSITY,
} from "@/lib/games/constants";
import { checkCollision } from "@/lib/games/collision";

const INITIAL_DASH: DashState = {
  active: false,
  startX: 0,
  startY: 0,
  direction: "down",
  elapsed: 0,
  trail: [],
};

const INITIAL_SPIN: SpinState = {
  active: false,
  elapsed: 0,
  rotation: 0,
};

const INITIAL_ROAR: RoarState = {
  active: false,
  elapsed: 0,
  ringRadius: 0,
  shakeOffset: { x: 0, y: 0 },
};

export function usePowers({
  positionRef,
  directionRef,
  bounds,
  obstacles,
  forcePosition,
}: {
  positionRef: React.MutableRefObject<Position>;
  directionRef: React.MutableRefObject<Direction>;
  bounds: Bounds;
  obstacles: GameObject[];
  forcePosition: (pos: Position) => void;
}) {
  // Fire Breath
  const [fireProjectiles, setFireProjectiles] = useState<FireProjectile[]>([]);
  const fireProjectilesRef = useRef<FireProjectile[]>([]);
  const lastFireTimeRef = useRef(0);

  // Wing Dash
  const [dashState, setDashState] = useState<DashState>(INITIAL_DASH);
  const dashRef = useRef<DashState>(INITIAL_DASH);
  const lastDashTimeRef = useRef(0);

  // Spin Attack
  const [spinState, setSpinState] = useState<SpinState>(INITIAL_SPIN);
  const spinRef = useRef<SpinState>(INITIAL_SPIN);
  const lastSpinTimeRef = useRef(0);

  // Dragon Roar
  const [roarState, setRoarState] = useState<RoarState>(INITIAL_ROAR);
  const roarRef = useRef<RoarState>(INITIAL_ROAR);
  const lastRoarTimeRef = useRef(0);

  const fireBreath = useCallback(() => {
    const now = Date.now();
    if (now - lastFireTimeRef.current < FIRE_COOLDOWN) return;
    lastFireTimeRef.current = now;

    const pos = positionRef.current;
    const dir = directionRef.current;
    const vec = DIRECTION_VECTORS[dir];
    const half = PLAYER_SIZE / 2;

    const projectile: FireProjectile = {
      id: now,
      x: pos.x + half + vec.x * 20,
      y: pos.y + half + vec.y * 20,
      direction: dir,
      createdAt: now,
      scale: 1.0,
    };

    fireProjectilesRef.current = [...fireProjectilesRef.current, projectile];
    setFireProjectiles(fireProjectilesRef.current);
  }, [positionRef, directionRef]);

  const wingDash = useCallback(() => {
    const now = Date.now();
    if (now - lastDashTimeRef.current < DASH_COOLDOWN) return;
    if (dashRef.current.active) return;
    lastDashTimeRef.current = now;

    const pos = positionRef.current;
    const dir = directionRef.current;

    const state: DashState = {
      active: true,
      startX: pos.x,
      startY: pos.y,
      direction: dir,
      elapsed: 0,
      trail: [{ x: pos.x, y: pos.y }],
    };
    dashRef.current = state;
    setDashState(state);
  }, [positionRef, directionRef]);

  const spinAttack = useCallback(() => {
    const now = Date.now();
    if (now - lastSpinTimeRef.current < SPIN_COOLDOWN) return;
    if (spinRef.current.active) return;
    lastSpinTimeRef.current = now;

    const state: SpinState = { active: true, elapsed: 0, rotation: 0 };
    spinRef.current = state;
    setSpinState(state);
  }, []);

  const dragonRoar = useCallback(() => {
    const now = Date.now();
    if (now - lastRoarTimeRef.current < ROAR_COOLDOWN) return;
    if (roarRef.current.active) return;
    lastRoarTimeRef.current = now;

    const state: RoarState = {
      active: true,
      elapsed: 0,
      ringRadius: 0,
      shakeOffset: { x: 0, y: 0 },
    };
    roarRef.current = state;
    setRoarState(state);
  }, []);

  const updatePowers = useCallback(
    (deltaTime: number) => {
      // --- Fire projectiles ---
      let projectiles = fireProjectilesRef.current;
      if (projectiles.length > 0) {
        const now = Date.now();
        projectiles = projectiles
          .map((p) => {
            const vec = DIRECTION_VECTORS[p.direction];
            const speed = FIRE_SPEED * (deltaTime / 16);
            const age = now - p.createdAt;
            return {
              ...p,
              x: p.x + vec.x * speed,
              y: p.y + vec.y * speed,
              scale: 1.0 + (age / FIRE_DURATION) * 0.4,
            };
          })
          .filter((p) => {
            const age = Date.now() - p.createdAt;
            if (age > FIRE_DURATION) return false;
            if (p.x < -20 || p.x > bounds.width + 20) return false;
            if (p.y < -20 || p.y > bounds.height + 20) return false;
            return true;
          });
        fireProjectilesRef.current = projectiles;
        setFireProjectiles(projectiles);
      }

      // --- Wing Dash ---
      const dash = dashRef.current;
      if (dash.active) {
        const newElapsed = dash.elapsed + deltaTime;
        if (newElapsed >= DASH_DURATION) {
          const done = { ...INITIAL_DASH };
          dashRef.current = done;
          setDashState(done);
        } else {
          const vec = DIRECTION_VECTORS[dash.direction];
          const moveAmt = DASH_SPEED * (deltaTime / 16);
          const pos = positionRef.current;
          const newX = pos.x + vec.x * moveAmt;
          const newY = pos.y + vec.y * moveAmt;

          if (
            checkCollision(
              newX,
              newY,
              PLAYER_SIZE,
              PLAYER_SIZE,
              bounds,
              obstacles,
            )
          ) {
            // Hit wall/obstacle — stop dash
            const done = { ...INITIAL_DASH };
            dashRef.current = done;
            setDashState(done);
          } else {
            forcePosition({ x: newX, y: newY });

            // Record trail (max 3 positions)
            const trail = [...dash.trail, { x: newX, y: newY }].slice(-3);
            const updated: DashState = {
              ...dash,
              elapsed: newElapsed,
              trail,
            };
            dashRef.current = updated;
            setDashState(updated);
          }
        }
      }

      // --- Spin Attack ---
      const spin = spinRef.current;
      if (spin.active) {
        const newElapsed = spin.elapsed + deltaTime;
        if (newElapsed >= SPIN_DURATION) {
          const done = { ...INITIAL_SPIN };
          spinRef.current = done;
          setSpinState(done);
        } else {
          const progress = newElapsed / SPIN_DURATION;
          const rotation = progress * SPIN_ROTATIONS * 360;
          const updated: SpinState = {
            active: true,
            elapsed: newElapsed,
            rotation,
          };
          spinRef.current = updated;
          setSpinState(updated);
        }
      }

      // --- Dragon Roar ---
      const roar = roarRef.current;
      if (roar.active) {
        const newElapsed = roar.elapsed + deltaTime;
        if (newElapsed >= ROAR_DURATION) {
          const done = { ...INITIAL_ROAR };
          roarRef.current = done;
          setRoarState(done);
        } else {
          const progress = newElapsed / ROAR_DURATION;
          const ringRadius = progress * ROAR_MAX_RADIUS;

          let shakeOffset: Position = { x: 0, y: 0 };
          if (newElapsed < 400) {
            const shakeDecay = 1 - newElapsed / 400;
            shakeOffset = {
              x: (Math.random() * 2 - 1) * SHAKE_INTENSITY * shakeDecay,
              y: (Math.random() * 2 - 1) * SHAKE_INTENSITY * shakeDecay,
            };
          }

          const updated: RoarState = {
            active: true,
            elapsed: newElapsed,
            ringRadius,
            shakeOffset,
          };
          roarRef.current = updated;
          setRoarState(updated);
        }
      }
    },
    [bounds, obstacles, positionRef, forcePosition],
  );

  return {
    fireProjectiles,
    dashState,
    spinState,
    roarState,
    isDashing: dashState.active,
    fireBreath,
    wingDash,
    spinAttack,
    dragonRoar,
    updatePowers,
  };
}
