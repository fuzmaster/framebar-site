"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEditorStore, selectTotalFrames } from "@/store/editorStore";
import {
  formatFrameCount,
  formatSeconds,
  getProgressForFrame,
} from "@/lib/timing";

export function TimelineScrubber() {
  const fps = useEditorStore((s) => s.fps);
  const durationSeconds = useEditorStore((s) => s.durationSeconds);
  const currentFrame = useEditorStore((s) => s.currentFrame);
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const setCurrentFrame = useEditorStore((s) => s.setCurrentFrame);
  const setIsPlaying = useEditorStore((s) => s.setIsPlaying);
  const restart = useEditorStore((s) => s.restart);

  const totalFrames = selectTotalFrames({ durationSeconds, fps });
  const lastFrame = Math.max(0, totalFrames - 1);
  const currentSeconds = fps > 0 ? currentFrame / fps : 0;
  const progress = getProgressForFrame(currentFrame, totalFrames);

  const jumpTo = (pct: number) => {
    setCurrentFrame(Math.round(lastFrame * pct));
  };

  const canPlay = totalFrames > 1;

  return (
    <div className="panel mt-3 p-3 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (!canPlay) return;
            if (currentFrame >= lastFrame) setCurrentFrame(0);
            setIsPlaying(!isPlaying);
          }}
          className="btn-icon"
          disabled={!canPlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={restart} className="btn-icon" aria-label="Restart">
          <RotateCcw size={16} />
        </button>

        <input
          type="range"
          min={0}
          max={lastFrame}
          step={1}
          value={currentFrame}
          onChange={(e) => setCurrentFrame(Number(e.target.value))}
          className="flex-1 accent-accent"
        />

        <div className="font-mono text-xs text-text-dim w-44 text-right">
          {formatSeconds(currentSeconds)} / {formatSeconds(durationSeconds)}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-dim font-mono">
        <div>
          Frame{" "}
          <span className="text-text">
            {formatFrameCount(currentFrame)}
          </span>{" "}
          / {formatFrameCount(lastFrame)}{" "}
          <span className="ml-2 text-text-faint">
            ({formatFrameCount(totalFrames)} total)
          </span>
        </div>
        <div>
          <span className="text-text">{Math.round(progress * 1000) / 10}%</span> · {fps} fps
        </div>
        <div className="flex gap-2">
          {[0.25, 0.5, 0.75, 1].map((p) => (
            <button
              key={p}
              onClick={() => jumpTo(p)}
              className="px-2 py-0.5 rounded border border-bg-border hover:border-accent hover:text-accent"
            >
              {p * 100}%
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
