export function parseDurationToSeconds(input: string): number {
  if (!input) return 0;
  const trimmed = input.trim();
  if (!trimmed) return 0;

  if (!trimmed.includes(":")) {
    const n = Number(trimmed);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  const parts = trimmed.split(":").map((p) => Number(p));
  if (parts.some((p) => !Number.isFinite(p) || p < 0)) return 0;

  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }
  return 0;
}

export function secondsToFrames(seconds: number, fps: number): number {
  if (!Number.isFinite(seconds) || !Number.isFinite(fps)) return 0;
  if (seconds <= 0 || fps <= 0) return 0;
  return Math.round(seconds * fps);
}

export function getProgressForFrame(currentFrame: number, totalFrames: number): number {
  if (totalFrames <= 1) return 1;
  const progress = currentFrame / (totalFrames - 1);
  return Math.min(1, Math.max(0, progress));
}

export function formatSeconds(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const total = Math.floor(seconds);
  const ms = Math.floor((seconds - total) * 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const base =
    h > 0
      ? `${pad(h)}:${pad(m)}:${pad(s)}`
      : `${pad(m)}:${pad(s)}`;
  return ms > 0 ? `${base}.${String(ms).padStart(3, "0")}` : base;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function validateFps(fps: number): boolean {
  return Number.isFinite(fps) && fps >= 1 && fps <= 240;
}

export function formatFrameCount(totalFrames: number): string {
  if (!Number.isFinite(totalFrames) || totalFrames <= 0) return "0";
  return totalFrames.toLocaleString();
}

export function smoothProgress(linear: number): number {
  const t = Math.min(1, Math.max(0, linear));
  return t * t * (3 - 2 * t);
}
