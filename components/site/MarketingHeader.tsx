import Link from "next/link";

export function MarketingHeader() {
  return (
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
        <Link href="/pricing" className="hover:text-text">
          Pricing
        </Link>
        <Link href="/editor" className="btn-primary">
          Open Editor
        </Link>
      </nav>
    </header>
  );
}
