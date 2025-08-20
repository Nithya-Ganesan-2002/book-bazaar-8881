export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-6 w-56 bg-neutral-100 rounded animate-pulse" />
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 overflow-hidden bg-white"
          >
            <div className="aspect-[3/4] w-full bg-neutral-100 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
