import type { AttackEffect, Direction, InteractiveObject, Position } from "@/lib/games/types";
import { GAME_HEIGHT, GAME_WIDTH, PLAYER_SIZE } from "@/lib/games/constants";
import { getDragonEmoji, getRotationDegrees, getAttackEffectStyle } from "@/lib/games/direction-utils";

interface GameCanvasProps {
  playerPosition: Position;
  playerDirection: Direction;
  playerIsMoving: boolean;
  playerIsAttacking: boolean;
  objects: InteractiveObject[];
  attackEffects: AttackEffect[];
  children?: React.ReactNode;
}

export function GameCanvas({
  playerPosition,
  playerDirection,
  playerIsMoving,
  playerIsAttacking,
  objects,
  attackEffects,
  children,
}: GameCanvasProps) {
  const rotation = getRotationDegrees(playerDirection);

  return (
    <div
      className="relative overflow-hidden rounded-lg border-4 border-stone-600 bg-stone-800 shadow-2xl"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
    >
      {/* Floor Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #57534e 25%, transparent 25%),
            linear-gradient(-45deg, #57534e 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #57534e 75%),
            linear-gradient(-45deg, transparent 75%, #57534e 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />

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

      {/* Player — sets --rotation CSS var so the bounce keyframe preserves rotation */}
      <div
        className="absolute flex select-none items-center justify-center text-5xl"
        style={{
          left: playerPosition.x,
          top: playerPosition.y,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
          "--rotation": `${rotation}deg`,
          transform: `rotate(${rotation}deg)`,
          animation: playerIsMoving ? "dragon-bounce 0.3s infinite" : "none",
          filter: playerIsAttacking ? "brightness(1.3)" : "none",
        } as React.CSSProperties}
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

      {/* Overlay UI (interaction prompt, dialogue, controls) rendered as children */}
      {children}

      {/* CSS Animations — uses --rotation CSS var to preserve direction during bounce */}
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
      `}</style>
    </div>
  );
}
