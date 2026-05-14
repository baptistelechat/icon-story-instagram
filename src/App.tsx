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
    <div className="min-h-screen flex bg-gray-950 text-white">
      <Controls state={state} onUpdate={update} />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-12">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Icon Maker
          </h1>
          <p className="text-sm text-gray-500">
            Crée et exporte ton icône en PNG 1080×1080
          </p>
        </div>
        <div className="p-8 bg-gray-900 rounded-2xl shadow-2xl">
          <IconCanvas ref={canvasRef} state={state} />
        </div>
        <ExportButton canvasRef={canvasRef} />
      </main>
    </div>
  );
}
