import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Karthick Mart" },
      {
        name: "description",
        content:
          "Explore Karthick Mart categories: groceries, electronics, fashion, home & kitchen, beauty, personal care, sports and accessories.",
      },
      { property: "og:title", content: "All Categories — Karthick Mart" },
      {
        property: "og:description",
        content: "Eight curated aisles of everyday essentials at Karthick Mart.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader
        title="Browse Categories"
        subtitle="Pick an aisle and we'll take you straight to the filtered product listing."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}
