import {
  ShoppingBasket,
  Cpu,
  Shirt,
  CookingPot,
  Sparkles,
  HeartPulse,
  Dumbbell,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategorySlug, Product } from "@/data/catalog";

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  groceries: ShoppingBasket,
  electronics: Cpu,
  fashion: Shirt,
  "home-kitchen": CookingPot,
  beauty: Sparkles,
  "personal-care": HeartPulse,
  sports: Dumbbell,
  accessories: Watch,
};

/**
 * Deterministic, dependency-free product visual: a hue-derived neon gradient
 * plate with the category glyph and product initials. Never 404s, no layout
 * shift, and it keeps the dark/neon art direction consistent.
 */
export function ProductImage({
  product,
  className,
  iconClassName,
}: {
  product: Product;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = categoryIcons[product.category];
  const initials = product.name
    .split(" ")
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-xl bg-secondary", className)}
      role="img"
      aria-label={`${product.brand} ${product.name}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 100% at 20% 0%, oklch(0.45 0.16 ${product.hue}) 0%, oklch(0.24 0.07 ${product.hue}) 55%, oklch(0.18 0.03 265) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 40%, oklch(1 0 0 / 0.35) 50%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <Icon className={cn("size-14 text-foreground/85 drop-shadow-lg", iconClassName)} strokeWidth={1.2} />
      </div>
      <span className="absolute bottom-2 right-3 font-display text-2xl font-bold text-foreground/25">
        {initials}
      </span>
      <span className="absolute left-3 top-3 rounded-md bg-background/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/80 backdrop-blur">
        {product.brand}
      </span>
    </div>
  );
}
