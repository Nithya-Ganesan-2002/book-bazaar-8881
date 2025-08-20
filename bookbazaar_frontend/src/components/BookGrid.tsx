import Image from "next/image";
import Link from "next/link";

export type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  categories?: string[];
  description?: string;
};

function BookCard({ book }: { book: Book }) {
  return (
    <div className="group rounded-lg border border-neutral-200 overflow-hidden bg-white hover:shadow-sm transition">
      <div className="relative aspect-[3/4] w-full bg-neutral-100 text-neutral-400 text-sm">
        {book.coverUrl ? (
          <Image
            alt={`${book.title} cover`}
            src={book.coverUrl}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">No cover</div>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-1 font-medium">{book.title}</div>
        <div className="line-clamp-1 text-xs text-neutral-600 mt-0.5">
          {book.author}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Link
            href={`/books/${book.id}`}
            className="text-xs text-[#185adb] hover:underline"
          >
            Details
          </Link>
          <a
            href={`/?preview=${encodeURIComponent(book.id)}`}
            className="text-xs text-neutral-600 hover:text-neutral-900"
          >
            Quick Preview
          </a>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function BookGrid({ books }: { books: Book[] }) {
  if (!books?.length) {
    return (
      <div className="text-sm text-neutral-600">No books found. Try a different search.</div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}
