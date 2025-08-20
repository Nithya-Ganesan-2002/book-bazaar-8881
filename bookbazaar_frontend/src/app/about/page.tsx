export const revalidate = 3600;

// PUBLIC_INTERFACE
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">About BookBazaar</h1>
      <p className="mt-4 leading-7 text-neutral-800">
        BookBazaar is a modern, minimal digital bookstore built with Next.js. It supports
        server-side rendering and static generation for fast performance and great SEO.
        Browse curated categories, search across titles and authors, and preview books with
        a clean, distraction-free interface.
      </p>
    </div>
  );
}
