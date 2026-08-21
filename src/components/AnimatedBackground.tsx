import { useMemo } from "react";

/**
 * Site-wide animated background: drifting gradient blobs, an animated gradient
 * mesh, light waves and slow floating particles. Purely decorative and
 * GPU-composited (transform/opacity only). Motion is disabled globally for
 * users with prefers-reduced-motion.
 */
export function AnimatedBackground() {
  const dots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: (i * 37) % 100,
        size: 2 + (i % 4),
        delay: (i % 13) * 2.2,
        duration: 26 + (i % 7) * 5,
        tone: i % 3,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* gradient mesh */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(45% 40% at 12% 18%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%), radial-gradient(40% 38% at 85% 12%, color-mix(in oklab, var(--violet) 24%, transparent), transparent 70%), radial-gradient(45% 45% at 70% 85%, color-mix(in oklab, var(--cyan) 16%, transparent), transparent 72%)",
        }}
      />

      {/* drifting blobs */}
      <div
        className="animate-blob absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full blur-[110px] opacity-40"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 70%, transparent), transparent 65%)" }}
      />
      <div
        className="animate-blob absolute right-[-14rem] top-[18%] h-[38rem] w-[38rem] rounded-full blur-[120px] opacity-35"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--violet) 70%, transparent), transparent 65%)",
          animationDelay: "-11s",
        }}
      />
      <div
        className="animate-blob absolute bottom-[-16rem] left-[28%] h-[34rem] w-[34rem] rounded-full blur-[120px] opacity-25"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--cyan) 60%, transparent), transparent 65%)",
          animationDelay: "-22s",
        }}
      />

      {/* glowing orbs */}
      <div className="animate-soft-pulse absolute left-[18%] top-[30%] h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
      <div
        className="animate-soft-pulse absolute right-[22%] top-[62%] h-32 w-32 rounded-full bg-violet/20 blur-2xl"
        style={{ animationDelay: "-3s" }}
      />

      {/* light waves */}
      <div
        className="animate-wave absolute inset-x-0 top-1/3 h-64 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 0%, color-mix(in oklab, var(--cyan) 55%, transparent) 25%, transparent 50%, color-mix(in oklab, var(--primary) 45%, transparent) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          filter: "blur(46px)",
        }}
      />

      {/* floating particles */}
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-dot absolute bottom-[-6vh] rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `-${d.delay}s`,
            animationDuration: `${d.duration}s`,
            background:
              d.tone === 0
                ? "color-mix(in oklab, var(--primary) 85%, transparent)"
                : d.tone === 1
                  ? "color-mix(in oklab, var(--violet) 85%, transparent)"
                  : "color-mix(in oklab, var(--cyan) 85%, transparent)",
            boxShadow: "0 0 10px currentColor",
          }}
        />
      ))}

      {/* subtle grain / vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent,oklch(0.12_0.02_265/0.75))]" />
    </div>
  );
}
