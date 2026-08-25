import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductImage } from "@/components/shop/ProductImage";
import { RatingStars } from "@/components/shop/RatingStars";
import { PriceDisplay } from "@/components/shop/PriceDisplay";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { SectionHeading } from "@/components/layout/SectionHeading";
import {
  products,
  relatedProducts,
  reviewsForProduct,
  stockStatus,
  type Product,
} from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Karthick Mart" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Karthick Mart`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductDetail,
});

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Product not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">This item may have been removed from the store.</p>
      <Button asChild className="mt-6">
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wished = wishlist.includes(product.id);
  const reviews = reviewsForProduct(product.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImage product={product} className="aspect-square w-full" iconClassName="size-16" />

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.brand}</p>
          <h1 className="font-display text-3xl font-bold leading-tight">{product.name}</h1>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          <PriceDisplay price={product.price} mrp={product.mrp} />
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="text-sm font-medium">
            {stockStatus(product)} · SKU {product.sku}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90"
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="size-4" /> Add to cart
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggleWishlist(product.id)}>
              <Heart className="size-4" /> {wished ? "In wishlist" : "Wishlist"}
            </Button>
          </div>

          <Separator />

          <dl className="grid gap-2 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="glass rounded-xl p-3">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-sm font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {reviews.length > 0 && (
        <section className="mt-14">
          <SectionHeading eyebrow="Verified buyers" title="Customer Reviews" />
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{r.author}</h3>
                  <RatingStars rating={r.rating} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <SectionHeading eyebrow="You may also like" title="Related Products" />
        <ProductGrid products={relatedProducts(product)} />
      </section>
    </div>
  );
}
