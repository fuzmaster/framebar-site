import type { Metadata } from "next";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { BackLinkFooter } from "@/components/site/BackLinkFooter";

export const metadata: Metadata = {
  title: "Privacy",
  description: "FrameBar privacy policy. We do not collect, store, or transmit your video, settings, or any personal data. All rendering happens in your browser.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text">
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy</h1>
        <p className="text-sm text-text-faint mt-2">Last updated: 2026</p>

        <section className="prose-block">
          <h2 className="text-xl font-semibold mt-10">Summary</h2>
          <p className="text-text-dim mt-3">
            FrameBar does not collect, store, or transmit your video, your settings, or any
            personal data. All rendering happens in your browser. There is no backend, no account
            system, and no analytics that personally identify you.
          </p>

          <h2 className="text-xl font-semibold mt-8">What we do not collect</h2>
          <ul className="mt-3 space-y-1 text-text-dim text-sm">
            <li>· No video uploads — FrameBar never receives your footage.</li>
            <li>· No account data — there is no sign-up.</li>
            <li>· No editor settings — your style and configuration live in browser memory.</li>
            <li>· No payment data — there is no checkout at this time.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8">Hosting and logs</h2>
          <p className="text-text-dim mt-3">
            FrameBar is hosted on Vercel. Vercel may log standard request data such as IP
            address, request path, and user agent for operational and abuse-prevention purposes,
            governed by Vercel&apos;s own privacy policy.
          </p>

          <h2 className="text-xl font-semibold mt-8">Cookies and tracking</h2>
          <p className="text-text-dim mt-3">
            FrameBar does not set cookies. No third-party analytics or advertising scripts are
            embedded.
          </p>

          <h2 className="text-xl font-semibold mt-8">Changes</h2>
          <p className="text-text-dim mt-3">
            If FrameBar later adds accounts, paid plans, or analytics, this page will be updated
            before those features go live.
          </p>

          <h2 className="text-xl font-semibold mt-8">Contact</h2>
          <p className="text-text-dim mt-3">
            Privacy questions: see the <a className="text-accent hover:underline" href="/contact">contact</a> page.
          </p>
        </section>
      </main>
      <BackLinkFooter />
    </div>
  );
}
