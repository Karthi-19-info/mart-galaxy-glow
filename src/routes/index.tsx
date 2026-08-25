import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, BadgeIndianRupee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductImage } from "@/components/shop/ProductImage";
import { PriceDisplay } from "@/components/shop/PriceDisplay";
import { Countdown } from "@/components/shop/Countdown";
import { categories, bestSellers, dealProducts, newArrivals, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Karthick Mart — Everything You Need. All in One Mart." },
      {
        name: "description",
        content:
          "Shop groceries, electronics, fashion, home & kitchen, beauty and sports at Karthick Mart. Daily deals, fast delivery and prices in ₹.",
      },
      { property: "og:title", content: "Karthick Mart — Everything You Need. All in One Mart." },
      {
        property: "og:description",
        content: "Discover quality products, amazing deals, and effortless shopping at Karthick Mart.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { Icon: Truck, title: "Free delivery over ₹999", copy: "Same-day dispatch in metro cities" },
  { Icon: RotateCcw, title: "7-day easy returns", copy: "No-questions pickup from your door" },
  { Icon: ShieldCheck, title: "100% secure payments", copy: "UPI, cards and net banking" },
  { Icon: BadgeIndianRupee, title: "Best price promise", copy: "Extra 10% off with KMWELCOME" },
];

function Home() {
  const deals = dealProducts().slice(0, 4);
  const floats = products.slice(0, 3) as [typeof products[number], typeof products[number], typeof products[number]];

  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
        <div className="space-y-7">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/85">
            <Sparkles className="size-3.5 text-primary" />
            30+ curated products across 8 categories
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Everything You Need.
            <br />
            <span className="text-gradient">All in One Mart.</span>
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Discover quality products, amazing deals, and effortless shopping at Karthick Mart.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/shop" search={{}}>
                Shop Now <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/deals">Explore Deals</Link>
            </Button>
          </div>
          <dl className="grid max-w-lg grid-cols-3 gap-4 pt-2">
            {[
              ["4.6★", "Average rating"],
              ["48 hrs", "Delivery promise"],
              ["₹0", "Return charges"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-xl font-bold text-foreground">{k}</dt>
                <dd className="text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* animated hero visual */}
        <div className="relative mx-auto h-[24rem] w-full max-w-md sm:h-[28rem]">
          <div className="animate-spin-slow absolute inset-6 rounded-full border border-dashed border-primary/25" />
          <div className="animate-soft-pulse absolute inset-12 rounded-full bg-primary/10 blur-2xl" />
          <div className="animate-float-y glass absolute left-0 top-6 w-44 rounded-2xl p-3 shadow-card">
            <ProductImage product={floats[0]} className="aspect-square w-full" iconClassName="size-9" />
            <p className="mt-2 line-clamp-1 text-xs font-semibold">{floats[0].name}</p>
            <PriceDisplay price={floats[0].price} mrp={floats[0].mrp} size="sm" />
          </div>
          <div
            className="animate-float-y glass absolute bottom-4 right-0 w-44 rounded-2xl p-3 shadow-card"
            style={{ animationDelay: "-2s" }}
          >
            <ProductImage product={floats[1]} className="aspect-square w-full" iconClassName="size-9" />
            <p className="mt-2 line-clamp-1 text-xs font-semibold">{floats[1].name}</p>
            <PriceDisplay price={floats[1].price} mrp={floats[1].mrp} size="sm" />
          </div>
          <div
            className="animate-float-y glass absolute right-8 top-0 rounded-2xl px-4 py-3 text-sm font-semibold shadow-glow"
            style={{ animationDelay: "-4s" }}
          >
            Up to 62% off
          </div>
          <div
            className="animate-float-y glass absolute bottom-24 left-2 rounded-2xl px-4 py-3 text-xs shadow-card"
            style={{ animationDelay: "-1s" }}
          >
            <span className="block font-semibold">Added to cart ✓</span>
            <span className="text-muted-foreground">{floats[2].name.slice(0, 22)}…</span>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ Icon, title, copy }) => (
            <div key={title} className="glass card-hover flex items-start gap-3 rounded-2xl p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="block text-xs text-muted-foreground">{copy}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Shop by category"
          title="Eight aisles, one smart mart"
          subtitle="From daily groceries to the latest gadgets — everything curated for Indian homes."
          action={
            <Button asChild variant="outline">
              <Link to="/categories">
                All categories <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* DEALS */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="Limited time"
          title="Today's Best Deals"
          subtitle="Hand-picked price drops, refreshed every morning."
          action={<Countdown hours={4} />}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/deals">
              See all deals <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading eyebrow="Loved by shoppers" title="Bestsellers this week" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {bestSellers().slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-4 sm:px-6">
        <SectionHeading
          eyebrow="Fresh in store"
          title="New Arrivals"
          action={
            <Button asChild variant="outline">
              <Link to="/new-arrivals">
                View all <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {newArrivals().slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
