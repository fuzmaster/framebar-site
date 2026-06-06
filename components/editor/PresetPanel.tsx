"use client";

import { PRESETS } from "@/lib/presets";
import { useEditorStore } from "@/store/editorStore";
import { HorizontalProgressBar } from "@/components/renderer/HorizontalProgressBar";

export function PresetPanel() {
  const selectedPresetId = useEditorStore((s) => s.selectedPresetId);
  const applyPreset = useEditorStore((s) => s.applyPreset);

  return (
    <aside className="panel w-64 shrink-0 flex flex-col">
      <div className="px-4 py-3 border-b border-bg-border">
        <h2 className="text-sm font-semibold">Presets</h2>
        <p className="text-xs text-text-dim mt-0.5">Style packs for common video types.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {PRESETS.map((p) => {
          const active = selectedPresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => applyPreset(p.id)}
              className={[
                "w-full text-left rounded-md border p-3 transition-colors",
                active
                  ? "border-accent bg-bg-raised"
                  : "border-bg-border hover:border-accent/60 bg-bg-raised/40",
              ].join(" ")}
            >
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-text-dim mt-0.5 line-clamp-2">{p.description}</div>
              <div className="mt-2 h-8 rounded bg-black/40 overflow-hidden">
                <HorizontalProgressBar
                  settings={p.bar}
                  progress={0.6}
                  width={200}
                  height={32}
                />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
