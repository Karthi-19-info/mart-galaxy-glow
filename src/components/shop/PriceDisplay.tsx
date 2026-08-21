import { cn } from "@/lib/utils";
import { inr } from "@/lib/format";
import { discountPercent } from "@/data/catalog";

export function PriceDisplay({
  price,
  mrp,
  size = "md",
  className,
}: {
  price: number;
  mrp: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const off = discountPercent({ price, mrp });
  const priceClass = size === "lg" ? "text-3xl" : size === "md" ? "text-lg" : "text-base";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-display font-bold text-foreground", priceClass)}>{inr(price)}</span>
      {mrp > price && (
        <>
          <span className="text-sm text-muted-foreground line-through">{inr(mrp)}</span>
          <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-xs font-semibold text-success">
            {off}% off
          </span>
        </>
      )}
    </div>
  );
}
