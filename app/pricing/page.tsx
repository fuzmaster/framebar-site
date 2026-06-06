import Link from "next/link";
import { Check } from "lucide-react";
import { BackLinkFooter } from "@/components/site/BackLinkFooter";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    blurb: "For trying it out.",
    features: [
      "Horizontal bar only",
      "Up to 60 seconds",
      "Up to 1080p",
      "30 FPS max",
      "Limited presets",
      "PNG sequence export",
      "Watermarked WebM",
    ],
    cta: "Open Editor",
    href: "/editor",
  },
  {
    name: "Pro",
    price: "$9/mo",
    blurb: "For working creators.",
    features: [
      "No watermark",
      "Up to 4K",
      "23.976, 29.97, 59.94, 60 FPS",
      "WebM alpha",
      "Unlimited duration",
      "All presets",
      "Save custom presets",
    ],
    cta: "Coming soon",
    href: "#",
    disabled: true,
    highlight: true,
  },
  {
    name: "Studio",
    price: "$29/mo",
    blurb: "For teams and agencies.",
    features: [
      "MOV ProRes 4444 alpha",
      "Batch exports",
      "Brand kits",
      "Chapter markers",
      "Team templates",
      "Commercial license",
    ],
    cta: "Coming soon",
    href: "#",
    disabled: true,
  },
];

export const metadata = {
  title: "Pricing",
  description:
    "FrameBar pricing — free during MVP. Pro and Studio tiers for no watermark, 4K export, MOV alpha, batch renders, brand kits, and commercial license.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
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
            Formats
          </Link>
          <Link href="/editor" className="btn-primary">
            Open Editor
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight text-center">Pricing</h1>
        <p className="mt-3 text-center text-text-dim">
          Free during MVP. Paid tiers shown for direction — payments not live yet.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={[
                "panel p-6 flex flex-col",
                t.highlight ? "border-accent" : "",
              ].join(" ")}
            >
              <div className="text-sm text-text-dim">{t.name}</div>
              <div className="mt-1 text-3xl font-semibold">{t.price}</div>
              <div className="text-sm text-text-dim mt-1">{t.blurb}</div>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="mt-1 text-accent shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {t.disabled ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-bg-border text-text-faint px-4 py-2 cursor-not-allowed"
                >
                  {t.cta}
                </button>
              ) : (
                <Link
                  href={t.href}
                  className={t.highlight ? "btn-primary mt-6" : "btn-ghost mt-6"}
                >
                  {t.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>
      <BackLinkFooter />
    </div>
  );
}
