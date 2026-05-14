import { useState, useRef, useEffect } from "react";
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
  const [localValue, setLocalValue] = useState(value);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocalValue(v);
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => onChange(v));
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setLocalValue(v);
    onChange(v);
  };

  return (
    <div className="flex items-center gap-2.5">
      <input
        type="color"
        value={localValue}
        onChange={handleColorPicker}
        aria-label={label}
        className="size-9 shrink-0 rounded-md cursor-pointer border border-border bg-transparent p-0.5"
      />
      <Input
        type="text"
        value={localValue}
        onChange={handleTextInput}
        aria-label={`${label} — code hexadécimal`}
        className="font-mono text-xs"
        maxLength={7}
      />
    </div>
  );
}
