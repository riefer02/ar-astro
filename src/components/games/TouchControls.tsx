import type { Direction } from "@/lib/games/types";

interface TouchControlsProps {
  onDpadStart: (dir: Direction) => void;
  onDpadEnd: () => void;
  onAttack: () => void;
  onInteract: () => void;
  onFire: () => void;
  onDash: () => void;
  onSpin: () => void;
  onRoar: () => void;
}

function DpadButton({
  direction,
  label,
  className,
  onDpadStart,
  onDpadEnd,
}: {
  direction: Direction;
  label: string;
  className: string;
  onDpadStart: (dir: Direction) => void;
  onDpadEnd: () => void;
}) {
  return (
    <button
      className={`flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-foreground/80 text-xl text-background active:bg-foreground ${className}`}
      onTouchStart={(e) => {
        e.preventDefault();
        onDpadStart(direction);
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onDpadEnd();
      }}
      onTouchCancel={onDpadEnd}
      aria-label={`Move ${direction}`}
    >
      {label}
    </button>
  );
}

function ActionButton({
  label,
  ariaLabel,
  onPress,
}: {
  label: string;
  ariaLabel: string;
  onPress: () => void;
}) {
  return (
    <button
      className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border bg-foreground/80 text-xl active:bg-foreground"
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}

export function TouchControls({
  onDpadStart,
  onDpadEnd,
  onAttack,
  onInteract,
  onFire,
  onDash,
  onSpin,
  onRoar,
}: TouchControlsProps) {
  return (
    <div
      className="flex w-full items-center justify-between px-4 py-3"
      style={{ touchAction: "none" }}
    >
      {/* D-pad */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        <div /> {/* top-left spacer */}
        <DpadButton
          direction="up"
          label="▲"
          className=""
          onDpadStart={onDpadStart}
          onDpadEnd={onDpadEnd}
        />
        <div /> {/* top-right spacer */}
        <DpadButton
          direction="left"
          label="◀"
          className=""
          onDpadStart={onDpadStart}
          onDpadEnd={onDpadEnd}
        />
        <div /> {/* center spacer */}
        <DpadButton
          direction="right"
          label="▶"
          className=""
          onDpadStart={onDpadStart}
          onDpadEnd={onDpadEnd}
        />
        <div /> {/* bottom-left spacer */}
        <DpadButton
          direction="down"
          label="▼"
          className=""
          onDpadStart={onDpadStart}
          onDpadEnd={onDpadEnd}
        />
        <div /> {/* bottom-right spacer */}
      </div>

      {/* Action buttons — 2×3 grid */}
      <div className="grid grid-cols-3 gap-2">
        <ActionButton label="💬" ariaLabel="Interact" onPress={onInteract} />
        <ActionButton label="⚔️" ariaLabel="Attack" onPress={onAttack} />
        <ActionButton label="🔥" ariaLabel="Fire Breath" onPress={onFire} />
        <ActionButton label="💨" ariaLabel="Wing Dash" onPress={onDash} />
        <ActionButton label="🌀" ariaLabel="Spin Attack" onPress={onSpin} />
        <ActionButton label="📢" ariaLabel="Dragon Roar" onPress={onRoar} />
      </div>
    </div>
  );
}
