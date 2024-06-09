import { cn } from "@/lib/cn";
import { useStore } from "@/lib/store";
import React, { CSSProperties } from "react";

const ThemeBubble = ({
  style,
  colors,
  useCustomColorsFromStore,
}: {
  style?: CSSProperties;
  colors?: string[];
  useCustomColorsFromStore?: boolean;
}) => {
  const customColors = useStore((state) => state.customColors);
  const angle = useStore((state) => state.angle);
  return (
    <div
      className={cn("h-4 w-4 rounded-full")}
      style={
        style || {
          backgroundImage: `linear-gradient(${angle}deg, ${(useCustomColorsFromStore
            ? customColors
            : colors!
          ).join(", ")})`,
        }
      }
    ></div>
  );
};

export default ThemeBubble;
