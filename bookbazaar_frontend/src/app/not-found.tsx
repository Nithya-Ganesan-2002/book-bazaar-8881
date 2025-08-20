import Link from "next/link";

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-neutral-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-6">
        <Link href="/" className="text-[#185adb] hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
