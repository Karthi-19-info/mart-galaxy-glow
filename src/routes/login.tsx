import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Karthick Mart" },
      { name: "description", content: "Sign in to your Karthick Mart account to track orders, save wishlists and checkout faster." },
      { property: "og:title", content: "Sign In — Karthick Mart" },
      { property: "og:description", content: "Access your orders, wishlist and saved addresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useShop();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
      <PageHeader title="Welcome back" subtitle="Sign in with your email to continue." />
      <form
        className="glass space-y-4 rounded-2xl p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          signIn(email);
          navigate({ to: "/account", search: { tab: "profile" } });
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.in"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90">
          Sign in
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          New here?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
