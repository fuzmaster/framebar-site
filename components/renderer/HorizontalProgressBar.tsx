import type { HorizontalBarSettings } from "@/types/editor";

type Props = {
  settings: HorizontalBarSettings;
  progress: number;
  width: number;
  height: number;
};

function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function HorizontalProgressBar({ settings, progress, width, height }: Props) {
  const {
    position,
    widthPercent,
    thickness,
    marginX,
    marginY,
    radius,
    fillColor,
    trackColor,
    fillOpacity,
    trackOpacity,
    glowEnabled,
    glowColor,
    shadowEnabled,
    gradientEnabled,
    gradientFrom,
    gradientTo,
    direction,
  } = settings;

  const barWidth = Math.max(0, (width * widthPercent) / 100);
  const x = (width - barWidth) / 2;

  let y: number;
  if (position === "top") y = marginY;
  else if (position === "bottom") y = height - marginY - thickness;
  else y = Math.max(0, Math.min(height - thickness, marginY));

  const fillWidth = barWidth * Math.min(1, Math.max(0, progress));
  const fillX = direction === "right-to-left" ? x + barWidth - fillWidth : x;

  const fillPaint = gradientEnabled ? "url(#fb-fill-gradient)" : hexToRgba(fillColor, fillOpacity);
  const trackPaint = hexToRgba(trackColor, trackOpacity);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block" }}
    >
      <defs>
        {gradientEnabled && (
          <linearGradient
            id="fb-fill-gradient"
            x1={direction === "right-to-left" ? "100%" : "0%"}
            x2={direction === "right-to-left" ? "0%" : "100%"}
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={gradientFrom} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={gradientTo} stopOpacity={fillOpacity} />
          </linearGradient>
        )}
        {glowEnabled && (
          <filter id="fb-glow" x="-50%" y="-200%" width="200%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={Math.max(2, thickness * 0.6)} />
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
        fill={trackPaint}
      />

      {fillWidth > 0 && (
        <g
          filter={glowEnabled ? "url(#fb-glow)" : undefined}
          style={
            shadowEnabled
              ? {
                  filter: `drop-shadow(0 ${Math.max(2, thickness * 0.4)}px ${Math.max(
                    4,
                    thickness * 0.8
                  )}px rgba(0,0,0,0.45))`,
                }
              : undefined
          }
        >
          {glowEnabled && (
            <rect
              x={fillX}
              y={y}
              width={fillWidth}
              height={thickness}
              rx={radius}
              ry={radius}
              fill={hexToRgba(glowColor, 0.6)}
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
