import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { RatingStars } from "./RatingStars";
import { PriceDisplay } from "./PriceDisplay";
import { discountPercent, stockStatus, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wished = wishlist.includes(product.id);
  const status = stockStatus(product);
  const off = discountPercent(product);

  return (
    <article className="glass card-hover group relative flex flex-col overflow-hidden rounded-2xl">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-none"
        aria-label={product.name}
      >
        <ProductImage
          product={product}
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      {off > 0 && (
        <span className="absolute left-3 top-3 rounded-full bg-gradient-brand px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
          -{off}%
        </span>
      )}

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wished}
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/60 backdrop-blur transition-colors hover:bg-background/85"
      >
        <Heart className={cn("size-4", wished ? "fill-destructive text-destructive" : "text-foreground/80")} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{product.brand}</p>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <PriceDisplay price={product.price} mrp={product.mrp} />
        <p
          className={cn(
            "text-xs font-medium",
            status === "In Stock" ? "text-success" : status === "Low Stock" ? "text-warning" : "text-destructive",
          )}
        >
          {status}
          {status === "Low Stock" && ` — only ${product.stock} left`}
        </p>
        <Button
          className="mt-auto w-full"
          disabled={product.stock === 0}
          onClick={() => addToCart(product.id)}
        >
          <ShoppingCart className="size-4" />
          {product.stock === 0 ? "Out of stock" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
