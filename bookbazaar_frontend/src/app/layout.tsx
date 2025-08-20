import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ClientPreviewBoundary from "@/app/ClientPreviewBoundary";

// PUBLIC_INTERFACE
export const metadata: Metadata = {
  title: "BookBazaar — Digital Bookstore",
  description:
    "Browse, search, and preview books at BookBazaar. A modern, minimal, SEO-friendly digital bookstore built with Next.js.",
  metadataBase:
    process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : undefined,
  applicationName: "BookBazaar",
  keywords: ["books", "bookstore", "reading", "ebooks", "Next.js", "book preview"],
  openGraph: {
    title: "BookBazaar — Digital Bookstore",
    description:
      "Browse, search, and preview books at BookBazaar. A modern, minimal, SEO-friendly digital bookstore built with Next.js.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookBazaar — Digital Bookstore",
    description:
      "Browse, search, and preview books at BookBazaar. A modern, minimal, SEO-friendly digital bookstore built with Next.js.",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout shell with header, sidebar, and main content region
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-white text-neutral-900 antialiased"
        suppressHydrationWarning
      >
        <div className="min-h-dvh grid grid-rows-[auto_1fr]">
          <header className="border-b border-neutral-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div
                  aria-hidden
                  className="size-6 rounded bg-[#185adb]"
                  title="BookBazaar"
                />
                <span className="text-lg font-semibold tracking-tight">
                  BookBazaar
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link className="text-neutral-600 hover:text-neutral-900" href="/">
                  Home
                </Link>
                <Link className="text-neutral-600 hover:text-neutral-900" href="/browse">
                  Browse
                </Link>
                <Link className="text-neutral-600 hover:text-neutral-900" href="/about">
                  About
                </Link>
              </nav>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
            <aside className="border-r border-neutral-200 hidden md:block">
              <div className="sticky top-0 p-4">
                <h2 className="text-sm font-medium text-neutral-700 mb-2">
                  Categories
                </h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link className="category-link" href="/browse?category=all">
                      All
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=fiction">
                      Fiction
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=non-fiction">
                      Non-fiction
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=sci-fi">
                      Sci‑Fi
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=biography">
                      Biography
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=history">
                      History
                    </Link>
                  </li>
                  <li>
                    <Link className="category-link" href="/browse?category=business">
                      Business
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>

            <main className="min-h-[70vh]">{children}</main>
          </div>

          <footer className="border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-neutral-500">
              © {new Date().getFullYear()} BookBazaar. All rights reserved.
            </div>
          </footer>
        </div>
        {/* Global Preview Modal Portal */}
        <ClientPreviewBoundary />
      </body>
    </html>
  );
}
