import { create } from "zustand";
import type { HorizontalBarSettings, SafeZoneId } from "@/types/editor";
import { DEFAULT_PRESET_ID, getPresetById } from "@/lib/presets";
import { parseDurationToSeconds, secondsToFrames } from "@/lib/timing";

type EditorState = {
  durationInput: string;
  durationSeconds: number;
  fps: number;
  width: number;
  height: number;
  aspectRatio: string;
  editingSoftware: string;
  currentFrame: number;
  isPlaying: boolean;
  showCheckerboard: boolean;
  showDarkMock: boolean;
  showSafeZones: boolean;
  safeZoneId: SafeZoneId;
  barSettings: HorizontalBarSettings;
  selectedPresetId: string;

  setDurationInput: (s: string) => void;
  setFps: (fps: number) => void;
  setResolution: (w: number, h: number) => void;
  setAspectRatio: (id: string) => void;
  setEditingSoftware: (s: string) => void;
  setCurrentFrame: (f: number) => void;
  setIsPlaying: (b: boolean) => void;
  setShowCheckerboard: (b: boolean) => void;
  setShowDarkMock: (b: boolean) => void;
  setShowSafeZones: (b: boolean) => void;
  setSafeZoneId: (id: SafeZoneId) => void;
  updateBar: (patch: Partial<HorizontalBarSettings>) => void;
  applyPreset: (id: string) => void;
  restart: () => void;
};

const defaultPreset = getPresetById(DEFAULT_PRESET_ID)!;
const initialDuration = "00:47";
const initialFps = 30;
const initialDurationSeconds = parseDurationToSeconds(initialDuration);

export const useEditorStore = create<EditorState>((set, get) => ({
  durationInput: initialDuration,
  durationSeconds: initialDurationSeconds,
  fps: initialFps,
  width: 1080,
  height: 1920,
  aspectRatio: "9:16",
  editingSoftware: "Premiere Pro",
  currentFrame: 0,
  isPlaying: false,
  showCheckerboard: true,
  showDarkMock: false,
  showSafeZones: false,
  safeZoneId: "none",
  barSettings: { ...defaultPreset.bar },
  selectedPresetId: DEFAULT_PRESET_ID,

  setDurationInput: (s) => {
    const seconds = parseDurationToSeconds(s);
    set({ durationInput: s, durationSeconds: seconds, currentFrame: 0 });
  },
  setFps: (fps) => set({ fps, currentFrame: 0 }),
  setResolution: (width, height) => set({ width, height }),
  setAspectRatio: (id) => set({ aspectRatio: id }),
  setEditingSoftware: (s) => set({ editingSoftware: s }),
  setCurrentFrame: (f) => {
    const { durationSeconds, fps } = get();
    const total = secondsToFrames(durationSeconds, fps);
    const last = Math.max(0, total - 1);
    set({ currentFrame: Math.min(last, Math.max(0, Math.round(f))) });
  },
  setIsPlaying: (b) => set({ isPlaying: b }),
  setShowCheckerboard: (b) => set({ showCheckerboard: b }),
  setShowDarkMock: (b) => set({ showDarkMock: b }),
  setShowSafeZones: (b) => set({ showSafeZones: b }),
  setSafeZoneId: (id) => set({ safeZoneId: id, showSafeZones: id !== "none" }),
  updateBar: (patch) =>
    set((s) => ({
      barSettings: { ...s.barSettings, ...patch },
      selectedPresetId: "",
    })),
  applyPreset: (id) => {
    const p = getPresetById(id);
    if (!p) return;
    set({ selectedPresetId: id, barSettings: { ...p.bar } });
  },
  restart: () => set({ currentFrame: 0, isPlaying: false }),
}));

export function selectTotalFrames(s: Pick<EditorState, "durationSeconds" | "fps">): number {
  return secondsToFrames(s.durationSeconds, s.fps);
}
