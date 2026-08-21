import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-16 text-center">
      <span className="animate-soft-pulse grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-7" />
      </span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {hint && <p className="max-w-sm text-sm text-muted-foreground">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
