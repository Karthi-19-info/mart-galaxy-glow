import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Counts down to a rolling deadline `hours` from the first client render. */
export function Countdown({ hours = 5, label = "Deal ends in" }: { hours?: number; label?: string }) {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState(hours * 3600);

  useEffect(() => {
    const end = Date.now() + hours * 3600 * 1000;
    setDeadline(end);
  }, [hours]);

  useEffect(() => {
    if (!deadline) return;
    const tick = () => setLeft(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1 font-display font-semibold tabular-nums">
        {[pad(h), pad(m), pad(s)].map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-primary">:</span>}
            <span className="rounded-md border border-border bg-secondary/70 px-2 py-1">{part}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
