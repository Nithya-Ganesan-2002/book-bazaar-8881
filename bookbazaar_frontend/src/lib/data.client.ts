"use client";
import type { Book } from "@/components/BookGrid";

// PUBLIC_INTERFACE
export async function getBookClient(id: string): Promise<Book | null> {
  // In a real app, this would use fetch to an API base URL.
  // For now, reuse the static import via dynamic import to avoid server code in client bundles.
  const { getBookById } = await import("./data");
  return getBookById(id);
}
