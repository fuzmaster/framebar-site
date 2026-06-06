import Link from "next/link";
import { ArrowRight, Layers, Sparkles, Wand2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text">
      <header className="flex items-center justify-between px-6 py-4 border-b border-bg-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-accent grid place-items-center text-bg-base font-bold">
            F
          </div>
          <span className="font-semibold tracking-tight">FrameBar</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-text-dim">
          <Link href="/help/formats" className="hover:text-text">
            Export formats
          </Link>
          <Link href="/pricing" className="hover:text-text">
            Pricing
          </Link>
          <Link href="/editor" className="btn-primary">
            Open Editor
          </Link>
        </nav>
      </header>

      <main>
        <section className="px-6 pt-20 pb-24 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-bg-border text-xs text-text-dim">
            <Sparkles size={12} className="text-accent" />
            No upload. Frame-accurate. Editor-ready.
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
            Frame-accurate progress overlays
            <br />
            <span className="text-accent">for video editors.</span>
          </h1>
          <p className="mt-6 text-lg text-text-dim max-w-2xl mx-auto">
            Enter your duration, FPS, and aspect ratio. Customize the style. Export a transparent
            progress bar overlay for Premiere Pro, DaVinci Resolve, Final Cut, CapCut, or After
            Effects.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/editor" className="btn-primary text-base px-5 py-3">
              Generate Overlay
              <ArrowRight size={16} />
            </Link>
            <Link href="/help/formats" className="btn-ghost text-base px-5 py-3">
              View Export Formats
            </Link>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <Wand2 size={18} className="text-accent" />,
                title: "No upload required",
                body: "Enter video specs instead of uploading. Your footage never touches our servers.",
              },
              {
                icon: <Layers size={18} className="text-accent" />,
                title: "Transparent exports",
                body: "PNG sequence and WebM alpha. Drop into Premiere, Resolve, Final Cut, or AE.",
              },
              {
                icon: <Sparkles size={18} className="text-accent" />,
                title: "Frame-accurate",
                body: "First frame at 0%, last frame at exactly 100%. Decimal FPS supported.",
              },
            ].map((c) => (
              <div key={c.title} className="panel p-5">
                <div className="flex items-center gap-2">
                  {c.icon}
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <p className="text-sm text-text-dim mt-2">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <ol className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              ["1", "Enter your video specs", "Duration, FPS, aspect ratio, resolution."],
              ["2", "Pick a preset", "TikTok, Shorts, podcast, corporate, gaming."],
              ["3", "Customize the bar", "Colors, opacity, glow, gradient, position."],
              ["4", "Export transparent", "PNG sequence or WebM alpha — drop into your editor."],
            ].map(([n, t, body]) => (
              <li key={n} className="panel p-5">
                <div className="text-xs text-accent font-mono">STEP {n}</div>
                <div className="mt-2 font-semibold">{t}</div>
                <div className="text-sm text-text-dim mt-1">{body}</div>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-6 pb-24 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight">Built for working editors</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            <div className="panel p-5">
              <h3 className="font-semibold">Use cases</h3>
              <ul className="mt-3 space-y-1 text-text-dim">
                <li>· Short-form Reels, Shorts, and TikTok</li>
                <li>· Podcast clips with face cam</li>
                <li>· Long-form YouTube and tutorials</li>
                <li>· Course videos and explainers</li>
                <li>· Agency reels, ads, and recaps</li>
              </ul>
            </div>
            <div className="panel p-5">
              <h3 className="font-semibold">Editor-specific export guidance</h3>
              <ul className="mt-3 space-y-1 text-text-dim">
                <li>· Premiere Pro: PNG sequence or WebM alpha</li>
                <li>· DaVinci Resolve: PNG sequence or WebM alpha</li>
                <li>· Final Cut Pro: PNG sequence</li>
                <li>· After Effects: PNG sequence</li>
                <li>· CapCut: PNG sequence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Stop hand-animating progress bars.
          </h2>
          <p className="mt-3 text-text-dim">
            Generate frame-accurate transparent overlays in under a minute.
          </p>
          <div className="mt-6">
            <Link href="/editor" className="btn-primary text-base px-5 py-3">
              Generate Overlay
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-bg-border px-6 py-6 text-sm text-text-dim flex items-center justify-between">
        <div>FrameBar · Frame-accurate progress overlays</div>
        <div className="flex gap-4">
          <Link href="/pricing">Pricing</Link>
          <Link href="/help/formats">Formats</Link>
        </div>
      </footer>
    </div>
  );
}
