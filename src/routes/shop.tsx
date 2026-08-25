import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { ProductGrid } from "@/components/shop/ProductGrid";
import {
  FilterSidebar,
  defaultFilters,
  PRICE_CEILING,
  type ShopFilters,
} from "@/components/shop/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { discountPercent, products, categoryBySlug } from "@/data/catalog";
import { searchProducts } from "@/lib/search";

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "newest" | "discount";

const sortLabels: Record<SortKey, string> = {
  relevance: "Relevance",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating: "Highest Rated",
  newest: "Newest",
  discount: "Biggest Discount",
};

const PAGE_SIZE = 12;

export type ShopSearch = {
  q?: string;
  category?: string;
  sort?: SortKey;
  page?: number;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    sort: (typeof search["sort"] === "string" ? search["sort"] : "relevance") as SortKey,
    page: Number(search["page"]) > 0 ? Number(search["page"]) : 1,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Products — Karthick Mart" },
      {
        name: "description",
        content:
          "Browse 30+ products across groceries, electronics, fashion, home, beauty and sports. Filter by brand, price, rating and discount.",
      },
      { property: "og:title", content: "Shop All Products — Karthick Mart" },
      {
        property: "og:description",
        content: "Filter, sort and compare Karthick Mart products with prices in ₹.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q, category, sort, page } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filters, setFilters] = useState<ShopFilters>({
    ...defaultFilters,
    category: category ? [category] : [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: category ? [category] : [] }));
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(id);
  }, [q, category, sort]);

  const patch = (p: Partial<ShopFilters>) => {
    setFilters((f) => ({ ...f, ...p }));
    navigate({ search: (prev) => ({ ...prev, page: 1, category: undefined }) });
  };

  const filtered = useMemo(() => {
    let list = q ? searchProducts(products, q) : [...products];

    if (filters.category.length) list = list.filter((p) => filters.category.includes(p.category));
    if (filters.brand.length) list = list.filter((p) => filters.brand.includes(p.brand));
    if (filters.maxPrice < PRICE_CEILING) list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.minDiscount) list = list.filter((p) => discountPercent(p) >= filters.minDiscount);
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      case "discount":
        return list.sort((a, b) => discountPercent(b) - discountPercent(a));
      default:
        return list;
    }
  }, [q, filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const heading = q
    ? `Results for “${q}”`
    : category
      ? (categoryBySlug(category)?.name ?? "Shop")
      : "All Products";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        title={heading}
        subtitle={`${filtered.length} product${filtered.length === 1 ? "" : "s"} available · prices in ₹`}
      />

      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={patch} onReset={() => patch(defaultFilters)} />
        </div>

        <div className="space-y-5">
          <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="size-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-background/95 p-4 backdrop-blur-xl">
                <SheetTitle className="sr-only">Product filters</SheetTitle>
                <FilterSidebar filters={filters} onChange={patch} onReset={() => patch(defaultFilters)} />
              </SheetContent>
            </Sheet>

            <p className="hidden text-sm text-muted-foreground lg:block">
              Showing {pageItems.length} of {filtered.length}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort</span>
              <Select
                value={sort}
                onValueChange={(v) =>
                  navigate({ search: (prev) => ({ ...prev, sort: v as SortKey, page: 1 }) })
                }
              >
                <SelectTrigger className="w-[12rem]" aria-label="Sort products">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sortLabels).map(([k, label]) => (
                    <SelectItem key={k} value={k}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ProductGrid products={pageItems} loading={loading} />

          {totalPages > 1 && !loading && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      isActive={n === current}
                      onClick={() => navigate({ search: (prev) => ({ ...prev, page: n }) })}
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
