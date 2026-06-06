import type { Metadata } from "next";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { BackLinkFooter } from "@/components/site/BackLinkFooter";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "FrameBar terms of use. The tool is provided as-is during MVP. You own the overlays you generate.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text">
      <MarketingHeader />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Terms of use</h1>
        <p className="text-sm text-text-faint mt-2">Last updated: 2026</p>

        <section>
          <h2 className="text-xl font-semibold mt-10">Use of the tool</h2>
          <p className="text-text-dim mt-3">
            FrameBar is provided as-is during MVP. You may use the tool to generate progress
            overlay graphics for your own video projects, personal or commercial.
          </p>

          <h2 className="text-xl font-semibold mt-8">Ownership of generated output</h2>
          <p className="text-text-dim mt-3">
            You own the overlays you generate. FrameBar makes no claim to the visual output of
            the tool when configured by you.
          </p>

          <h2 className="text-xl font-semibold mt-8">No warranty</h2>
          <p className="text-text-dim mt-3">
            FrameBar is provided without warranty of any kind. Frame timing is calculated to
            specification, but you are responsible for verifying the overlay matches your final
            edit before publishing.
          </p>

          <h2 className="text-xl font-semibold mt-8">Acceptable use</h2>
          <p className="text-text-dim mt-3">
            Do not use FrameBar to generate content that is illegal, harassing, or that infringes
            third-party rights. Automated abuse of the tool is prohibited.
          </p>

          <h2 className="text-xl font-semibold mt-8">Paid plans</h2>
          <p className="text-text-dim mt-3">
            Paid plans (Pro, Studio) are described on the pricing page for direction only.
            Payments and entitlements are not active. When billing goes live, these terms will be
            updated to include refund, cancellation, and license language.
          </p>

          <h2 className="text-xl font-semibold mt-8">Changes</h2>
          <p className="text-text-dim mt-3">
            These terms may change. Material changes will be announced on this page.
          </p>

          <h2 className="text-xl font-semibold mt-8">Contact</h2>
          <p className="text-text-dim mt-3">
            See the <a className="text-accent hover:underline" href="/contact">contact</a> page.
          </p>
        </section>
      </main>
      <BackLinkFooter />
    </div>
  );
}
