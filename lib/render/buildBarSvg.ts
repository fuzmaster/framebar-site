import type { HorizontalBarSettings } from "@/types/editor";
import { computeBarLayout } from "./barLayout";

/**
 * Build a standalone SVG document string for a single progress-bar frame.
 * Used by the PNG-sequence renderer. The output is rasterized via canvas.
 */
export function buildBarSvg(
  settings: HorizontalBarSettings,
  progress: number,
  width: number,
  height: number
): string {
  const l = computeBarLayout(settings, progress, width, height);
  const defs: string[] = [];

  if (l.gradient.enabled) {
    defs.push(
      `<linearGradient id="fb-fill-gradient" x1="${l.gradient.x1}" x2="${l.gradient.x2}" y1="0%" y2="0%">` +
        `<stop offset="0%" stop-color="${l.gradient.from}" stop-opacity="${l.gradient.opacity}"/>` +
        `<stop offset="100%" stop-color="${l.gradient.to}" stop-opacity="${l.gradient.opacity}"/>` +
        `</linearGradient>`
    );
  }
  if (l.glow.enabled) {
    defs.push(
      `<filter id="fb-glow" x="-50%" y="-200%" width="200%" height="500%">` +
        `<feGaussianBlur in="SourceGraphic" stdDeviation="${l.glow.stdDeviation}"/>` +
        `<feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>` +
        `</filter>`
    );
  }
  if (l.shadow.enabled) {
    defs.push(
      `<filter id="fb-shadow" x="-20%" y="-20%" width="140%" height="200%">` +
        `<feDropShadow dx="0" dy="${l.shadow.dy}" stdDeviation="${l.shadow.blur / 2}" flood-color="black" flood-opacity="0.45"/>` +
        `</filter>`
    );
  }

  const fillPaint = l.gradient.enabled ? "url(#fb-fill-gradient)" : l.fillFill;
  const trackRect =
    `<rect x="${l.x}" y="${l.y}" width="${l.barWidth}" height="${l.thickness}" ` +
    `rx="${l.radius}" ry="${l.radius}" fill="${l.trackFill}"/>`;

  let fillGroup = "";
  if (l.fillWidth > 0) {
    const filters: string[] = [];
    if (l.glow.enabled) filters.push("url(#fb-glow)");
    if (l.shadow.enabled) filters.push("url(#fb-shadow)");
    const filterAttr = filters.length ? ` filter="${filters.join(" ")}"` : "";

    const glowRect = l.glow.enabled
      ? `<rect x="${l.fillX}" y="${l.y}" width="${l.fillWidth}" height="${l.thickness}" ` +
        `rx="${l.radius}" ry="${l.radius}" fill="${l.glow.color}" opacity="0.7"/>`
      : "";

    const mainRect =
      `<rect x="${l.fillX}" y="${l.y}" width="${l.fillWidth}" height="${l.thickness}" ` +
      `rx="${l.radius}" ry="${l.radius}" fill="${fillPaint}"/>`;

    fillGroup = `<g${filterAttr}>${glowRect}${mainRect}</g>`;
  }

  const defsBlock = defs.length ? `<defs>${defs.join("")}</defs>` : "";

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" ` +
    `viewBox="0 0 ${width} ${height}">` +
    defsBlock +
    trackRect +
    fillGroup +
    `</svg>`
  );
}
