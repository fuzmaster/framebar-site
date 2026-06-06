import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FrameBar — Frame-accurate progress overlays for video editors",
  description:
    "Enter your duration, FPS, and aspect ratio. Customize the style. Export a transparent progress bar overlay for Premiere Pro, DaVinci Resolve, Final Cut, CapCut, or After Effects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
