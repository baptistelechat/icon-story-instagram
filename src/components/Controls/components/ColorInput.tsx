import { Input } from "@/components/ui/input";

interface ColorInputProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
}

export default function ColorInput({
  value,
  onChange,
  label,
}: ColorInputProps) {
  return (
    <div className="flex items-center gap-2.5">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="size-9 shrink-0 rounded-md cursor-pointer border border-border bg-transparent p-0.5"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} — code hexadécimal`}
        className="font-mono text-xs"
        maxLength={7}
      />
    </div>
  );
}
