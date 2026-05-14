import { useRef, useState } from "react";
import Controls from "./components/Controls";
import ExportButton from "./components/ExportButton";
import IconCanvas from "./components/IconCanvas";
import type { IconState } from "./types";

const DEFAULT_STATE: IconState = {
  mode: "lucide",
  backgroundColor: "#6366f1",
  iconName: "Heart",
  iconColor: "#ffffff",
  iconSize: 180,
  emoji: "🚀",
  borderRadius: 32,
};

export default function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<IconState>(DEFAULT_STATE);

  const update = <K extends keyof IconState>(key: K, value: IconState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col-reverse md:flex-row md:min-h-screen bg-background text-foreground">
      <Controls state={state} onUpdate={update} />

      <main className="flex-1 flex flex-col items-center justify-start md:justify-center gap-6 p-4 py-8 md:p-12 relative overflow-hidden">
        {/* Grille de points décorative */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.35 0.012 278) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.35,
          }}
        />

        {/* En-tête */}
        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Icon Maker
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            Crée et exporte ton icône en PNG 1080×1080
          </p>
        </div>

        {/* Zone de preview */}
        <div className="relative z-10 p-3 md:p-6 bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 w-full max-w-[448px]">
          <IconCanvas ref={canvasRef} state={state} />
        </div>

        {/* Bouton d'export */}
        <div className="relative z-10 w-full max-w-[448px] md:w-auto">
          <ExportButton canvasRef={canvasRef} />
        </div>
      </main>
    </div>
  );
}
