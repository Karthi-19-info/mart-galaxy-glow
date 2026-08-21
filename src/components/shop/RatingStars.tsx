import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCount } from "@/lib/format";

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "sm" ? "size-3.5" : "size-4";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(px, i <= Math.round(rating) ? "fill-warning text-warning" : "text-muted-foreground/40")}
          />
        ))}
      </span>
      <span className="text-xs font-medium text-foreground/80">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({formatCount(reviewCount)})</span>
      )}
      <span className="sr-only">
        Rated {rating} out of 5{reviewCount !== undefined ? ` from ${reviewCount} reviews` : ""}
      </span>
    </div>
  );
}
