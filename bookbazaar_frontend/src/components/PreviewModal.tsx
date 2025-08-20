"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBookClient } from "@/lib/data.client";
import type { Book } from "./BookGrid";

// PUBLIC_INTERFACE
export function PreviewModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const previewId = searchParams.get("preview");

  const [open, setOpen] = useState<boolean>(false);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (previewId) {
        setOpen(true);
        const b = await getBookClient(previewId);
        if (active) setBook(b);
      } else {
        setOpen(false);
        setBook(null);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [previewId]);

  const onClose = useMemo(
    () => () => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("preview");
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="relative w-full max-w-lg rounded-lg bg-white shadow-lg border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close preview"
          className="absolute right-2 top-2 size-8 grid place-items-center rounded-full hover:bg-neutral-100"
          onClick={onClose}
        >
          ×
        </button>
        <div className="p-5">
          {book ? (
            <>
              <div className="flex items-start gap-4">
                <div className="w-24 aspect-[3/4] relative rounded border border-neutral-200 bg-neutral-50 overflow-hidden">
                  {book.coverUrl ? (
                    <Image
                      alt={`${book.title} cover`}
                      src={book.coverUrl}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-sm text-neutral-600">by {book.author}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-800 line-clamp-6">
                {book.description}
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={`/books/${book.id}`}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-[#185adb] text-white text-sm hover:opacity-95"
                >
                  View Details
                </a>
                <button className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-neutral-200 text-sm hover:bg-neutral-50">
                  Add to Wishlist
                </button>
              </div>
            </>
          ) : (
            <div className="text-sm text-neutral-600">Loading…</div>
          )}
        </div>
      </div>
    </div>
  );
}
