import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { BackLinkFooter } from "@/components/site/BackLinkFooter";
import { AUTHOR, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about FrameBar — bug reports, feature requests, partnerships, and press.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mailHref = CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=FrameBar%20feedback`
    : null;

  return (
    <div className="min-h-screen bg-bg-base text-text">
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="text-text-dim mt-3">
          FrameBar is built by {AUTHOR.name}. For bug reports, feature requests, partnerships, or
          press, the fastest paths are:
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {mailHref && (
            <a
              href={mailHref}
              className="panel p-5 hover:border-accent transition-colors block"
            >
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <h2 className="font-semibold">Email</h2>
              </div>
              <span className="text-accent text-sm mt-2 inline-block">{CONTACT_EMAIL}</span>
              <p className="text-xs text-text-faint mt-2">Best for bugs, feedback, and press.</p>
            </a>
          )}

          <a
            href="https://github.com/fuzmaster/framebar-site/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="panel p-5 hover:border-accent transition-colors block"
          >
            <h2 className="font-semibold">GitHub issue</h2>
            <span className="text-accent text-sm mt-2 inline-block">
              github.com/fuzmaster/framebar-site/issues
            </span>
            <p className="text-xs text-text-faint mt-2">
              Best for repeatable bugs and feature requests.
            </p>
          </a>

          <a
            href={AUTHOR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel p-5 hover:border-accent transition-colors block"
          >
            <h2 className="font-semibold">Portfolio</h2>
            <span className="text-accent text-sm mt-2 inline-block">
              {AUTHOR.url.replace("https://", "")}
            </span>
            <p className="text-xs text-text-faint mt-2">Other work by {AUTHOR.name}.</p>
          </a>
        </div>

        <p className="text-sm text-text-faint mt-10">
          A direct in-page contact form will arrive before paid plans launch.
        </p>
      </main>
      <BackLinkFooter />
    </div>
  );
}
