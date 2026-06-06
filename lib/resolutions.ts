export type AspectPreset = {
  id: string;
  label: string;
  ratio: number;
  defaultWidth: number;
  defaultHeight: number;
};

export const ASPECT_PRESETS: AspectPreset[] = [
  { id: "9:16", label: "9:16 vertical", ratio: 9 / 16, defaultWidth: 1080, defaultHeight: 1920 },
  { id: "16:9", label: "16:9 horizontal", ratio: 16 / 9, defaultWidth: 1920, defaultHeight: 1080 },
  { id: "1:1", label: "1:1 square", ratio: 1, defaultWidth: 1080, defaultHeight: 1080 },
  { id: "4:5", label: "4:5 social", ratio: 4 / 5, defaultWidth: 1080, defaultHeight: 1350 },
  { id: "21:9", label: "21:9 cinematic", ratio: 21 / 9, defaultWidth: 2560, defaultHeight: 1080 },
  { id: "custom", label: "Custom", ratio: 0, defaultWidth: 1920, defaultHeight: 1080 },
];

export type ResolutionPreset = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  { id: "1080x1920", label: "1080×1920", width: 1080, height: 1920 },
  { id: "1920x1080", label: "1920×1080", width: 1920, height: 1080 },
  { id: "1080x1080", label: "1080×1080", width: 1080, height: 1080 },
  { id: "1080x1350", label: "1080×1350", width: 1080, height: 1350 },
  { id: "1280x720", label: "1280×720", width: 1280, height: 720 },
  { id: "3840x2160", label: "3840×2160", width: 3840, height: 2160 },
];

export const FPS_PRESETS: { label: string; value: number; group?: "test" | "broadcast" }[] = [
  { label: "5 (test)", value: 5, group: "test" },
  { label: "10 (test)", value: 10, group: "test" },
  { label: "15 (test)", value: 15, group: "test" },
  { label: "23.976", value: 23.976 },
  { label: "24", value: 24 },
  { label: "25", value: 25 },
  { label: "29.97", value: 29.97 },
  { label: "30", value: 30 },
  { label: "50", value: 50 },
  { label: "59.94", value: 59.94 },
  { label: "60", value: 60 },
];

export const EDITING_SOFTWARE: string[] = [
  "Premiere Pro",
  "DaVinci Resolve",
  "Final Cut Pro",
  "CapCut",
  "After Effects",
  "Other",
];
