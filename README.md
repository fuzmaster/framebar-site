# FrameBar

> Frame-accurate transparent progress bar overlays for video editors. **No upload required.**

FrameBar is a browser-based tool that generates transparent progress overlays for Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut, and After Effects.

Enter your video specs — duration, FPS, aspect ratio, resolution — pick a style, customize the bar, and export a transparent overlay that drops straight into your timeline.

**Live site:** _coming soon_

---

## Why

Editors waste real time hand-animating progress bars in After Effects, matching exact timing, exporting alpha, and testing compatibility for each editor and aspect ratio.

FrameBar solves that in under a minute, without ever uploading footage.

### The wedge

- **No upload.** Enter specs instead. Your footage never touches a server.
- **Frame accurate.** First frame = 0%, last frame = exactly 100%. Decimal FPS supported (23.976, 29.97, 59.94).
- **Editor ready.** Transparent exports designed for the editor you actually use.

---

## Features (MVP)

### Video setup
- Duration parsing: `47`, `47.5`, `00:47`, `1:12`, `01:12`, `00:01:12`
- FPS: 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, custom
- Aspect ratios: 9:16, 16:9, 1:1, 4:5, 21:9, custom
- Resolutions: 1080×1920, 1920×1080, 1080×1080, 1080×1350, 1280×720, 3840×2160, custom
- Editor selector: Premiere Pro, DaVinci Resolve, Final Cut Pro, CapCut, After Effects, Other

### Style presets
Minimal Creator · YouTube Shorts · TikTok Clean · Podcast Clip · Gaming Neon · Course Video · Corporate Clean · Documentary Timeline

### Bar controls
- Position (top / bottom / custom)
- Width %, thickness, margin X/Y, border radius
- Fill / track color and opacity
- Direction (LTR / RTL)
- Glow, shadow, gradient
- Animation (linear / smooth ease-in-out)

### Preview
- Aspect-correct scaled canvas
- Checkerboard transparency toggle
- Dark mock-video background toggle
- Safe-zone overlays (TikTok/Reels, YouTube Shorts, caption-safe bottom, podcast lower-third, top title safe)
- Play / pause / restart
- Scrubber with frame, time, and progress % readout
- 25/50/75/100% jump buttons

### Export
- **Settings JSON** — fully working (downloads locally)
- **PNG Sequence** — UI wired, render pipeline TODO
- **WebM Alpha** — UI wired, render pipeline TODO
- **Remotion Component** — UI wired, export TODO

---

## Tech stack

- [Next.js 14](https://nextjs.org) (App Router)
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) (strict)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) for editor state
- [Lucide React](https://lucide.dev) for icons

No database. No auth. No backend. Pure static site + client-only state.

---

## Run locally

```bash
git clone https://github.com/fuzmaster/framebar-site.git
cd framebar-site
npm install
npm run dev
```

Open `http://localhost:3000`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint |
| `npm run typecheck` | TypeScript check (no emit) |

---

## Project structure

```
app/
  page.tsx              landing page
  editor/page.tsx       editor route
  pricing/page.tsx      pricing
  help/formats/page.tsx export formats guide
  robots.ts             generated robots.txt
  sitemap.ts            generated sitemap.xml
  layout.tsx            root layout + SEO metadata
  globals.css

components/
  editor/               EditorShell, PresetPanel, PreviewCanvas,
                        ControlsPanel, ExportPanel, TimelineScrubber,
                        SafeZoneOverlay
  renderer/             ProgressOverlay, HorizontalProgressBar (SVG)
  site/                 BackLinkFooter

lib/
  timing.ts             parseDurationToSeconds, secondsToFrames,
                        getProgressForFrame, formatSeconds, validateFps
  presets.ts            8 style presets
  resolutions.ts        FPS / aspect / resolution / software lists
  safeZones.ts          6 safe-zone definitions
  exportFormats.ts      4 export formats + per-editor recommendations
  site.ts               site constants (name, URL, keywords)

store/
  editorStore.ts        Zustand editor state

types/
  editor.ts             shared types
```

---

## Roadmap

- [ ] Client-side PNG sequence export (canvas + JSZip)
- [ ] WebM alpha export (VP9 alpha via WebCodecs / ffmpeg.wasm)
- [ ] Remotion composition wrapper + downloadable component file
- [ ] Circular and segmented bar shapes
- [ ] Chapter / milestone markers
- [ ] Saved custom presets (local storage)
- [ ] MOV ProRes 4444 alpha export (server-side, Pro tier)
- [ ] MOGRT export for Premiere Pro
- [ ] DaVinci Fusion macro export
- [ ] Final Cut title/template export
- [ ] Brand kits
- [ ] Batch render
- [ ] SEO landing pages per editor (`/premiere-pro`, `/davinci-resolve`, etc.)

---

## Privacy

FrameBar does not collect, store, or transmit your video, settings, or any personal data. All rendering happens in your browser. There is no backend.

---

## Built by

**[Jacob Britten](https://jacobbritten.com)** — Media Systems Architect

- [Portfolio](https://jacobbritten.com)
- [Projects](https://jacobbritten.com/projects.html)
- [The Lab](https://jacobbritten.com/lab.html)
- [Ko-fi](https://ko-fi.com/jacobbritten)
- [PayPal](https://www.paypal.com/donate/?hosted_button_id=47A4JJ4WNBY9U)

---

## License

MIT — see [LICENSE](LICENSE).
