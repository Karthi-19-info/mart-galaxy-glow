import { categoryBySlug, type Product } from "@/data/catalog";

export function searchProducts(list: Product[], term: string): Product[] {
  const q = term.trim().toLowerCase();
  if (!q) return list;
  const words = q.split(/\s+/);

  const scored = list
    .map((p) => {
      const haystack = [
        p.name,
        p.brand,
        categoryBySlug(p.category)?.name ?? "",
        p.description,
        p.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const w of words) {
        if (!haystack.includes(w)) return { p, score: -1 };
        if (p.name.toLowerCase().includes(w)) score += 5;
        if (p.brand.toLowerCase().includes(w)) score += 3;
        score += 1;
      }
      if (p.name.toLowerCase().startsWith(q)) score += 6;
      return { p, score };
    })
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((x) => x.p);
}
