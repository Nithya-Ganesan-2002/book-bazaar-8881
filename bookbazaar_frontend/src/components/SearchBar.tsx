"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  placeholder?: string;
  defaultValue?: string;
};

// PUBLIC_INTERFACE
export function SearchBar({ placeholder = "Search…", defaultValue = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initial = useMemo(
    () => defaultValue || searchParams.get("q") || "",
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [q, setQ] = useState(initial);

  useEffect(() => {
    setQ(searchParams.get("q") || defaultValue || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q");
      router.push(`${pathname}?${params.toString()}`);
    },
    [q, router, pathname, searchParams]
  );

  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 pr-9 text-sm outline-none ring-0 focus:border-[#185adb]"
        aria-label="Search books"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1.5 h-7 px-2 rounded bg-[#185adb] text-white text-xs"
      >
        Search
      </button>
    </form>
  );
}
