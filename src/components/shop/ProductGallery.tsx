import { useState } from "react";
import { ProductImage } from "./ProductImage";
import type { Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

const VIEWS = [0, 1, 2, 3];

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <ProductImage
        product={product}
        view={active}
        className="aspect-square w-full shadow-card transition-[background] duration-500"
        iconClassName="size-20"
      />
      <div className="grid grid-cols-4 gap-3">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setActive(v)}
            aria-label={`View ${v + 1} of ${product.name}`}
            aria-current={active === v}
            className={cn(
              "rounded-xl p-0.5 transition-all",
              active === v
                ? "ring-2 ring-primary shadow-glow"
                : "ring-1 ring-border opacity-70 hover:opacity-100",
            )}
          >
            <ProductImage
              product={product}
              view={v}
              className="aspect-square w-full"
              iconClassName="size-6"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
