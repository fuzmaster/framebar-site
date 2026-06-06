import { getSafeZoneById } from "@/lib/safeZones";
import type { SafeZoneId } from "@/types/editor";

type Props = {
  id: SafeZoneId;
  width: number;
  height: number;
};

export function SafeZoneOverlay({ id, width, height }: Props) {
  const zone = getSafeZoneById(id);
  if (!zone.rects.length) return null;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ pointerEvents: "none", display: "block" }}
    >
      {zone.rects.map((r, i) => (
        <g key={i}>
          <rect
            x={(r.xPercent / 100) * width}
            y={(r.yPercent / 100) * height}
            width={(r.widthPercent / 100) * width}
            height={(r.heightPercent / 100) * height}
            fill="rgba(94, 234, 212, 0.10)"
            stroke="rgba(94, 234, 212, 0.6)"
            strokeDasharray="6 6"
            strokeWidth={2}
          />
          <text
            x={(r.xPercent / 100) * width + 12}
            y={(r.yPercent / 100) * height + 24}
            fill="rgba(94, 234, 212, 0.9)"
            fontSize={18}
            fontFamily="ui-monospace, monospace"
          >
            {r.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
