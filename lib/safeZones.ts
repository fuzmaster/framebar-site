import type { SafeZoneId } from "@/types/editor";

export type SafeZoneRect = {
  xPercent: number;
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
  label: string;
};

export type SafeZone = {
  id: SafeZoneId;
  name: string;
  description: string;
  rects: SafeZoneRect[];
};

export const SAFE_ZONES: SafeZone[] = [
  {
    id: "none",
    name: "None",
    description: "No safe-zone guides.",
    rects: [],
  },
  {
    id: "caption-safe-bottom",
    name: "Caption-safe bottom",
    description: "Avoid placing UI in the lower caption area.",
    rects: [
      { xPercent: 0, yPercent: 78, widthPercent: 100, heightPercent: 22, label: "Caption area" },
    ],
  },
  {
    id: "tiktok-reels",
    name: "TikTok / Reels",
    description: "Avoid platform UI on right and bottom.",
    rects: [
      { xPercent: 0, yPercent: 82, widthPercent: 100, heightPercent: 18, label: "Bottom UI" },
      { xPercent: 86, yPercent: 30, widthPercent: 14, heightPercent: 55, label: "Right UI" },
    ],
  },
  {
    id: "youtube-shorts",
    name: "YouTube Shorts",
    description: "Avoid Shorts UI overlays.",
    rects: [
      { xPercent: 0, yPercent: 80, widthPercent: 100, heightPercent: 20, label: "Bottom UI" },
      { xPercent: 86, yPercent: 35, widthPercent: 14, heightPercent: 50, label: "Right UI" },
    ],
  },
  {
    id: "podcast-lower-third",
    name: "Podcast lower-third",
    description: "Lower-third area reserved for name/title cards.",
    rects: [
      { xPercent: 5, yPercent: 70, widthPercent: 60, heightPercent: 22, label: "Lower third" },
    ],
  },
  {
    id: "top-title-safe",
    name: "Top title safe",
    description: "Reserve top region for titles.",
    rects: [
      { xPercent: 0, yPercent: 0, widthPercent: 100, heightPercent: 14, label: "Title area" },
    ],
  },
];

export function getSafeZoneById(id: SafeZoneId): SafeZone {
  return SAFE_ZONES.find((z) => z.id === id) ?? SAFE_ZONES[0];
}
