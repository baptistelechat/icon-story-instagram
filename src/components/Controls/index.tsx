import type { IconState, IconMode } from "../../types";
import IconPicker from "./components/IconPicker";

interface ControlsProps {
  state: IconState;
  onUpdate: <K extends keyof IconState>(key: K, value: IconState[K]) => void;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      {children}
    </div>
  );
}

function ColorInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0.5"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} — code hexadécimal`}
        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}

export default function Controls({ state, onUpdate }: ControlsProps) {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col gap-6 p-5 overflow-y-auto">
      <h2 className="text-base font-bold text-white tracking-tight">
        Paramètres
      </h2>

      <Field label="Type">
        <div className="flex rounded-lg overflow-hidden border border-gray-700">
          {(["lucide", "emoji"] as IconMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onUpdate("mode", m)}
              aria-pressed={state.mode === m}
              className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                state.mode === m
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {m === "lucide" ? "⚡ Lucide" : "😀 Emoji"}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Couleur de fond">
        <ColorInput
          value={state.backgroundColor}
          onChange={(v) => onUpdate("backgroundColor", v)}
          label="Couleur de fond"
        />
      </Field>

      {state.mode === "lucide" && (
        <>
          <Field label="Icône">
            <IconPicker
              selectedIcon={state.iconName}
              iconColor={state.iconColor}
              onSelect={(name) => onUpdate("iconName", name)}
            />
          </Field>

          <Field label="Couleur de l'icône">
            <ColorInput
              value={state.iconColor}
              onChange={(v) => onUpdate("iconColor", v)}
              label="Couleur de l'icône"
            />
          </Field>
        </>
      )}

      {state.mode === "emoji" && (
        <Field label="Emoji">
          <input
            type="text"
            value={state.emoji}
            onChange={(e) => onUpdate("emoji", e.target.value)}
            aria-label="Emoji à afficher"
            placeholder="🚀"
            className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-3xl text-center focus:outline-none focus:border-indigo-500"
          />
        </Field>
      )}

      <Field label={`Taille — ${state.iconSize}px`}>
        <input
          type="range"
          min={40}
          max={340}
          value={state.iconSize}
          onChange={(e) => onUpdate("iconSize", Number(e.target.value))}
          aria-label="Taille de l'icône"
          className="w-full accent-indigo-500"
        />
      </Field>

      <Field label={`Arrondi — ${state.borderRadius}px`}>
        <input
          type="range"
          min={0}
          max={200}
          value={state.borderRadius}
          onChange={(e) => onUpdate("borderRadius", Number(e.target.value))}
          aria-label="Arrondi des coins"
          className="w-full accent-indigo-500"
        />
      </Field>
    </aside>
  );
}
