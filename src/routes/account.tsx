import { createFileRoute, Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shop/EmptyState";
import { orders } from "@/data/catalog";
import { formatDate, inr } from "@/lib/format";
import { useShop } from "@/lib/shop-store";

type AccountSearch = { tab?: string };

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): AccountSearch => ({
    tab: typeof search["tab"] === "string" ? search["tab"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "My Account — Karthick Mart" },
      { name: "description", content: "Manage your Karthick Mart profile, track orders and review saved addresses." },
      { property: "og:title", content: "My Account — Karthick Mart" },
      { property: "og:description", content: "Your profile, orders and delivery addresses in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { tab } = Route.useSearch();
  const { user } = useShop();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={UserRound}
          title="Sign in to view your account"
          hint="Your orders, addresses and profile live here once you sign in."
          action={
            <Button asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const myOrders = orders.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <PageHeader title={`Hello, ${user.name}`} subtitle={user.email} />

      <Tabs defaultValue={tab === "orders" ? "orders" : "profile"}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <dl className="glass grid gap-4 rounded-2xl p-5 sm:grid-cols-2">
            {[
              ["Name", user.name],
              ["Email", user.email],
              ["Phone", user.phone],
              ["Role", user.role],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium capitalize">{value}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <ul className="space-y-3">
            {myOrders.map((o) => (
              <li key={o.id} className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
                <div>
                  <p className="font-display text-sm font-semibold">{o.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(o.date)} · {o.items.length} item{o.items.length === 1 ? "" : "s"} · {o.payment}
                  </p>
                </div>
                <span className="text-xs font-medium text-primary">{o.status}</span>
                <span className="text-sm font-semibold">{inr(o.total)}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
