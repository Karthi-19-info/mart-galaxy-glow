import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, User, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SearchBar } from "@/components/shop/SearchBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useShop } from "@/lib/shop-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/new-arrivals", label: "New Arrivals" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, user, signOut } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm bg-background/95 backdrop-blur-xl">
            <SheetTitle className="sr-only">Karthick Mart navigation</SheetTitle>
            <div className="space-y-6 p-5">
              <Logo />
              <SearchBar />
              <nav className="grid gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-accent/60"
                    activeProps={{ className: "bg-accent/70 text-primary" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent/60"
                >
                  Wishlist ({wishlist.length})
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent/60"
                >
                  Cart ({cartCount})
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-accent/60"
                >
                  {user ? "My Account" : "Login / Register"}
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground"
              activeProps={{ className: "text-primary bg-accent/50" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-md flex-1 xl:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 xl:ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="size-5" />
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label={`Wishlist, ${wishlist.length} items`}>
            <Link to="/wishlist" className="relative">
              <Heart className="size-5" />
              {wishlist.length > 0 && <Badge count={wishlist.length} />}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label={`Cart, ${cartCount} items`}>
            <Link to="/cart" className="relative">
              <ShoppingCart className="size-5" />
              {cartCount > 0 && <Badge count={cartCount} />}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account menu">
                <User className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user ? user.name : "Welcome to Karthick Mart"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" search={{ tab: "orders" }}>
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <LayoutDashboard className="size-4" /> Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="size-4" /> Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">Create account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background/80 px-4 py-3 backdrop-blur-xl xl:hidden">
          <SearchBar autoFocus />
        </div>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-gradient-brand px-1 text-[10px] font-bold leading-4 text-primary-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}
