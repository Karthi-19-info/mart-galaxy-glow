import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Countdown } from "@/components/shop/Countdown";
import { dealProducts } from "@/data/catalog";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Today's Best Deals — Karthick Mart" },
      {
        name: "description",
        content:
          "Limited-time price drops on earbuds, groceries, cookware, footwear and skincare at Karthick Mart. Up to 62% off.",
      },
      { property: "og:title", content: "Today's Best Deals — Karthick Mart" },
      { property: "og:description", content: "Up to 62% off, refreshed every morning." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  const deals = dealProducts();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader title="Today's Best Deals" subtitle="Genuine discounts on products our shoppers keep re-ordering.">
        <div className="glass mt-4 inline-flex flex-wrap items-center gap-4 rounded-2xl px-4 py-3">
          <Countdown hours={4} />
          <span className="text-xs text-muted-foreground">Prices revert once the timer ends.</span>
        </div>
      </PageHeader>
      <ProductGrid products={deals} emptyTitle="No live deals right now" />
    </div>
  );
}
