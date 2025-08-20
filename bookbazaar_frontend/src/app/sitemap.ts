import type { MetadataRoute } from "next";
import { getAllBooks } from "@/lib/data";

// PUBLIC_INTERFACE
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://bookbazaar.example.com";
  const books = await getAllBooks({ limit: 50 });

  const bookEntries = books.map((b) => ({
    url: `${base}/books/${b.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/browse`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    ...bookEntries,
  ];
}
