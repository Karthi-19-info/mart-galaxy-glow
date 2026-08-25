import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { newArrivals } from "@/data/catalog";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Karthick Mart" },
      { name: "description", content: "The freshest additions to Karthick Mart: newly stocked groceries, gadgets, fashion and home essentials in ₹." },
      { property: "og:title", content: "New Arrivals — Karthick Mart" },
      { property: "og:description", content: "See what just landed in store this week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const items = newArrivals();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader title="New Arrivals" subtitle={`${items.length} freshly stocked products · prices in ₹`} />
      <ProductGrid products={items} />
    </div>
  );
}
