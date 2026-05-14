import { useMemo, useState } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const EXCLUDED = new Set(["createLucideIcon", "LucideIcon"]);
const ALL_ICONS = Object.keys(LucideIcons)
  .filter((name) => /^[A-Z]/.test(name) && !EXCLUDED.has(name))
  .sort();

interface IconPickerProps {
  selectedIcon: string;
  iconColor: string;
  onSelect: (name: string) => void;
}

export default function IconPicker({
  selectedIcon,
  iconColor,
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
      <input
        type="text"
        placeholder="Rechercher une icône..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Rechercher une icône Lucide"
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      />
      <div className="icon-grid grid grid-cols-5 gap-1 max-h-60 overflow-y-auto pr-1">
        {filtered.map((name) => {
          const Icon = (LucideIcons as Record<string, IconComponent>)[name];
          const isSelected = name === selectedIcon;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              title={name}
              aria-label={`Sélectionner l'icône ${name}`}
              className={`flex items-center justify-center p-2 rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {Icon && (
                <Icon size={18} color={isSelected ? "#ffffff" : iconColor} />
              )}
            </button>
          );
        })}
      </div>
      {!search.trim() && (
        <p className="text-xs text-gray-600 text-center">
          Parmi {ALL_ICONS.length} icônes disponibles
        </p>
      )}
    </div>
  );
}
