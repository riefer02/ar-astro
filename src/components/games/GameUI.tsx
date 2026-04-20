import type { ReactiveObject } from "@/lib/games/types";

interface QuestStep {
  id: string;
  label: string;
  complete: boolean;
}

interface GameUIProps {
  dialogue: string | null;
  dialogueTarget: string | null;
  facingObject: ReactiveObject | null;
  showControls: boolean;
  onCloseDialogue: () => void;
  isTouchDevice?: boolean;
  questSteps: QuestStep[];
  doorUnlocked: boolean;
}

export function GameUI({
  dialogue,
  dialogueTarget,
  facingObject,
  showControls,
  onCloseDialogue,
  isTouchDevice,
  questSteps,
  doorUnlocked,
}: GameUIProps) {
  const promptText =
    facingObject?.id === "door1" && doorUnlocked
      ? isTouchDevice
        ? "Tap 🌌"
        : "Press E to escape"
      : isTouchDevice
        ? "Tap 💬"
        : "Press E";

  return (
    <>
      {/* Interaction Prompt */}
      {!dialogue && facingObject && (
        <div
          className="pointer-events-none absolute animate-bounce rounded-full bg-foreground px-3 py-1 text-sm font-bold text-background"
          style={{
            left: facingObject.x + facingObject.width / 2,
            top: facingObject.y - 30,
            transform: "translateX(-50%)",
          }}
        >
          {promptText}
        </div>
      )}

      {/* Dialogue Box */}
      {dialogue && (
        <div
          className="absolute bottom-4 left-4 right-4 cursor-pointer rounded-lg border-2 border-border bg-foreground p-4 shadow-lg"
          onClick={onCloseDialogue}
        >
          <h3 className="mb-2 text-sm font-bold text-background/80">
            {dialogueTarget}
          </h3>
          <p className="whitespace-pre-line text-lg text-background">
            {dialogue}
          </p>
          <p className="mt-2 text-xs text-background/70">
            {isTouchDevice ? "Tap to close" : "Press SPACE or ESC to close"}
          </p>
        </div>
      )}

      {/* Controls Hint */}
      {showControls && !isTouchDevice && (
        <div className="absolute right-4 top-4 rounded-lg border border-border bg-foreground/80 p-3 text-sm text-background/80">
          <p className="mb-1 font-bold text-background">Controls:</p>
          <p>WASD / Arrows - Move</p>
          <p>SPACE - Attack</p>
          <p>E - Interact</p>
          <p>Q - Fire Breath</p>
          <p>Shift - Wing Dash</p>
          <p>R - Spin Attack</p>
          <p>F - Dragon Roar</p>
        </div>
      )}

      {/* Secret quest tracker */}
      <div
        className={`absolute right-4 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
          showControls && !isTouchDevice ? "top-[124px]" : "top-4"
        } border-border bg-background/80 text-sm text-foreground`}
        style={{ maxWidth: 250 }}
      >
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-300/80">
          {doorUnlocked ? "Secret Found" : "Hidden Quest"}
        </p>
        <p className="mb-3 text-sm font-semibold text-foreground">
          {doorUnlocked ? "Return to the north gate" : "Wake the ancient gate"}
        </p>
        <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          {questSteps.map((step) => (
            <li
              key={step.id}
              className={
                step.complete
                  ? "flex items-start gap-2 text-emerald-300"
                  : "flex items-start gap-2"
              }
            >
              <span className="mt-0.5 inline-block w-4 text-center font-bold">
                {step.complete ? "✓" : "•"}
              </span>
              <span>{step.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
