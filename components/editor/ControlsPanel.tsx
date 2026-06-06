"use client";

import { useEditorStore } from "@/store/editorStore";
import {
  ASPECT_PRESETS,
  EDITING_SOFTWARE,
  FPS_PRESETS,
  RESOLUTION_PRESETS,
} from "@/lib/resolutions";
import { SAFE_ZONES } from "@/lib/safeZones";
import type { SafeZoneId } from "@/types/editor";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-bg-border last:border-b-0">
      <div className="px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim">{title}</h3>
        <div className="mt-3 space-y-3">{children}</div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-text-dim">{label}</span>
      {children}
    </label>
  );
}

function NumberSlider({
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-accent"
      />
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input-base w-20 py-1"
      />
      {suffix && <span className="text-xs text-text-dim">{suffix}</span>}
    </div>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (s: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-12 rounded bg-bg-raised border border-bg-border"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-base flex-1"
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (b: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-accent"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export function ControlsPanel() {
  const {
    durationInput,
    durationSeconds,
    fps,
    width,
    height,
    aspectRatio,
    editingSoftware,
    barSettings,
    showCheckerboard,
    showDarkMock,
    showSafeZones,
    safeZoneId,
    setDurationInput,
    setFps,
    setResolution,
    setAspectRatio,
    setEditingSoftware,
    updateBar,
    setShowCheckerboard,
    setShowDarkMock,
    setShowSafeZones,
    setSafeZoneId,
  } = useEditorStore();

  const trimmedDuration = durationInput.trim();
  const durationParseFailed = trimmedDuration !== "" && durationSeconds === 0;

  return (
    <aside className="panel w-80 shrink-0 flex flex-col overflow-y-auto">
      <div className="px-4 py-3 border-b border-bg-border">
        <h2 className="text-sm font-semibold">Controls</h2>
        <p className="text-xs text-text-dim mt-0.5">Video settings and bar style.</p>
      </div>

      <Section title="Video">
        <Row label="Duration (sec or mm:ss or hh:mm:ss)">
          <input
            type="text"
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
            className={[
              "input-base",
              durationParseFailed ? "border-amber-400/60 focus-visible:border-amber-400" : "",
            ].join(" ")}
            placeholder="00:47"
            aria-invalid={durationParseFailed}
            aria-describedby={durationParseFailed ? "duration-error" : undefined}
          />
          {durationParseFailed ? (
            <p id="duration-error" role="alert" className="text-xs text-amber-300 mt-1">
              Couldn&apos;t read that. Try a number of seconds, mm:ss, or hh:mm:ss.
            </p>
          ) : (
            <p className="text-xs text-text-faint mt-1">
              Examples: 47 · 47.5 · 1:12 · 00:01:12
            </p>
          )}
        </Row>

        <Row label="FPS">
          <div className="flex gap-2">
            <select
              value={String(fps)}
              onChange={(e) => setFps(Number(e.target.value))}
              className="input-base flex-1"
            >
              {FPS_PRESETS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
              {!FPS_PRESETS.some((p) => p.value === fps) && (
                <option value={fps}>{fps} (custom)</option>
              )}
            </select>
            <input
              type="number"
              value={fps}
              min={1}
              max={240}
              step={0.001}
              onChange={(e) => setFps(Number(e.target.value))}
              className="input-base w-24"
            />
          </div>
        </Row>

        <Row label="Aspect ratio">
          <select
            value={aspectRatio}
            onChange={(e) => {
              const id = e.target.value;
              setAspectRatio(id);
              const p = ASPECT_PRESETS.find((a) => a.id === id);
              if (p && id !== "custom") setResolution(p.defaultWidth, p.defaultHeight);
            }}
            className="input-base"
          >
            {ASPECT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </Row>

        <Row label="Resolution">
          <select
            value={`${width}x${height}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split("x").map(Number);
              setResolution(w, h);
            }}
            className="input-base"
          >
            {RESOLUTION_PRESETS.map((r) => (
              <option key={r.id} value={`${r.width}x${r.height}`}>
                {r.label}
              </option>
            ))}
            {!RESOLUTION_PRESETS.some((r) => r.width === width && r.height === height) && (
              <option value={`${width}x${height}`}>
                {width}×{height} (custom)
              </option>
            )}
          </select>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={width}
              onChange={(e) => setResolution(Number(e.target.value), height)}
              className="input-base"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setResolution(width, Number(e.target.value))}
              className="input-base"
            />
          </div>
        </Row>

        <Row label="Editing software">
          <select
            value={editingSoftware}
            onChange={(e) => setEditingSoftware(e.target.value)}
            className="input-base"
          >
            {EDITING_SOFTWARE.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Row>
      </Section>

      <Section title="Position">
        <Row label="Position">
          <select
            value={barSettings.position}
            onChange={(e) => updateBar({ position: e.target.value as "top" | "bottom" | "custom" })}
            className="input-base"
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="custom">Custom (Y offset)</option>
          </select>
        </Row>
        <Row label="Width %">
          <NumberSlider
            value={barSettings.widthPercent}
            min={10}
            max={100}
            step={1}
            onChange={(n) => updateBar({ widthPercent: n })}
            suffix="%"
          />
        </Row>
        <Row label="Thickness (px)">
          <NumberSlider
            value={barSettings.thickness}
            min={1}
            max={80}
            step={1}
            onChange={(n) => updateBar({ thickness: n })}
          />
        </Row>
        <Row label="Margin X (px)">
          <NumberSlider
            value={barSettings.marginX}
            min={0}
            max={Math.floor(width / 2)}
            step={1}
            onChange={(n) => updateBar({ marginX: n })}
          />
        </Row>
        <Row label="Margin Y (px)">
          <NumberSlider
            value={barSettings.marginY}
            min={0}
            max={Math.max(0, height - barSettings.thickness)}
            step={1}
            onChange={(n) => updateBar({ marginY: n })}
          />
        </Row>
        <Row label="Border radius">
          <NumberSlider
            value={barSettings.radius}
            min={0}
            max={40}
            step={1}
            onChange={(n) => updateBar({ radius: n })}
          />
        </Row>
        <Row label="Direction">
          <select
            value={barSettings.direction}
            onChange={(e) =>
              updateBar({ direction: e.target.value as "left-to-right" | "right-to-left" })
            }
            className="input-base"
          >
            <option value="left-to-right">Left to right</option>
            <option value="right-to-left">Right to left</option>
          </select>
        </Row>
      </Section>

      <Section title="Colors">
        <Row label="Fill color">
          <ColorPicker
            value={barSettings.fillColor}
            onChange={(s) => updateBar({ fillColor: s })}
          />
        </Row>
        <Row label="Fill opacity">
          <NumberSlider
            value={barSettings.fillOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(n) => updateBar({ fillOpacity: n })}
          />
        </Row>
        <Row label="Track color">
          <ColorPicker
            value={barSettings.trackColor}
            onChange={(s) => updateBar({ trackColor: s })}
          />
        </Row>
        <Row label="Track opacity">
          <NumberSlider
            value={barSettings.trackOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(n) => updateBar({ trackOpacity: n })}
          />
        </Row>

        <Toggle
          checked={barSettings.gradientEnabled}
          onChange={(b) => updateBar({ gradientEnabled: b })}
          label="Gradient fill"
        />
        {barSettings.gradientEnabled && (
          <>
            <Row label="Gradient from">
              <ColorPicker
                value={barSettings.gradientFrom}
                onChange={(s) => updateBar({ gradientFrom: s })}
              />
            </Row>
            <Row label="Gradient to">
              <ColorPicker
                value={barSettings.gradientTo}
                onChange={(s) => updateBar({ gradientTo: s })}
              />
            </Row>
          </>
        )}
      </Section>

      <Section title="Effects">
        <Toggle
          checked={barSettings.glowEnabled}
          onChange={(b) => updateBar({ glowEnabled: b })}
          label="Glow"
        />
        {barSettings.glowEnabled && (
          <Row label="Glow color">
            <ColorPicker
              value={barSettings.glowColor}
              onChange={(s) => updateBar({ glowColor: s })}
            />
          </Row>
        )}
        <Toggle
          checked={barSettings.shadowEnabled}
          onChange={(b) => updateBar({ shadowEnabled: b })}
          label="Shadow"
        />
        <Row label="Animation">
          <select
            value={barSettings.animation}
            onChange={(e) => updateBar({ animation: e.target.value as "linear" | "smooth" })}
            className="input-base"
          >
            <option value="linear">Linear</option>
            <option value="smooth">Smooth (ease-in-out)</option>
          </select>
        </Row>
      </Section>

      <Section title="Preview">
        <Toggle
          checked={showCheckerboard}
          onChange={(b) => {
            setShowCheckerboard(b);
            if (b) setShowDarkMock(false);
          }}
          label="Checkerboard background"
        />
        <Toggle
          checked={showDarkMock}
          onChange={(b) => {
            setShowDarkMock(b);
            if (b) setShowCheckerboard(false);
          }}
          label="Dark mock video background"
        />
        <Toggle
          checked={showSafeZones}
          onChange={(b) => setShowSafeZones(b)}
          label="Safe-zone overlay"
        />
        <Row label="Safe-zone preset">
          <select
            value={safeZoneId}
            onChange={(e) => setSafeZoneId(e.target.value as SafeZoneId)}
            className="input-base"
          >
            {SAFE_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name}
              </option>
            ))}
          </select>
        </Row>
      </Section>
    </aside>
  );
}
