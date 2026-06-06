"use client";

import { useMemo, useRef, useState } from "react";
import {
  Component,
  Download,
  FileJson,
  FileVideo,
  Image as ImageIcon,
  Loader2,
  X,
} from "lucide-react";
import { useEditorStore, selectTotalFrames } from "@/store/editorStore";
import { EXPORT_FORMATS, recommendedFormatsFor } from "@/lib/exportFormats";
import { formatFrameCount } from "@/lib/timing";
import type { ExportFormatId } from "@/types/editor";
import {
  renderPngSequence,
  triggerDownload,
  type RenderProgress,
} from "@/lib/render/pngSequence";

const ICONS: Record<ExportFormatId, JSX.Element> = {
  "png-sequence": <ImageIcon size={16} />,
  "webm-alpha": <FileVideo size={16} />,
  "remotion-component": <Component size={16} />,
  "settings-json": <FileJson size={16} />,
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

function estimatePngBytes(width: number, height: number, frames: number): number {
  // Rough heuristic: progress bar over transparent background compresses well.
  // Assume ~0.04 bytes per pixel as a sparse-PNG baseline.
  return Math.round(width * height * 0.04 * frames);
}

const FRAME_WARNING_THRESHOLD = 900; // ~30s @ 30fps

export function ExportPanel() {
  const {
    width,
    height,
    fps,
    durationSeconds,
    editingSoftware,
    barSettings,
    aspectRatio,
    selectedPresetId,
  } = useEditorStore();
  const totalFrames = selectTotalFrames({ durationSeconds, fps });
  const recommended = useMemo(
    () => new Set(recommendedFormatsFor(editingSoftware)),
    [editingSoftware]
  );

  const [selected, setSelected] = useState<ExportFormatId>("png-sequence");
  const [lastAction, setLastAction] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<RenderProgress | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const downloadSettingsJson = () => {
    const payload = {
      app: "FrameBar",
      durationSeconds,
      fps,
      totalFrames,
      width,
      height,
      aspectRatio,
      editingSoftware,
      preset: selectedPresetId || null,
      bar: barSettings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    triggerDownload(blob, "framebar-settings.json");
    setLastAction("Settings JSON downloaded.");
  };

  const exportPngSequence = async () => {
    if (totalFrames < 1) {
      setLastAction("Set a duration first.");
      return;
    }
    if (totalFrames > FRAME_WARNING_THRESHOLD) {
      const ok = window.confirm(
        `This will render ${formatFrameCount(totalFrames)} frames at ${width}×${height}.\n\n` +
          `Long renders use significant memory and can take a few minutes. Continue?`
      );
      if (!ok) return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(true);
    setLastAction("");
    setProgress({ current: 0, total: totalFrames, phase: "rendering" });

    try {
      const result = await renderPngSequence(
        {
          width,
          height,
          fps,
          totalFrames,
          bar: barSettings,
          preset: selectedPresetId || undefined,
        },
        (p) => setProgress(p),
        controller.signal
      );
      triggerDownload(result.blob, result.fileName);
      setLastAction(
        `Exported ${result.fileName} — ${formatFrameCount(totalFrames)} frames, ${formatBytes(
          result.blob.size
        )} zip.`
      );
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setLastAction("Render cancelled.");
      } else {
        const msg = err instanceof Error ? err.message : "Unknown render error.";
        setLastAction(`Export failed: ${msg}`);
      }
    } finally {
      setBusy(false);
      setProgress(null);
      abortRef.current = null;
    }
  };

  const handleExport = () => {
    if (busy) return;
    switch (selected) {
      case "settings-json":
        return downloadSettingsJson();
      case "png-sequence":
        return exportPngSequence();
      default:
        // WebM/Remotion are not selectable in the UI; nothing to do.
        return;
    }
  };

  const cancel = () => abortRef.current?.abort();

  const pngEstBytes = estimatePngBytes(width, height, totalFrames);
  const pct =
    progress && progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
  const phaseLabel =
    progress?.phase === "zipping"
      ? "Compressing zip"
      : progress?.phase === "done"
      ? "Done"
      : "Rendering frames";

  return (
    <div className="panel mt-3 p-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold">Export</h2>
          <p className="text-xs text-text-dim mt-0.5">
            {width}×{height} · {fps} fps · {formatFrameCount(totalFrames)} frames · for{" "}
            {editingSoftware}
          </p>
        </div>
        {busy ? (
          <button onClick={cancel} className="btn-ghost" aria-label="Cancel render">
            <X size={16} /> Cancel
          </button>
        ) : (
          <button onClick={handleExport} className="btn-primary" disabled={totalFrames < 1}>
            <Download size={16} />
            Export Overlay
          </button>
        )}
      </div>

      {busy && progress && (
        <div className="mt-3" role="status" aria-live="polite">
          <div className="flex items-center justify-between text-xs text-text-dim mb-1">
            <span className="flex items-center gap-2">
              <Loader2 size={12} className="animate-spin" />
              {phaseLabel}
            </span>
            <span className="font-mono">
              {formatFrameCount(progress.current)} / {formatFrameCount(progress.total)} ({pct}%)
            </span>
          </div>
          <div className="h-2 rounded bg-bg-raised overflow-hidden">
            <div
              className="h-full bg-accent transition-[width] duration-100"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {EXPORT_FORMATS.map((f) => {
          const isSelected = selected === f.id;
          const isRecommended = recommended.has(f.id);
          const isComingSoon = f.status === "prototype" || f.status === "available-soon";
          const disabled = busy || isComingSoon;
          return (
            <button
              key={f.id}
              onClick={() => !isComingSoon && setSelected(f.id)}
              disabled={disabled}
              aria-disabled={disabled}
              aria-pressed={isSelected}
              title={isComingSoon ? `${f.name} — coming soon` : `Select ${f.name}`}
              className={[
                "text-left rounded-md border p-3 transition-colors",
                isSelected
                  ? "border-accent bg-bg-raised"
                  : isComingSoon
                  ? "border-bg-border bg-bg-raised/20 opacity-60 cursor-not-allowed"
                  : "border-bg-border hover:border-accent/60 bg-bg-raised/40",
                busy && !isComingSoon ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {ICONS[f.id]}
                  {f.name}
                </div>
                <span
                  className={[
                    "text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded",
                    isComingSoon
                      ? "bg-bg-border text-text-dim"
                      : "bg-accent/20 text-accent",
                  ].join(" ")}
                >
                  {isComingSoon ? "Coming soon" : "Available"}
                </span>
              </div>
              <p className="text-xs text-text-dim mt-1 line-clamp-2">{f.description}</p>
              <div className="text-[11px] text-text-faint mt-2">
                Best for: {f.bestFor.join(", ")}
              </div>
              {isRecommended && !isComingSoon && (
                <div className="text-[11px] text-accent mt-1">Recommended for {editingSoftware}</div>
              )}
              {f.id === "png-sequence" && (
                <div className="text-[11px] text-text-faint mt-1 font-mono">
                  ~{formatBytes(pngEstBytes)} zip
                </div>
              )}
            </button>
          );
        })}
      </div>

      {lastAction && !busy && (
        <div className="mt-3 text-xs text-text-dim border-t border-bg-border pt-2">
          {lastAction}
        </div>
      )}
    </div>
  );
}
