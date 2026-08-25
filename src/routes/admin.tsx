import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, IndianRupee, Package, ShoppingBag, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shop/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders, products } from "@/data/catalog";
import { formatDate, inr, inrCompact } from "@/lib/format";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Karthick Mart" },
      { name: "description", content: "Karthick Mart store analytics: revenue, orders, customers and inventory health." },
      { property: "og:title", content: "Admin Dashboard — Karthick Mart" },
      { property: "og:description", content: "Internal analytics for the Karthick Mart storefront." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user } = useShop();

  if (user?.role !== "admin") {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={ShieldAlert}
          title="Admin access required"
          hint="Sign in with an admin@ email address to open the dashboard."
          action={
            <Button asChild>
              <Link to="/login">Sign in as admin</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const customers = new Set(orders.map((o) => o.email)).size;
  const lowStock = products.filter((p) => p.stock <= p.minStock);

  const stats = [
    { Icon: IndianRupee, label: "Revenue", value: inrCompact(revenue) },
    { Icon: ShoppingBag, label: "Orders", value: String(orders.length) },
    { Icon: Users, label: "Customers", value: String(customers) },
    { Icon: Package, label: "Low stock", value: String(lowStock.length) },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <PageHeader title="Admin Dashboard" subtitle="Live snapshot of store performance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, label, value }) => (
          <div key={label} className="glass card-hover flex items-center gap-3 rounded-2xl p-4">
            <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold">{value}</span>
              <span className="block text-xs text-muted-foreground">{label}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="glass mt-8 overflow-x-auto rounded-2xl p-4">
        <h2 className="mb-3 font-display text-base font-semibold">Recent orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.id}</TableCell>
                <TableCell>{formatDate(o.date)}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.city}</TableCell>
                <TableCell className="text-primary">{o.status}</TableCell>
                <TableCell className="text-right">{inr(o.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {lowStock.length > 0 && (
        <div className="glass mt-6 rounded-2xl p-4">
          <h2 className="mb-3 font-display text-base font-semibold">Inventory alerts</h2>
          <ul className="space-y-2">
            {lowStock.map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span className="truncate pr-3">{p.name}</span>
                <span className="text-warning">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
