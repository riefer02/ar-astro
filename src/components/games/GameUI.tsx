import type { InteractiveObject } from "@/lib/games/types";

interface GameUIProps {
  dialogue: string | null;
  dialogueTarget: string | null;
  facingObject: InteractiveObject | null;
  showControls: boolean;
  onCloseDialogue: () => void;
}

export function GameUI({
  dialogue,
  dialogueTarget,
  facingObject,
  showControls,
}: GameUIProps) {
  return (
    <>
      {/* Interaction Prompt — replaces IIFE with clean conditional */}
      {!dialogue && facingObject && (
        <div
          className="pointer-events-none absolute animate-bounce rounded-full bg-foreground px-3 py-1 text-sm font-bold text-background"
          style={{
            left: facingObject.x + facingObject.width / 2 - 40,
            top: facingObject.y - 30,
          }}
        >
          Press E
        </div>
      )}

      {/* Dialogue Box */}
      {dialogue && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border-2 border-border bg-foreground p-4 shadow-lg">
          <h3 className="mb-2 text-sm font-bold text-background/80">
            {dialogueTarget}
          </h3>
          <p className="text-lg text-background">{dialogue}</p>
          <p className="mt-2 text-xs text-background/70">
            Press SPACE or ESC to close
          </p>
        </div>
      )}

      {/* Controls Hint */}
      {showControls && (
        <div className="absolute right-4 top-4 rounded-lg border border-border bg-foreground/80 p-3 text-sm text-background/80">
          <p className="mb-1 font-bold text-background">Controls:</p>
          <p>WASD / Arrows - Move</p>
          <p>SPACE - Attack</p>
          <p>E - Interact</p>
        </div>
      )}
    </>
  );
}
