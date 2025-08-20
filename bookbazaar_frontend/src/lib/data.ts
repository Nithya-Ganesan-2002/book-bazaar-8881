import type { Book } from "@/components/BookGrid";

// PUBLIC_INTERFACE
export async function getAllBooks({
  category,
  query,
  limit = 24,
}: {
  category?: string;
  query?: string;
  limit?: number;
} = {}): Promise<Book[]> {
  // Simulated data source for initial scaffold (can be replaced by real API).
  const books = MOCK_BOOKS;

  let filtered = books;

  if (category) {
    const lc = category.toLowerCase();
    filtered = filtered.filter((b) =>
      (b.categories || []).some((c) => c.toLowerCase() === lc)
    );
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.description || "").toLowerCase().includes(q)
    );
  }

  return filtered.slice(0, limit);
}

// PUBLIC_INTERFACE
export async function getBookById(id: string): Promise<Book | null> {
  const book = MOCK_BOOKS.find((b) => b.id === id);
  return book || null;
}

// PUBLIC_INTERFACE
export function getApiBase(): string {
  // If in future we use an API, read base from env
  // NEXT_PUBLIC_API_BASE should be provided by the environment.
  return process.env.NEXT_PUBLIC_API_BASE || "";
}

const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Silent Pages",
    author: "Avery Clark",
    coverUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
    categories: ["fiction"],
    description:
      "A reflective journey through a quiet town where secrets are tucked between the pages of everyday lives.",
  },
  {
    id: "2",
    title: "Galactic Drift",
    author: "Rin Okada",
    coverUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop",
    categories: ["sci-fi", "fiction"],
    description:
      "An odyssey across star systems, where a rogue pilot discovers what it means to find home among the stars.",
  },
  {
    id: "3",
    title: "Thinking in Systems",
    author: "Donella Meadows",
    coverUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?q=80&w=600&auto=format&fit=crop",
    categories: ["non-fiction", "business"],
    description:
      "A concise guide to understanding complex systems and making better decisions in an interconnected world.",
  },
  {
    id: "4",
    title: "The Innovator's Path",
    author: "Priya Natarajan",
    coverUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600&auto=format&fit=crop",
    categories: ["business", "non-fiction"],
    description:
      "Lessons from leaders who transformed industries through curiosity, resilience, and design thinking.",
  },
  {
    id: "5",
    title: "Echoes of Time",
    author: "Milo Zhang",
    coverUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=600&auto=format&fit=crop",
    categories: ["fiction", "history"],
    description:
      "A sweeping tale connecting generations through a mysterious heirloom with a hidden past.",
  },
  {
    id: "6",
    title: "Becoming You",
    author: "Lina Duarte",
    coverUrl:
      "https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=600&auto=format&fit=crop",
    categories: ["biography", "non-fiction"],
    description:
      "An intimate portrait of a life lived boldly, exploring the trials and triumphs that forged a visionary.",
  },
  {
    id: "7",
    title: "Quantum Horizons",
    author: "Elio Marchetti",
    coverUrl:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=600&auto=format&fit=crop",
    categories: ["sci-fi"],
    description:
      "A mind-bending narrative that blurs the line between physics and philosophy at the edge of reality.",
  },
  {
    id: "8",
    title: "The Art of Focus",
    author: "Noa Feldman",
    coverUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop",
    categories: ["non-fiction"],
    description:
      "Practical strategies to reclaim attention and design your day for deep, meaningful work.",
  },
  {
    id: "9",
    title: "Trail of Kings",
    author: "Ibrahim Khan",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    categories: ["history", "non-fiction"],
    description:
      "An engaging exploration of lesser-known rulers who left an outsized mark on world history.",
  },
  {
    id: "10",
    title: "Orbiting Ideas",
    author: "Sasha Petrova",
    coverUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=600&auto=format&fit=crop",
    categories: ["business"],
    description:
      "How small teams spark revolutions by challenging assumptions and prototyping relentlessly.",
  },
];
