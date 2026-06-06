import JSZip from "jszip";
import type { HorizontalBarSettings } from "@/types/editor";
import { getProgressForFrame, smoothProgress } from "@/lib/timing";
import { buildBarSvg } from "./buildBarSvg";

export type PngSequenceOptions = {
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  bar: HorizontalBarSettings;
  preset?: string;
};

export type RenderProgress = {
  current: number;
  total: number;
  phase: "rendering" | "zipping" | "done";
};

export type RenderResult = {
  blob: Blob;
  fileName: string;
  totalBytes: number;
};

/**
 * Client-side PNG sequence renderer.
 *
 * Renders each frame by:
 *   1. Building an SVG string for the current progress
 *   2. Loading it as an Image via a blob URL
 *   3. Drawing it onto a transparent canvas at full resolution
 *   4. canvas.toBlob -> PNG, added to a JSZip archive
 *
 * Yields back to the event loop every few frames so the UI stays responsive.
 * Honors an AbortSignal so the user can cancel mid-render.
 */
export async function renderPngSequence(
  opts: PngSequenceOptions,
  onProgress: (p: RenderProgress) => void,
  signal?: AbortSignal
): Promise<RenderResult> {
  if (typeof document === "undefined") {
    throw new Error("PNG sequence render must run in the browser.");
  }

  const { width, height, fps, totalFrames, bar, preset } = opts;
  if (totalFrames < 1) throw new Error("totalFrames must be >= 1");
  if (width < 1 || height < 1) throw new Error("Invalid dimensions");

  const zip = new JSZip();
  const folderName = `framebar_${width}x${height}_${Math.round(fps)}fps`;
  const folder = zip.folder(folderName)!;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not acquire 2D canvas context.");

  let totalBytes = 0;

  for (let frame = 0; frame < totalFrames; frame++) {
    if (signal?.aborted) throw new DOMException("Render cancelled.", "AbortError");

    const linear = getProgressForFrame(frame, totalFrames);
    const progress = bar.animation === "smooth" ? smoothProgress(linear) : linear;
    const svg = buildBarSvg(bar, progress, width, height);

    const img = await svgToImage(svg);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await canvasToBlob(canvas);
    const ab = await blob.arrayBuffer();
    totalBytes += ab.byteLength;
    const name = `framebar_${String(frame).padStart(6, "0")}.png`;
    folder.file(name, ab);

    onProgress({ current: frame + 1, total: totalFrames, phase: "rendering" });

    // Yield to the event loop periodically so the UI stays responsive
    if (frame % 4 === 3) {
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }

  // Metadata sidecar
  const metadata = {
    app: "FrameBar",
    durationSeconds: totalFrames / fps,
    fps,
    totalFrames,
    width,
    height,
    format: "png_sequence",
    preset: preset ?? null,
    generatedAt: null as null | string, // intentionally null — set by caller if needed
  };
  folder.file("metadata.json", JSON.stringify(metadata, null, 2));

  onProgress({ current: totalFrames, total: totalFrames, phase: "zipping" });

  const zipBlob = await zip.generateAsync(
    { type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } },
    (meta) => {
      // jszip reports its own progress 0-100 during zipping
      onProgress({
        current: Math.round((meta.percent / 100) * totalFrames),
        total: totalFrames,
        phase: "zipping",
      });
    }
  );

  onProgress({ current: totalFrames, total: totalFrames, phase: "done" });

  return {
    blob: zipBlob,
    fileName: `${folderName}.zip`,
    totalBytes,
  };
}

function svgToImage(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err instanceof Error ? err : new Error("Failed to load SVG frame."));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("canvas.toBlob returned null."));
      },
      "image/png"
    );
  });
}

export function triggerDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
