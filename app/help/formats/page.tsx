import Link from "next/link";
import { EXPORT_FORMATS } from "@/lib/exportFormats";

export const metadata = { title: "FrameBar — Export Formats" };

const SOFTWARE = [
  {
    name: "Premiere Pro",
    formats: ["MOV ProRes 4444 alpha (Pro)", "PNG sequence", "WebM alpha"],
  },
  {
    name: "DaVinci Resolve",
    formats: ["MOV ProRes 4444 alpha (Pro)", "PNG sequence", "WebM alpha"],
  },
  { name: "Final Cut Pro", formats: ["MOV ProRes 4444 alpha (Pro)", "PNG sequence"] },
  { name: "CapCut", formats: ["PNG sequence", "WebM alpha (varies)"] },
  { name: "After Effects", formats: ["PNG sequence", "MOV ProRes 4444 alpha (Pro)"] },
];

export default function FormatsPage() {
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
          <Link href="/pricing" className="hover:text-text">
            Pricing
          </Link>
          <Link href="/editor" className="btn-primary">
            Open Editor
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Export formats</h1>
        <p className="mt-3 text-text-dim max-w-2xl">
          FrameBar exports transparent overlays that drop into your editor. Pick the format that
          matches your software.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">MVP formats</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {EXPORT_FORMATS.map((f) => (
              <div key={f.id} className="panel p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{f.name}</h3>
                  <span
                    className={[
                      "text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded",
                      f.status === "recommended"
                        ? "bg-accent/20 text-accent"
                        : f.status === "prototype"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-bg-border text-text-dim",
                    ].join(" ")}
                  >
                    {f.status === "available-soon" ? "Soon" : f.status}
                  </span>
                </div>
                <p className="text-sm text-text-dim mt-2">{f.description}</p>
                <div className="text-xs text-text-faint mt-3">
                  Transparency: {f.transparency}
                </div>
                <div className="text-xs text-text-faint mt-1">
                  Best for: {f.bestFor.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">By editing software</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {SOFTWARE.map((s) => (
              <div key={s.name} className="panel p-5">
                <h3 className="font-semibold">{s.name}</h3>
                <ul className="mt-2 text-sm text-text-dim space-y-1">
                  {s.formats.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Pro / future</h2>
          <ul className="mt-3 text-sm text-text-dim space-y-1">
            <li>· MOV ProRes 4444 alpha — best for Premiere, FCP, Resolve</li>
            <li>· MOGRT — Premiere Pro templates</li>
            <li>· DaVinci Fusion macro — Resolve users</li>
            <li>· Final Cut title/template — FCP users</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
