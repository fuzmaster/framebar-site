"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useEditorStore, selectTotalFrames } from "@/store/editorStore";
import { ProgressOverlay } from "@/components/renderer/ProgressOverlay";
import { SafeZoneOverlay } from "./SafeZoneOverlay";
import { getProgressForFrame } from "@/lib/timing";

export function PreviewCanvas() {
  const width = useEditorStore((s) => s.width);
  const height = useEditorStore((s) => s.height);
  const fps = useEditorStore((s) => s.fps);
  const durationSeconds = useEditorStore((s) => s.durationSeconds);
  const currentFrame = useEditorStore((s) => s.currentFrame);
  const isPlaying = useEditorStore((s) => s.isPlaying);
  const showCheckerboard = useEditorStore((s) => s.showCheckerboard);
  const showDarkMock = useEditorStore((s) => s.showDarkMock);
  const showSafeZones = useEditorStore((s) => s.showSafeZones);
  const safeZoneId = useEditorStore((s) => s.safeZoneId);
  const barSettings = useEditorStore((s) => s.barSettings);

  const setCurrentFrame = useEditorStore((s) => s.setCurrentFrame);
  const setIsPlaying = useEditorStore((s) => s.setIsPlaying);

  const totalFrames = useMemo(
    () => selectTotalFrames({ durationSeconds, fps }),
    [durationSeconds, fps]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => {
    if (!containerSize.w || !containerSize.h || !width || !height) return 1;
    return Math.min(containerSize.w / width, containerSize.h / height);
  }, [containerSize, width, height]);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<{ time: number; frame: number } | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
      return;
    }
    if (totalFrames <= 1) return;
    startRef.current = { time: performance.now(), frame: currentFrame };
    const tick = (now: number) => {
      const start = startRef.current;
      if (!start) return;
      const elapsed = (now - start.time) / 1000;
      const next = start.frame + Math.floor(elapsed * fps);
      if (next >= totalFrames - 1) {
        setCurrentFrame(totalFrames - 1);
        setIsPlaying(false);
        return;
      }
      setCurrentFrame(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // intentional: only react to play state changes; frame is updated in-loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, fps, totalFrames]);

  const progressPct = Math.round(getProgressForFrame(currentFrame, totalFrames) * 100);

  return (
    <div
      ref={containerRef}
      className="relative flex-1 flex items-center justify-center overflow-hidden p-6"
      role="region"
      aria-label={`Preview canvas — frame ${currentFrame} of ${Math.max(0, totalFrames - 1)} at ${progressPct} percent`}
    >
      {width > 0 && height > 0 && scale > 0 && (
        <div
          className="relative shadow-2xl"
          style={{
            width: width * scale,
            height: height * scale,
          }}
        >
          {showDarkMock ? (
            <div className="absolute inset-0 bg-[#0a0a0a]" />
          ) : showCheckerboard ? (
            <div className="absolute inset-0 checkerboard" />
          ) : (
            <div className="absolute inset-0 bg-transparent" />
          )}

          <div
            className="absolute top-0 left-0 origin-top-left"
            style={{ transform: `scale(${scale})`, width, height }}
          >
            <ProgressOverlay
              width={width}
              height={height}
              fps={fps}
              durationInFrames={totalFrames}
              currentFrame={currentFrame}
              barSettings={barSettings}
            />
          </div>

          {showSafeZones && (
            <div
              className="absolute top-0 left-0 origin-top-left pointer-events-none"
              style={{ transform: `scale(${scale})`, width, height }}
            >
              <SafeZoneOverlay id={safeZoneId} width={width} height={height} />
            </div>
          )}

          <div className="absolute -top-7 left-0 text-xs text-text-dim font-mono">
            {width}×{height} · {Math.round(scale * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
