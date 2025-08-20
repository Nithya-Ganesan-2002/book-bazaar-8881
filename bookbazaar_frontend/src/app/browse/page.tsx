import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllBooks } from "@/lib/data";
import { BookGrid } from "@/components/BookGrid";
import { SearchBar } from "@/components/SearchBar";

export const revalidate = 60;

// PUBLIC_INTERFACE
export default async function BrowsePage({
  searchParams,
}: {
  searchParams?: { category?: string; q?: string };
}) {
  const category = (searchParams?.category ?? "all").toLowerCase();
  const q = searchParams?.q?.trim() ?? "";

  const books = await getAllBooks({
    category: category !== "all" ? category : undefined,
    query: q || undefined,
    limit: 48,
  });

  if (!books) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          {category === "all" ? "Browse Books" : `Browse: ${capitalize(category)}`}
        </h1>
        <div className="w-full sm:w-[360px]">
          <SearchBar placeholder="Search books..." defaultValue={q} />
        </div>
      </div>

      <div className="mt-6">
        <Suspense fallback={<div className="text-sm text-neutral-500">Loading…</div>}>
          <BookGrid books={books} />
        </Suspense>
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
