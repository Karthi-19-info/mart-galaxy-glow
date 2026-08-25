import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { brands, categories, categoryCount } from "@/data/catalog";
import { inr } from "@/lib/format";
import { RotateCcw } from "lucide-react";

export type ShopFilters = {
  category: string[];
  brand: string[];
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  inStockOnly: boolean;
};

export const PRICE_CEILING = 30000;

export const defaultFilters: ShopFilters = {
  category: [],
  brand: [],
  maxPrice: PRICE_CEILING,
  minRating: 0,
  minDiscount: 0,
  inStockOnly: false,
};

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: ShopFilters;
  onChange: (patch: Partial<ShopFilters>) => void;
  onReset: () => void;
}) {
  const toggle = (key: "category" | "brand", value: string) => {
    const list = filters[key];
    onChange({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] } as Partial<ShopFilters>);
  };

  return (
    <aside className="glass space-y-5 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="size-3.5" /> Reset
        </Button>
      </div>

      <Group title="Category">
        <div className="space-y-2">
          {categories.map((c) => (
            <div key={c.slug} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${c.slug}`}
                checked={filters.category.includes(c.slug)}
                onCheckedChange={() => toggle("category", c.slug)}
              />
              <Label htmlFor={`cat-${c.slug}`} className="flex-1 cursor-pointer text-sm font-normal">
                {c.name}
              </Label>
              <span className="text-xs text-muted-foreground">{categoryCount(c.slug)}</span>
            </div>
          ))}
        </div>
      </Group>

      <Separator />

      <Group title="Brand">
        <div className="space-y-2">
          {brands.map((b) => (
            <div key={b} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${b}`}
                checked={filters.brand.includes(b)}
                onCheckedChange={() => toggle("brand", b)}
              />
              <Label htmlFor={`brand-${b}`} className="cursor-pointer text-sm font-normal">
                {b}
              </Label>
            </div>
          ))}
        </div>
      </Group>

      <Separator />

      <Group title="Max price">
        <Slider
          value={[filters.maxPrice]}
          min={500}
          max={PRICE_CEILING}
          step={500}
          onValueChange={([v]) => onChange({ maxPrice: v ?? PRICE_CEILING })}
          aria-label="Maximum price"
        />
        <p className="text-sm text-muted-foreground">Up to {inr(filters.maxPrice)}</p>
      </Group>

      <Separator />

      <Group title="Rating">
        <div className="flex flex-wrap gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <Button
              key={r}
              size="sm"
              variant={filters.minRating === r ? "default" : "outline"}
              onClick={() => onChange({ minRating: r })}
            >
              {r === 0 ? "Any" : `${r}★ & up`}
            </Button>
          ))}
        </div>
      </Group>

      <Group title="Discount">
        <div className="flex flex-wrap gap-2">
          {[0, 10, 25, 40].map((d) => (
            <Button
              key={d}
              size="sm"
              variant={filters.minDiscount === d ? "default" : "outline"}
              onClick={() => onChange({ minDiscount: d })}
            >
              {d === 0 ? "Any" : `${d}%+`}
            </Button>
          ))}
        </div>
      </Group>

      <Separator />

      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStockOnly}
          onCheckedChange={(v) => onChange({ inStockOnly: Boolean(v) })}
        />
        <Label htmlFor="in-stock" className="cursor-pointer text-sm font-normal">
          In stock only
        </Label>
      </div>
    </aside>
  );
}
