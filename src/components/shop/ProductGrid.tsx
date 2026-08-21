import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/data/catalog";
import { EmptyState } from "./EmptyState";
import { PackageSearch } from "lucide-react";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass space-y-3 rounded-2xl p-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  loading,
  emptyTitle = "No products found",
  emptyHint = "Try removing a filter or searching for something else.",
}: {
  products: Product[];
  loading?: boolean;
  emptyTitle?: string;
  emptyHint?: string;
}) {
  if (loading) return <ProductGridSkeleton />;
  if (products.length === 0)
    return <EmptyState icon={PackageSearch} title={emptyTitle} hint={emptyHint} />;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
