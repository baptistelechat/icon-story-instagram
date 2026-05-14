import { useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";

const EXPORT_SIZE = 1080;

interface ExportButtonProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportButton({ canvasRef }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: EXPORT_SIZE / canvasRef.current.offsetWidth,
        quality: 1,
      });
      const link = document.createElement("a");
      link.download = "icon-1080x1080.png";
      link.href = dataUrl;
      link.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      aria-label="Exporter l'icône en PNG"
      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors cursor-pointer"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Download size={18} />
      )}
      Exporter en PNG (1080×1080)
    </button>
  );
}
