import { forwardRef } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { IconState } from "../../types";

type IconComponent = React.FC<LucideProps>;

const PREVIEW_SIZE = 400;

interface IconCanvasProps {
  state: IconState;
}

const IconCanvas = forwardRef<HTMLDivElement, IconCanvasProps>(
  ({ state }, ref) => {
    const {
      backgroundColor,
      mode,
      iconName,
      iconColor,
      iconSize,
      emoji,
      borderRadius,
    } = state;

    const Icon =
      mode === "lucide"
        ? ((LucideIcons as unknown as Record<string, IconComponent>)[
            iconName
          ] ?? null)
        : null;

    return (
      <div
        ref={ref}
        style={{
          width: PREVIEW_SIZE,
          height: PREVIEW_SIZE,
          backgroundColor,
          borderRadius: `${borderRadius}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {mode === "lucide" && Icon && (
          <Icon size={iconSize} color={iconColor} strokeWidth={2} />
        )}
        {mode === "emoji" && (
          <span style={{ fontSize: iconSize, lineHeight: 1 }}>{emoji}</span>
        )}
      </div>
    );
  },
);

IconCanvas.displayName = "IconCanvas";

export default IconCanvas;
