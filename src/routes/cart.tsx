import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shop/EmptyState";
import { ProductImage } from "@/components/shop/ProductImage";
import { inr } from "@/lib/format";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Karthick Mart" },
      { name: "description", content: "Review items in your Karthick Mart cart and continue to secure checkout." },
      { property: "og:title", content: "Your Cart — Karthick Mart" },
      { property: "og:description", content: "Review your items, update quantities and checkout in ₹." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, setQty, removeFromCart, clearCart } = useShop();
  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader title="Your Cart" subtitle={`${cartLines.length} item${cartLines.length === 1 ? "" : "s"} · prices in ₹`} />

      {cartLines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          hint="Add products you love and they will show up here."
          action={
            <Button asChild>
              <Link to="/shop">Start shopping</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-3">
            {cartLines.map(({ product, qty }) => (
              <li key={product.id} className="glass flex gap-4 rounded-2xl p-3">
                <ProductImage product={product} className="size-24 shrink-0" iconClassName="size-7" />
                <div className="min-w-0 flex-1 space-y-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="line-clamp-2 text-sm font-semibold hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="text-sm font-semibold">{inr(product.price)}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <Button size="icon" variant="outline" className="size-8" aria-label="Decrease quantity" onClick={() => setQty(product.id, qty - 1)}>
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <Button size="icon" variant="outline" className="size-8" aria-label="Increase quantity" onClick={() => setQty(product.id, qty + 1)}>
                      <Plus className="size-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(product.id)}>
                      <Trash2 className="size-3.5" /> Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
            <li>
              <Button variant="ghost" onClick={clearCart}>
                Clear cart
              </Button>
            </li>
          </ul>

          <aside className="glass h-fit space-y-3 rounded-2xl p-5">
            <h2 className="font-display text-base font-semibold">Order summary</h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-display text-base font-semibold">
              <span>Total</span>
              <span>{inr(subtotal + shipping)}</span>
            </div>
            <Button asChild className="w-full bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
