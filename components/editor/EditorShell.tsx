"use client";

import Link from "next/link";
import { PresetPanel } from "./PresetPanel";
import { PreviewCanvas } from "./PreviewCanvas";
import { ControlsPanel } from "./ControlsPanel";
import { ExportPanel } from "./ExportPanel";
import { TimelineScrubber } from "./TimelineScrubber";

export function EditorShell() {
  return (
    <div className="flex flex-col h-screen bg-bg-base text-text">
      <header className="flex items-center justify-between px-4 py-2 border-b border-bg-border bg-bg-panel">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-accent grid place-items-center text-bg-base font-bold">
              F
            </div>
            <span className="font-semibold tracking-tight">FrameBar</span>
          </Link>
          <span className="text-xs text-text-faint">/ Editor</span>
        </div>
        <nav className="flex items-center gap-3 text-sm text-text-dim">
          <Link href="/help/formats" className="hover:text-text">
            Formats
          </Link>
          <Link href="/pricing" className="hover:text-text">
            Pricing
          </Link>
        </nav>
      </header>

      <div className="flex-1 flex min-h-0 p-3 gap-3">
        <PresetPanel />
        <main className="flex-1 flex flex-col min-w-0">
          <div className="panel flex-1 flex flex-col min-h-0">
            <PreviewCanvas />
          </div>
          <TimelineScrubber />
          <ExportPanel />
        </main>
        <ControlsPanel />
      </div>
    </div>
  );
}
