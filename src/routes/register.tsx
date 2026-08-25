import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — Karthick Mart" },
      { name: "description", content: "Create a free Karthick Mart account for faster checkout, order tracking and wishlists." },
      { property: "og:title", content: "Create Account — Karthick Mart" },
      { property: "og:description", content: "Join Karthick Mart in under a minute." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { signIn } = useShop();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <PageHeader title="Create your account" subtitle="Smart Shopping. Better Living." />
      <form
        className="glass space-y-4 rounded-2xl p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          signIn(email, name);
          navigate({ to: "/account", search: { tab: "profile" } });
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Full name</Label>
          <Input id="reg-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Karthick R" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.in"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reg-password">Password</Label>
          <Input id="reg-password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90">
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
