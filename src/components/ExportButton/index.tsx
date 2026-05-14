import { useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleExport}
      disabled={loading}
      aria-label="Exporter l'icône en PNG"
      size="lg"
      className="gap-2.5 px-8"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      Exporter en PNG (1080×1080)
    </Button>
  );
}
