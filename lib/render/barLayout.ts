import type { HorizontalBarSettings } from "@/types/editor";

export type BarLayout = {
  x: number;
  y: number;
  barWidth: number;
  fillWidth: number;
  fillX: number;
  thickness: number;
  radius: number;
  trackFill: string;
  fillFill: string;
  glow: { enabled: boolean; color: string; stdDeviation: number };
  shadow: { enabled: boolean; blur: number; dy: number };
  gradient: {
    enabled: boolean;
    from: string;
    to: string;
    x1: string;
    x2: string;
    opacity: number;
  };
};

export function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function computeBarLayout(
  settings: HorizontalBarSettings,
  progress: number,
  width: number,
  height: number
): BarLayout {
  const {
    position,
    widthPercent,
    thickness,
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

  const clamped = Math.min(1, Math.max(0, progress));
  const fillWidth = barWidth * clamped;
  const fillX = direction === "right-to-left" ? x + barWidth - fillWidth : x;

  return {
    x,
    y,
    barWidth,
    fillWidth,
    fillX,
    thickness,
    radius,
    trackFill: hexToRgba(trackColor, trackOpacity),
    fillFill: hexToRgba(fillColor, fillOpacity),
    glow: {
      enabled: glowEnabled,
      color: hexToRgba(glowColor, 0.6),
      stdDeviation: Math.max(2, thickness * 0.6),
    },
    shadow: {
      enabled: shadowEnabled,
      blur: Math.max(4, thickness * 0.8),
      dy: Math.max(2, thickness * 0.4),
    },
    gradient: {
      enabled: gradientEnabled,
      from: gradientFrom,
      to: gradientTo,
      x1: direction === "right-to-left" ? "100%" : "0%",
      x2: direction === "right-to-left" ? "0%" : "100%",
      opacity: fillOpacity,
    },
  };
}
