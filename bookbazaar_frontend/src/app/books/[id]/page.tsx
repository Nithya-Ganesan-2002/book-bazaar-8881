import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById, getAllBooks } from "@/lib/data";

export const revalidate = 120;

type PageProps = { params: { id: string } };

// PUBLIC_INTERFACE
export async function generateStaticParams() {
  const books = await getAllBooks({ limit: 50 });
  return books.map((b) => ({ id: b.id }));
}

// PUBLIC_INTERFACE
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const book = await getBookById(params.id);
  if (!book) {
    return { title: "Book Not Found — BookBazaar" };
  }
  const title = `${book.title} by ${book.author} — BookBazaar`;
  const description = book.description?.slice(0, 150) ?? "Preview this book on BookBazaar.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/books/${book.id}`,
      images: book.coverUrl ? [{ url: book.coverUrl, width: 600, height: 800 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// PUBLIC_INTERFACE
export default async function BookPage({ params }: PageProps) {
  const book = await getBookById(params.id);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="text-sm text-[#185adb] hover:underline">
        ← Back
      </Link>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded border border-neutral-200 bg-neutral-50">
          {book.coverUrl ? (
            <Image src={book.coverUrl} alt={`${book.title} cover`} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-neutral-400 text-sm">
              No cover
            </div>
          )}
        </div>

        <article>
          <h1 className="text-2xl font-semibold">{book.title}</h1>
          <p className="mt-1 text-neutral-600">by {book.author}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {book.categories?.map((c) => (
              <span key={c} className="px-2 py-1 rounded-full border border-neutral-200">
                {c}
              </span>
            ))}
          </div>

          <p className="mt-4 leading-7 text-neutral-800">{book.description}</p>

          <div className="mt-6 flex gap-3">
            <a
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#185adb] text-white text-sm hover:opacity-95"
              href={`/?preview=${encodeURIComponent(book.id)}`}
            >
              Quick Preview
            </a>
            <button
              className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-neutral-200 text-sm hover:bg-neutral-50"
            >
              Add to Wishlist
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
