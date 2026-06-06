import type { HorizontalBarSettings } from "@/types/editor";
import { computeBarLayout } from "@/lib/render/barLayout";

type Props = {
  settings: HorizontalBarSettings;
  progress: number;
  width: number;
  height: number;
};

export function HorizontalProgressBar({ settings, progress, width, height }: Props) {
  const layout = computeBarLayout(settings, progress, width, height);
  const { x, y, barWidth, fillWidth, fillX, thickness, radius, trackFill, fillFill, glow, shadow, gradient } = layout;

  const fillPaint = gradient.enabled ? "url(#fb-fill-gradient)" : fillFill;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block" }}
    >
      <defs>
        {gradient.enabled && (
          <linearGradient
            id="fb-fill-gradient"
            x1={gradient.x1}
            x2={gradient.x2}
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={gradient.from} stopOpacity={gradient.opacity} />
            <stop offset="100%" stopColor={gradient.to} stopOpacity={gradient.opacity} />
          </linearGradient>
        )}
        {glow.enabled && (
          <filter id="fb-glow" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glow.stdDeviation} />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <rect
        x={x}
        y={y}
        width={barWidth}
        height={thickness}
        rx={radius}
        ry={radius}
        fill={trackFill}
      />

      {fillWidth > 0 && (
        <g
          filter={glow.enabled ? "url(#fb-glow)" : undefined}
          style={
            shadow.enabled
              ? {
                  filter: `drop-shadow(0 ${shadow.dy}px ${shadow.blur}px rgba(0,0,0,0.45))`,
                }
              : undefined
          }
        >
          {glow.enabled && (
            <rect
              x={fillX}
              y={y}
              width={fillWidth}
              height={thickness}
              rx={radius}
              ry={radius}
              fill={glow.color}
              opacity={0.7}
            />
          )}
          <rect
            x={fillX}
            y={y}
            width={fillWidth}
            height={thickness}
            rx={radius}
            ry={radius}
            fill={fillPaint}
          />
        </g>
      )}
    </svg>
  );
}
