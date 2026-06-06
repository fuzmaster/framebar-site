export type BarPosition = "top" | "bottom" | "custom";
export type BarDirection = "left-to-right" | "right-to-left";
export type AnimationType = "linear" | "smooth";

export type HorizontalBarSettings = {
  position: BarPosition;
  widthPercent: number;
  thickness: number;
  marginX: number;
  marginY: number;
  radius: number;
  fillColor: string;
  trackColor: string;
  fillOpacity: number;
  trackOpacity: number;
  glowEnabled: boolean;
  glowColor: string;
  shadowEnabled: boolean;
  gradientEnabled: boolean;
  gradientFrom: string;
  gradientTo: string;
  direction: BarDirection;
  animation: AnimationType;
};

export type Preset = {
  id: string;
  name: string;
  description: string;
  bar: HorizontalBarSettings;
};

export type SafeZoneId =
  | "none"
  | "tiktok-reels"
  | "youtube-shorts"
  | "caption-safe-bottom"
  | "podcast-lower-third"
  | "top-title-safe";

export type ExportFormatId =
  | "png-sequence"
  | "webm-alpha"
  | "remotion-component"
  | "settings-json";

export type ExportFormatStatus = "recommended" | "prototype" | "available-soon";

export type ExportFormat = {
  id: ExportFormatId;
  name: string;
  bestFor: string[];
  transparency: "full" | "partial" | "none";
  status: ExportFormatStatus;
  description: string;
};
