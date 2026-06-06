import type { ExportFormat } from "@/types/editor";

export const EXPORT_FORMATS: ExportFormat[] = [
  {
    id: "png-sequence",
    name: "PNG Sequence",
    bestFor: ["Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve"],
    transparency: "full",
    status: "recommended",
    description:
      "Frame-by-frame transparent PNG files. Predictable, editor-friendly, and reliable for alpha.",
  },
  {
    id: "webm-alpha",
    name: "WebM Alpha",
    bestFor: ["Web", "Premiere Pro", "DaVinci Resolve"],
    transparency: "full",
    status: "prototype",
    description: "Small single-file transparent video. Compatibility varies by editor.",
  },
  {
    id: "remotion-component",
    name: "Remotion Component",
    bestFor: ["Developers", "Custom pipelines"],
    transparency: "full",
    status: "prototype",
    description:
      "Exports a typed React/Remotion composition you can drop into your own render pipeline.",
  },
  {
    id: "settings-json",
    name: "Settings JSON",
    bestFor: ["Sharing", "Debugging", "Preset saving"],
    transparency: "none",
    status: "recommended",
    description:
      "Plain JSON of your duration, FPS, resolution, and bar settings. Easy to share or re-import.",
  },
];

export function recommendedFormatsFor(software: string): string[] {
  switch (software) {
    case "Premiere Pro":
      return ["png-sequence", "webm-alpha"];
    case "After Effects":
      return ["png-sequence"];
    case "DaVinci Resolve":
      return ["png-sequence", "webm-alpha"];
    case "Final Cut Pro":
      return ["png-sequence"];
    case "CapCut":
      return ["png-sequence"];
    default:
      return ["png-sequence", "settings-json"];
  }
}
