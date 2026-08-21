import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" as const },
      { label: "Categories", to: "/categories" as const },
      { label: "Deals", to: "/deals" as const },
      { label: "New Arrivals", to: "/new-arrivals" as const },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact Us", to: "/support" as const, search: { topic: "contact" } },
      { label: "FAQ", to: "/support" as const, search: { topic: "faq" } },
      { label: "Shipping", to: "/support" as const, search: { topic: "shipping" } },
      { label: "Returns", to: "/support" as const, search: { topic: "returns" } },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/company" as const, search: { topic: "about" } },
      { label: "Careers", to: "/company" as const, search: { topic: "careers" } },
      { label: "Privacy Policy", to: "/company" as const, search: { topic: "privacy" } },
      { label: "Terms & Conditions", to: "/company" as const, search: { topic: "terms" } },
    ],
  },
];

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "YouTube", Icon: Youtube },
  { label: "X", Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background/60 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-base font-bold">
              KARTHICK <span className="text-gradient">MART</span>
            </span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Smart Shopping. Better Living. Quality groceries, electronics, fashion and home essentials
            delivered across India.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="space-y-3">
            <h2 className="font-display text-sm font-semibold">{col.title}</h2>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    search={"search" in l ? (l.search as never) : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="space-y-3">
          <h2 className="font-display text-sm font-semibold">Follow Us</h2>
          <div className="flex flex-wrap gap-2">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-xl border border-border bg-secondary/60 text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © 2026 Karthick Mart. All rights reserved.
      </div>
    </footer>
  );
}
