import type { HorizontalBarSettings } from "@/types/editor";
import { getProgressForFrame, smoothProgress } from "@/lib/timing";
import { HorizontalProgressBar } from "./HorizontalProgressBar";

type Props = {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  currentFrame: number;
  barSettings: HorizontalBarSettings;
};

export function ProgressOverlay({
  width,
  height,
  fps: _fps,
  durationInFrames,
  currentFrame,
  barSettings,
}: Props) {
  const linear = getProgressForFrame(currentFrame, durationInFrames);
  const progress = barSettings.animation === "smooth" ? smoothProgress(linear) : linear;

  return (
    <HorizontalProgressBar
      settings={barSettings}
      progress={progress}
      width={width}
      height={height}
    />
  );
}
