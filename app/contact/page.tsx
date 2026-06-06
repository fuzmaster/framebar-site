import type { Metadata } from "next";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { BackLinkFooter } from "@/components/site/BackLinkFooter";
import { AUTHOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about FrameBar — bug reports, feature requests, partnerships, and press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text">
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="text-text-dim mt-3">
          FrameBar is built by {AUTHOR.name}. For bug reports, feature requests, partnerships, or
          press, reach out via:
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="panel p-5">
            <h2 className="font-semibold">Portfolio</h2>
            <a
              href={AUTHOR.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline text-sm mt-2 inline-block"
            >
              {AUTHOR.url.replace("https://", "")}
            </a>
          </div>
          <div className="panel p-5">
            <h2 className="font-semibold">GitHub</h2>
            <a
              href="https://github.com/fuzmaster/framebar-site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline text-sm mt-2 inline-block"
            >
              github.com/fuzmaster/framebar-site
            </a>
            <p className="text-xs text-text-faint mt-2">
              File issues and feature requests in the repo.
            </p>
          </div>
        </div>

        <p className="text-sm text-text-faint mt-10">
          A direct contact form will be added before paid plans launch.
        </p>
      </main>
      <BackLinkFooter />
    </div>
  );
}
