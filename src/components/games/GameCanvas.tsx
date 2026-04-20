import type {
  AttackEffect,
  Collectible,
  DashState,
  Direction,
  Enemy,
  FireProjectile,
  HitEffect,
  Position,
  ReactiveObject,
  RoarState,
  SpinState,
} from "@/lib/games/types";
import {
  ENEMY_DEATH_DURATION,
  GAME_HEIGHT,
  GAME_WIDTH,
  GEM_SIZE,
  HIT_EFFECT_DURATION,
  PLAYER_SIZE,
  SPIN_RADIUS,
} from "@/lib/games/constants";
import {
  getDragonEmoji,
  getRotationDegrees,
  getAttackEffectStyle,
} from "@/lib/games/direction-utils";

interface GameCanvasProps {
  playerPosition: Position;
  playerDirection: Direction;
  playerIsMoving: boolean;
  playerIsAttacking: boolean;
  playerIsInvincible: boolean;
  objects: ReactiveObject[];
  attackEffects: AttackEffect[];
  fireProjectiles: FireProjectile[];
  dashState: DashState;
  spinState: SpinState;
  roarState: RoarState;
  enemies: Enemy[];
  gems: Collectible[];
  hitEffects: HitEffect[];
  hp: number;
  maxHp: number;
  score: number;
  isDead: boolean;
  isVictory: boolean;
  onRestart: () => void;
  children?: React.ReactNode;
}

export function GameCanvas({
  playerPosition,
  playerDirection,
  playerIsMoving,
  playerIsAttacking,
  playerIsInvincible,
  objects,
  attackEffects,
  fireProjectiles,
  dashState,
  spinState,
  roarState,
  enemies,
  gems,
  hitEffects,
  hp,
  maxHp,
  score,
  isDead,
  isVictory,
  onRestart,
  children,
}: GameCanvasProps) {
  const rotation = spinState.active
    ? spinState.rotation
    : getRotationDegrees(playerDirection);
  const playerCenterX = playerPosition.x + PLAYER_SIZE / 2;
  const playerCenterY = playerPosition.y + PLAYER_SIZE / 2;
  const now = Date.now();

  return (
    <div
      className="relative overflow-hidden rounded-lg border-4 border-border bg-primary shadow-2xl"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        touchAction: "none",
        transform: roarState.active
          ? `translate(${roarState.shakeOffset.x}px, ${roarState.shakeOffset.y}px)`
          : undefined,
      }}
    >
      {/* Floor Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, hsl(var(--surface-3)) 25%, transparent 25%),
            linear-gradient(-45deg, hsl(var(--surface-3)) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, hsl(var(--surface-3)) 75%),
            linear-gradient(-45deg, transparent 75%, hsl(var(--surface-3)) 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />

      {/* Collectible Gems */}
      {gems.map((gem) => {
        const age = now - gem.createdAt;
        const fadeStart = 8000;
        const opacity = age > fadeStart ? 1 - (age - fadeStart) / 2000 : 1;
        return (
          <div
            key={gem.id}
            className="pointer-events-none absolute flex select-none items-center justify-center text-xl"
            style={{
              left: gem.x - GEM_SIZE / 2,
              top: gem.y - GEM_SIZE / 2,
              width: GEM_SIZE,
              height: GEM_SIZE,
              opacity,
              animation: "gem-bob 0.6s ease-in-out infinite alternate",
            }}
          >
            {"\uD83D\uDC8E"}
          </div>
        );
      })}

      {/* Enemies */}
      {enemies.map((enemy) => {
        const isDying = enemy.state === "dead";
        const isFlashing = now < enemy.hitFlashUntil;
        const deathProgress =
          isDying && enemy.deathStartedAt
            ? Math.min(1, (now - enemy.deathStartedAt) / ENEMY_DEATH_DURATION)
            : 0;

        return (
          <div
            key={enemy.id}
            className="pointer-events-none absolute flex select-none items-center justify-center text-3xl"
            style={{
              left: enemy.x,
              top: enemy.y,
              width: enemy.width,
              height: enemy.height,
              filter: isFlashing ? "brightness(3)" : undefined,
              opacity: isDying ? 1 - deathProgress : 1,
              transform: isDying
                ? `scale(${1 + deathProgress * 0.5})`
                : undefined,
            }}
          >
            {enemy.emoji}
          </div>
        );
      })}

      {/* Interactive Objects */}
      {objects.map((obj) => (
        <div
          key={obj.id}
          className="absolute flex cursor-pointer select-none items-center justify-center text-4xl transition-transform hover:scale-110"
          style={{
            left: obj.x,
            top: obj.y,
            width: obj.width,
            height: obj.height,
          }}
          title={obj.name}
        >
          {obj.emoji}
        </div>
      ))}

      {/* Dash Afterimages */}
      {dashState.active &&
        dashState.trail.map((pos, i) => (
          <div
            key={`trail-${i}`}
            className="pointer-events-none absolute flex select-none items-center justify-center text-5xl"
            style={{
              left: pos.x,
              top: pos.y,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              opacity: 0.3 - i * 0.08,
              transform: `rotate(${getRotationDegrees(dashState.direction)}deg)`,
              filter: "blur(1px)",
            }}
          >
            {getDragonEmoji(dashState.direction)}
          </div>
        ))}

      {/* Player */}
      <div
        className="absolute flex select-none items-center justify-center text-5xl"
        style={
          {
            left: playerPosition.x,
            top: playerPosition.y,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            "--rotation": `${rotation}deg`,
            transform: `rotate(${rotation}deg)`,
            animation:
              playerIsMoving && !spinState.active
                ? "dragon-bounce 0.3s infinite"
                : "none",
            filter:
              playerIsAttacking || spinState.active
                ? "brightness(1.3)"
                : dashState.active
                  ? "brightness(1.5) saturate(1.5)"
                  : "none",
            opacity: playerIsInvincible
              ? Math.floor(now / 100) % 2 === 0
                ? 0.3
                : 1
              : 1,
          } as React.CSSProperties
        }
      >
        {getDragonEmoji(playerDirection)}
      </div>

      {/* Attack Effects */}
      {attackEffects.map((effect) => (
        <div
          key={effect.id}
          className="pointer-events-none absolute text-3xl"
          style={{
            ...getAttackEffectStyle(effect.x, effect.y, effect.direction),
            animation: "dragon-swipe 0.3s ease-out forwards",
          }}
        >
          <span className="font-bold text-red-500">{"\u2694\uFE0F"}</span>
        </div>
      ))}

      {/* Fire Projectiles */}
      {fireProjectiles.map((proj) => (
        <div
          key={proj.id}
          className="pointer-events-none absolute text-2xl"
          style={{
            left: proj.x - 12,
            top: proj.y - 12,
            transform: `scale(${proj.scale})`,
            animation: "fire-glow 0.3s ease-in-out infinite alternate",
          }}
        >
          {"\uD83D\uDD25"}
        </div>
      ))}

      {/* Spin Attack Orbs */}
      {spinState.active &&
        [0, 1, 2, 3].map((i) => {
          const angle =
            (spinState.rotation * Math.PI) / 180 + (i * Math.PI) / 2;
          const orbX = playerCenterX + Math.cos(angle) * SPIN_RADIUS - 10;
          const orbY = playerCenterY + Math.sin(angle) * SPIN_RADIUS - 10;
          return (
            <div
              key={`orb-${i}`}
              className="pointer-events-none absolute text-xl"
              style={{
                left: orbX,
                top: orbY,
                animation: "spin-flash 0.25s ease-in-out infinite alternate",
              }}
            >
              {"\u26A1"}
            </div>
          );
        })}

      {/* Roar Ring */}
      {roarState.active && (
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: playerCenterX - roarState.ringRadius,
            top: playerCenterY - roarState.ringRadius,
            width: roarState.ringRadius * 2,
            height: roarState.ringRadius * 2,
            border: `3px solid rgba(255, 200, 50, ${1 - roarState.elapsed / 600})`,
            boxShadow: `0 0 ${10 + roarState.ringRadius * 0.2}px rgba(255, 200, 50, ${0.5 - (roarState.elapsed / 600) * 0.5})`,
            animation: "roar-burst 0.6s ease-out forwards",
          }}
        />
      )}

      {/* Dash Puff at start position */}
      {dashState.active && (
        <div
          className="pointer-events-none absolute text-2xl"
          style={{
            left: dashState.startX,
            top: dashState.startY,
            animation: "dash-puff 0.3s ease-out forwards",
          }}
        >
          {"\uD83D\uDCA8"}
        </div>
      )}

      {/* Hit Effects */}
      {hitEffects.map((effect) => {
        const age = now - effect.createdAt;
        const progress = Math.min(1, age / HIT_EFFECT_DURATION);
        return (
          <div
            key={effect.id}
            className="pointer-events-none absolute text-xl"
            style={{
              left: effect.x - 10,
              top: effect.y - 10 - progress * 20,
              opacity: 1 - progress,
              transform: `scale(${1 + progress * 0.5})`,
            }}
          >
            {effect.emoji}
          </div>
        );
      })}

      {/* HUD - Hearts */}
      <div className="absolute left-3 top-3 flex gap-1">
        {Array.from({ length: maxHp }, (_, i) => (
          <span key={i} className="text-lg leading-none">
            {i < hp ? "\u2764\uFE0F" : "\uD83D\uDDA4"}
          </span>
        ))}
      </div>

      {/* HUD - Score */}
      <div className="absolute left-3 top-9 text-sm font-bold text-yellow-400 drop-shadow-md">
        {"\uD83D\uDC8E"} {score}
      </div>

      {/* Overlay UI (dialogue, prompts, controls) */}
      {children}

      {/* Victory Screen */}
      {isVictory && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/75 px-6 text-center">
          <div className="mb-4 text-6xl">{"\uD83C\uDFC6"}</div>
          <h2 className="mb-3 text-4xl font-bold text-emerald-300">
            Secret Complete
          </h2>
          <p className="mb-2 max-w-md text-lg text-foreground">
            You woke the ancient gate, cleared the grotto, and escaped with a
            dragon's hoard.
          </p>
          <p className="mb-6 text-xl text-yellow-400">
            {"\uD83D\uDC8E"} Final Score: {score}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-lg bg-foreground px-6 py-3 text-lg font-bold text-background transition hover:opacity-90"
              onClick={onRestart}
            >
              Play Again
            </button>
            <a
              className="rounded-lg border border-border bg-background/80 px-6 py-3 text-lg font-bold text-foreground transition hover:bg-background"
              href="/"
            >
              Return Home
            </a>
          </div>
        </div>
      )}

      {/* Death Screen */}
      {isDead && !isVictory && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <h2 className="mb-4 text-4xl font-bold text-red-500">Game Over</h2>
          <p className="mb-6 text-xl text-yellow-400">
            {"\uD83D\uDC8E"} Score: {score}
          </p>
          <button
            className="rounded-lg bg-foreground px-6 py-3 text-lg font-bold text-background transition hover:opacity-90"
            onClick={onRestart}
          >
            Play Again
          </button>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes dragon-bounce {
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-3px) rotate(var(--rotation, 0deg)); }
        }

        @keyframes dragon-swipe {
          0% {
            opacity: 1;
            scale: 0.5;
          }
          50% {
            opacity: 1;
            scale: 1.2;
          }
          100% {
            opacity: 0;
            scale: 1.5;
          }
        }

        @keyframes fire-glow {
          0% { filter: brightness(1) drop-shadow(0 0 4px orange); }
          100% { filter: brightness(1.3) drop-shadow(0 0 8px orangered); }
        }

        @keyframes dash-puff {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }

        @keyframes spin-flash {
          0% { filter: brightness(1) drop-shadow(0 0 3px yellow); }
          100% { filter: brightness(1.4) drop-shadow(0 0 6px cyan); }
        }

        @keyframes roar-burst {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes gem-bob {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
