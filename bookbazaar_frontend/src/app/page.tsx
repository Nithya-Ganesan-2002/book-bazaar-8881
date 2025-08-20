import { Suspense } from "react";
import Link from "next/link";
import { getAllBooks } from "@/lib/data";
import { SearchBar } from "@/components/SearchBar";
import { BookGrid } from "@/components/BookGrid";

export const revalidate = 60;

// PUBLIC_INTERFACE
export default async function Home() {
  // Simulated SSG for home with top books
  const books = await getAllBooks({ limit: 12 });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="md:hidden mb-4">
        <MobileCategories />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Discover Books</h1>
        <Link
          href="/browse"
          className="text-sm text-[#185adb] hover:underline"
        >
          Browse all →
        </Link>
      </div>

      <div className="mt-4">
        <SearchBar placeholder="Search by title, author, or keyword..." />
      </div>

      <section className="mt-6">
        <Suspense fallback={<div className="text-sm text-neutral-500">Loading books…</div>}>
          <BookGrid books={books} />
        </Suspense>
      </section>
    </div>
  );
}

function MobileCategories() {
  const items = [
    { label: "All", q: "all" },
    { label: "Fiction", q: "fiction" },
    { label: "Non‑fiction", q: "non-fiction" },
    { label: "Sci‑Fi", q: "sci-fi" },
    { label: "Biography", q: "biography" },
  ];
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {items.map((c) => (
        <a
          key={c.q}
          href={`/browse?category=${encodeURIComponent(c.q)}`}
          className="px-3 py-1 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 whitespace-nowrap"
        >
          {c.label}
        </a>
      ))}
    </div>
  );
}
