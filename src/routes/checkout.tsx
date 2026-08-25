import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { inr } from "@/lib/format";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Karthick Mart" },
      { name: "description", content: "Enter your delivery address and pay by UPI, card or cash on delivery at Karthick Mart." },
      { property: "og:title", content: "Secure Checkout — Karthick Mart" },
      { property: "og:description", content: "Fast, secure checkout with UPI, cards, net banking and cash on delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Address", "Payment", "Review"] as const;

function CheckoutPage() {
  const { cartLines, clearCart } = useShop();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("UPI");
  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 79;

  const placeOrder = () => {
    clearCart();
    toast.success("Order placed ✓", { description: "You will receive delivery updates on WhatsApp." });
    setStep(3);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader title="Checkout" subtitle="Free delivery on orders over ₹999" />

      <ol className="mb-8 flex flex-wrap gap-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`glass flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
              i <= step ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {i < step ? <Check className="size-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
            {s}
          </li>
        ))}
      </ol>

      {step === 3 ? (
        <div className="glass space-y-4 rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold">Thank you for your order!</h2>
          <p className="text-sm text-muted-foreground">Your Karthick Mart order is confirmed and will ship within 24 hours.</p>
          <Button asChild className="bg-gradient-brand text-primary-foreground hover:opacity-90">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="glass space-y-4 rounded-2xl p-5">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full name" placeholder="Karthick R" />
                <Field id="phone" label="Phone" placeholder="+91 98400 00000" />
                <Field id="address" label="Address" placeholder="12, Anna Salai" />
                <Field id="city" label="City" placeholder="Chennai" />
                <Field id="state" label="State" placeholder="Tamil Nadu" />
                <Field id="pincode" label="PIN code" placeholder="600002" />
              </div>
            )}

            {step === 1 && (
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
                {["UPI", "Card", "Net Banking", "Cash on Delivery"].map((m) => (
                  <div key={m} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <RadioGroupItem value={m} id={`pay-${m}`} />
                    <Label htmlFor={`pay-${m}`} className="cursor-pointer text-sm font-normal">
                      {m}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {step === 2 && (
              <ul className="space-y-2">
                {cartLines.map(({ product, qty }) => (
                  <li key={product.id} className="flex justify-between text-sm">
                    <span className="truncate pr-3">
                      {product.name} × {qty}
                    </span>
                    <span>{inr(product.price * qty)}</span>
                  </li>
                ))}
                <li className="pt-2 text-sm text-muted-foreground">Paying with {payment}</li>
              </ul>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
              {step < 2 ? (
                <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
              ) : (
                <Button
                  className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90"
                  disabled={cartLines.length === 0}
                  onClick={placeOrder}
                >
                  Place order
                </Button>
              )}
            </div>
          </div>

          <aside className="glass h-fit space-y-3 rounded-2xl p-5">
            <h2 className="font-display text-base font-semibold">Summary</h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : inr(shipping)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-display font-semibold">
              <span>Total</span>
              <span>{inr(subtotal + shipping)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ id, label, placeholder }: { id: string; label: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} />
    </div>
  );
}
