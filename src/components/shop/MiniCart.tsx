import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductImage } from "@/components/shop/ProductImage";
import { inr } from "@/lib/format";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, useShop } from "@/lib/shop-store";

export function MiniCart() {
  const { cartOpen, setCartOpen, cartLines, cartCount, setQty, removeFromCart } = useShop();

  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const toFreeDelivery = Math.max(FREE_DELIVERY_OVER - subtotal, 0);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="font-display flex items-center gap-2 text-lg">
            <ShoppingBag className="size-4 text-primary" />
            Your cart
          </SheetTitle>
          <SheetDescription>
            {cartCount === 0
              ? "Nothing here yet — add something you love."
              : `${cartCount} item${cartCount === 1 ? "" : "s"} · prices in ₹`}
          </SheetDescription>
        </SheetHeader>

        {cartLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="glass grid size-14 place-items-center rounded-2xl">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Button asChild onClick={() => setCartOpen(false)}>
              <Link to="/shop">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="space-y-3 px-5 py-4">
                {cartLines.map(({ product, qty }) => (
                  <li key={product.id} className="glass flex gap-3 rounded-2xl p-3">
                    <ProductImage product={product} className="size-16 shrink-0" iconClassName="size-5" />
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setCartOpen(false)}
                        className="line-clamp-2 text-sm font-semibold hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            className="size-7"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => setQty(product.id, qty - 1)}
                          >
                            <Minus className="size-3" />
                          </Button>
                          <span className="w-7 text-center text-sm font-medium">{qty}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="size-7"
                            aria-label={`Increase quantity of ${product.name}`}
                            disabled={qty >= product.stock}
                            onClick={() => setQty(product.id, qty + 1)}
                          >
                            <Plus className="size-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-7"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        </div>
                        <span className="text-sm font-semibold">{inr(product.price * qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <SheetFooter className="glass mt-auto flex-col gap-3 rounded-none border-t p-5 sm:flex-col sm:space-x-0">
              {toFreeDelivery > 0 && (
                <p className="text-xs text-muted-foreground">
                  Add {inr(toFreeDelivery)} more for free delivery.
                </p>
              )}
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{inr(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{delivery === 0 ? "Free" : inr(delivery)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-display text-base font-semibold">
                  <span>Total</span>
                  <span>{inr(subtotal + delivery)}</span>
                </div>
              </div>
              <div className="grid w-full gap-2">
                <Button
                  asChild
                  className="w-full bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90"
                  onClick={() => setCartOpen(false)}
                >
                  <Link to="/checkout">Checkout · {inr(subtotal + delivery)}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                  <Link to="/cart">View full cart</Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
