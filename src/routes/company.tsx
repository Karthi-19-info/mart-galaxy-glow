import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";

type CompanySearch = { topic?: string | undefined };

const topics: Record<string, { title: string; body: string[] }> = {
  about: {
    title: "About Karthick Mart",
    body: [
      "Founded in Chennai in 2019, Karthick Mart brings honest pricing to everyday Indian households.",
      "We stock 30+ curated products across groceries, electronics, fashion, home, beauty and sports.",
      "Smart Shopping. Better Living. — that promise drives every listing we approve.",
    ],
  },
  careers: {
    title: "Careers",
    body: [
      "We hire in Chennai, Bengaluru and remote across India.",
      "Open roles: category manager, warehouse lead, frontend engineer.",
      "Write to careers@karthickmart.in with your resume and a short note.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the details needed to deliver your order and process payments.",
      "We never sell your personal data to third parties.",
      "You may request deletion of your account data at any time by emailing us.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "Prices are in Indian Rupees and inclusive of applicable taxes.",
      "Offers and coupons may be withdrawn without prior notice.",
      "Disputes are subject to the jurisdiction of courts in Chennai, Tamil Nadu.",
    ],
  },
};

export const Route = createFileRoute("/company")({
  validateSearch: (search: Record<string, unknown>): CompanySearch => ({
    topic: typeof search["topic"] === "string" ? search["topic"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Company — About Karthick Mart" },
      { name: "description", content: "Learn about Karthick Mart, our careers, privacy policy and terms of use." },
      { property: "og:title", content: "Company — About Karthick Mart" },
      { property: "og:description", content: "Our story, our team and the policies behind the store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  const { topic } = Route.useSearch();
  const active = topics[topic ?? ""] ?? topics["about"]!;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <PageHeader title="Company" subtitle="Smart Shopping. Better Living." />
      <div className="glass space-y-3 rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">{active.title}</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {active.body.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
