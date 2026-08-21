import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Clock, Flame, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { products } from "@/data/catalog";
import { searchProducts } from "@/lib/search";
import { ProductImage } from "./ProductImage";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";

const RECENT_KEY = "km.recentSearches.v1";
const POPULAR = ["Earbuds", "Basmati rice", "Running shoes", "Pressure cooker", "Sunscreen"];

export function SearchBar({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(term.trim()), 250);
    return () => clearTimeout(id);
  }, [term]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const suggestions = useMemo(
    () => (debounced.length >= 2 ? searchProducts(products, debounced).slice(0, 6) : []),
    [debounced],
  );

  const remember = (value: string) => {
    const next = [value, ...recent.filter((r) => r.toLowerCase() !== value.toLowerCase())].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const submit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    remember(q);
    setOpen(false);
    navigate({ to: "/shop", search: { q } });
  };

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit(term);
        }}
      >
        <label htmlFor="km-search" className="sr-only">
          Search products
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="km-search"
          autoFocus={autoFocus}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search products, brands and categories…"
          className="h-11 rounded-xl border-border bg-secondary/60 pl-9 pr-9 backdrop-blur"
          autoComplete="off"
        />
        {term && (
          <button
            type="button"
            onClick={() => setTerm("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {open && (
        <div className="glass absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[26rem] overflow-y-auto rounded-2xl p-2 shadow-card">
          {debounced.length >= 2 ? (
            suggestions.length > 0 ? (
              <ul className="space-y-1">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        remember(p.name);
                        setOpen(false);
                        navigate({ to: "/product/$slug", params: { slug: p.slug } });
                      }}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-accent/60"
                    >
                      <ProductImage product={p} className="size-11 shrink-0" iconClassName="size-5" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {p.brand} · {inr(p.price)}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => submit(term)}
                    className="w-full rounded-xl p-2 text-sm font-medium text-primary hover:bg-accent/60"
                  >
                    See all results for “{debounced}”
                  </button>
                </li>
              </ul>
            ) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No matches for “{debounced}”. Try a brand or category name.
              </p>
            )
          ) : (
            <div className="space-y-3 p-2">
              {recent.length > 0 && (
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Clock className="size-3.5" /> Recent searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => submit(r)}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs hover:border-primary/50"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Flame className="size-3.5" /> Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => submit(r)}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs hover:border-primary/50"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
