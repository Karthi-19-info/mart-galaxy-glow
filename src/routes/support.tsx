import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";

type SupportSearch = { topic?: string };

const topics: Record<string, { title: string; body: string[] }> = {
  contact: {
    title: "Contact Us",
    body: [
      "Customer care: 1800 200 4567 (9am–9pm IST, all days).",
      "Email: care@karthickmart.in — we reply within 6 working hours.",
      "Head office: 12, Anna Salai, Chennai 600002, Tamil Nadu.",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    body: [
      "Do you deliver everywhere in India? Yes, to 19,000+ PIN codes.",
      "Is cash on delivery available? Yes, for orders up to ₹20,000.",
      "Can I change my address after ordering? Yes, until the order ships.",
    ],
  },
  shipping: {
    title: "Shipping",
    body: [
      "Free delivery on orders above ₹999; ₹79 flat otherwise.",
      "Metro cities: same-day dispatch, delivery in 24–48 hours.",
      "Rest of India: delivery in 3–5 working days.",
    ],
  },
  returns: {
    title: "Returns & Refunds",
    body: [
      "7-day easy returns on most categories, doorstep pickup included.",
      "Groceries and personal care are returnable only if damaged or expired.",
      "Refunds land in your original payment method within 3–5 working days.",
    ],
  },
};

export const Route = createFileRoute("/support")({
  validateSearch: (search: Record<string, unknown>): SupportSearch => ({
    topic: typeof search["topic"] === "string" ? search["topic"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Customer Support — Karthick Mart" },
      { name: "description", content: "Contact Karthick Mart care, read FAQs, and check shipping, returns and refund policies." },
      { property: "og:title", content: "Customer Support — Karthick Mart" },
      { property: "og:description", content: "Help with orders, delivery, returns and refunds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const { topic } = Route.useSearch();
  const active = (topic && topics[topic]) ?? topics["contact"]!;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <PageHeader title="Customer Support" subtitle="We are here for every order, every day." />
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
