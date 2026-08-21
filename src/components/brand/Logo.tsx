import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-glow",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-6" role="img" aria-label="Karthick Mart logo">
        <path
          d="M6 9h3.2l2.1 11.6a2 2 0 0 0 2 1.6h9.9"
          fill="none"
          stroke="oklch(0.16 0.02 265)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7v9M12 12l3.6-4M12 12l3.6 4M20 7v9M20 7l2.6 5 2.6-5v9"
          fill="none"
          stroke="oklch(0.16 0.02 265)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="26" r="1.9" fill="oklch(0.16 0.02 265)" />
        <circle cx="22.5" cy="26" r="1.9" fill="oklch(0.16 0.02 265)" />
      </svg>
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Karthick Mart home">
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className={compact ? "sr-only" : "leading-tight"}>
        <span className="block font-display text-base font-bold tracking-tight">
          KARTHICK <span className="text-gradient">MART</span>
        </span>
        <span className="hidden text-[11px] text-muted-foreground sm:block">
          Smart Shopping. Better Living.
        </span>
      </span>
    </Link>
  );
}
