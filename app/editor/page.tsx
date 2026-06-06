import { EditorShell } from "@/components/editor/EditorShell";

export const metadata = {
  title: "Editor",
  description:
    "Customize a transparent progress bar overlay for your video. Enter duration, FPS, aspect ratio, pick a preset, and export.",
  alternates: { canonical: "/editor" },
};

export default function EditorPage() {
  return <EditorShell />;
}
