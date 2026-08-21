import { Link } from "@tanstack/react-router";
import { categoryCount, type Category } from "@/data/catalog";
import { categoryIcons } from "./ProductImage";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug];
  return (
    <Link
      to="/shop"
      search={{ category: category.slug }}
      className="glass card-hover group flex flex-col gap-3 rounded-2xl p-5"
    >
      <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
        <Icon className="size-6" />
      </span>
      <span>
        <span className="block font-display text-sm font-semibold">{category.name}</span>
        <span className="block text-xs text-muted-foreground">{category.blurb}</span>
      </span>
      <span className="mt-auto text-xs font-medium text-primary">
        {categoryCount(category.slug)} products
      </span>
    </Link>
  );
}
