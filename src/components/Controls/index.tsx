import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import type { IconState, IconMode } from "@/types";
import IconPicker from "./components/IconPicker";
import ColorInput from "./components/ColorInput";

interface ControlsProps {
  state: IconState;
  onUpdate: <K extends keyof IconState>(key: K, value: IconState[K]) => void;
}

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

function Section({ label, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export default function Controls({ state, onUpdate }: ControlsProps) {
  return (
    <aside className="w-72 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto">
      {/* En-tête */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <p className="text-sm font-semibold text-foreground tracking-tight">
          Paramètres
        </p>
      </div>

      {/* Type d'icône */}
      <Section label="Type d'icône">
        <div className="flex gap-1 p-1 bg-secondary rounded-lg">
          {(["lucide", "emoji"] as IconMode[]).map((m) => (
            <Button
              key={m}
              variant={state.mode === m ? "default" : "ghost"}
              size="sm"
              onClick={() => onUpdate("mode", m)}
              className="flex-1 h-8 text-xs"
              aria-pressed={state.mode === m}
            >
              {m === "lucide" ? "⚡ Lucide" : "😀 Emoji"}
            </Button>
          ))}
        </div>
      </Section>

      <Separator />

      {/* Couleur de fond */}
      <Section label="Couleur de fond">
        <ColorInput
          value={state.backgroundColor}
          onChange={(v) => onUpdate("backgroundColor", v)}
          label="Couleur de fond"
        />
      </Section>

      <Separator />

      {/* Mode Lucide */}
      {state.mode === "lucide" && (
        <>
          <Section label="Icône">
            <IconPicker
              selectedIcon={state.iconName}
              iconColor={state.iconColor}
              onSelect={(name) => onUpdate("iconName", name)}
            />
          </Section>

          <Separator />

          <Section label="Couleur de l'icône">
            <ColorInput
              value={state.iconColor}
              onChange={(v) => onUpdate("iconColor", v)}
              label="Couleur de l'icône"
            />
          </Section>

          <Separator />
        </>
      )}

      {/* Mode Emoji */}
      {state.mode === "emoji" && (
        <>
          <Section label="Emoji">
            <Input
              type="text"
              value={state.emoji}
              onChange={(e) => onUpdate("emoji", e.target.value)}
              aria-label="Emoji à afficher"
              placeholder="🚀"
              className="text-2xl text-center h-12"
            />
          </Section>

          <Separator />
        </>
      )}

      {/* Taille */}
      <Section label={`Taille — ${state.iconSize} px`}>
        <Slider
          min={40}
          max={340}
          step={1}
          value={[state.iconSize]}
          onValueChange={(values) =>
            onUpdate("iconSize", values[0] ?? state.iconSize)
          }
          aria-label="Taille de l'icône"
        />
      </Section>

      <Separator />

      {/* Arrondi */}
      <Section label={`Arrondi — ${state.borderRadius} px`}>
        <Slider
          min={0}
          max={200}
          step={1}
          value={[state.borderRadius]}
          onValueChange={(values) =>
            onUpdate("borderRadius", values[0] ?? state.borderRadius)
          }
          aria-label="Arrondi des coins"
        />
      </Section>
    </aside>
  );
}
