import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shop/EmptyState";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { productById } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Karthick Mart" },
      { name: "description", content: "Saved products you plan to buy later at Karthick Mart, with live ₹ pricing." },
      { property: "og:title", content: "Your Wishlist — Karthick Mart" },
      { property: "og:description", content: "Keep track of the products you love and move them to cart anytime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = wishlist.map((id) => productById(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader title="Your Wishlist" subtitle={`${items.length} saved item${items.length === 1 ? "" : "s"}`} />
      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          hint="Tap the heart on any product to save it for later."
          action={
            <Button asChild>
              <Link to="/shop">Browse products</Link>
            </Button>
          }
        />
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
