import { useMemo, useState } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type IconComponent = React.FC<LucideProps>;

const EXCLUDED = new Set(["createLucideIcon", "LucideIcon"]);
const ALL_ICONS = Object.keys(LucideIcons)
  .filter((name) => /^[A-Z]/.test(name) && !EXCLUDED.has(name))
  .sort();

interface IconPickerProps {
  selectedIcon: string;
  onSelect: (name: string) => void;
}

export default function IconPicker({
  selectedIcon,
  onSelect,
}: IconPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_ICONS.slice(0, 80);
    return ALL_ICONS.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase()),
    ).slice(0, 80);
  }, [search]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Rechercher une icône Lucide"
      />
      <div className="grid grid-cols-5 gap-1 max-h-56 overflow-y-auto pr-0.5">
        {filtered.map((name) => {
          const Icon = (
            LucideIcons as unknown as Record<string, IconComponent>
          )[name];
          const isSelected = name === selectedIcon;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              title={name}
              aria-label={`Sélectionner l'icône ${name}`}
              className={cn(
                "flex items-center justify-center p-2 rounded-md transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {Icon && <Icon size={16} color="currentColor" aria-hidden />}
            </button>
          );
        })}
      </div>
      {!search.trim() && (
        <p className="text-[10px] text-muted-foreground/60 text-center">
          {ALL_ICONS.length} icônes disponibles
        </p>
      )}
    </div>
  );
}
