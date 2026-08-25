import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/catalog";

export type CartLine = { productId: string; qty: number };

export type AppUser = {
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
};

type ShopState = {
  ready: boolean;
  cart: CartLine[];
  wishlist: string[];
  user: AppUser | null;
  coupon: string | null;
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  moveToCart: (productId: string) => void;
  applyCoupon: (code: string | null) => void;
  signIn: (email: string, name?: string) => AppUser;
  signOut: () => void;
  updateUser: (patch: Partial<AppUser>) => void;
  cartCount: number;
  cartLines: { product: Product; qty: number }[];
};

const ShopContext = createContext<ShopState | null>(null);

const KEY = "km.shop.v1";

type Persisted = {
  cart: CartLine[];
  wishlist: string[];
  user: AppUser | null;
  coupon: string | null;
};

const empty: Persisted = { cart: [], wishlist: [], user: null, coupon: null };

function read(): Persisted {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      user: parsed.user ?? null,
      coupon: parsed.coupon ?? null,
    };
  } catch {
    return empty;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [state, ready]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    const product = products.find((p) => p.id === productId);
    setState((prev) => {
      const existing = prev.cart.find((l) => l.productId === productId);
      const cart = existing
        ? prev.cart.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
        : [...prev.cart, { productId, qty }];
      return { ...prev, cart };
    });
    toast.success("Added to cart ✓", { description: product?.name });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setState((prev) => ({ ...prev, cart: prev.cart.filter((l) => l.productId !== productId) }));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setState((prev) => ({
      ...prev,
      cart:
        qty <= 0
          ? prev.cart.filter((l) => l.productId !== productId)
          : prev.cart.map((l) => (l.productId === productId ? { ...l, qty } : l)),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, cart: [], coupon: null }));
    toast("Cart cleared");
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    const product = products.find((p) => p.id === productId);
    setState((prev) => {
      const has = prev.wishlist.includes(productId);
      if (has) toast("Removed from wishlist", { description: product?.name });
      else toast.success("Added to wishlist ♡", { description: product?.name });
      return {
        ...prev,
        wishlist: has ? prev.wishlist.filter((x) => x !== productId) : [...prev.wishlist, productId],
      };
    });
  }, []);

  const moveToCart = useCallback(
    (productId: string) => {
      setState((prev) => {
        const existing = prev.cart.find((l) => l.productId === productId);
        return {
          ...prev,
          wishlist: prev.wishlist.filter((x) => x !== productId),
          cart: existing
            ? prev.cart.map((l) => (l.productId === productId ? { ...l, qty: l.qty + 1 } : l))
            : [...prev.cart, { productId, qty: 1 }],
        };
      });
      toast.success("Moved to cart ✓");
    },
    [],
  );

  const applyCoupon = useCallback((code: string | null) => {
    setState((prev) => ({ ...prev, coupon: code }));
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const isAdmin = email.trim().toLowerCase().startsWith("admin@");
    const user: AppUser = {
      email: email.trim(),
      name: name?.trim() || (isAdmin ? "Store Admin" : (email.split("@")[0] ?? "Shopper").replace(/[._]/g, " ")),
      phone: "+91 98400 00000",
      role: isAdmin ? "admin" : "customer",
    };
    setState((prev) => ({ ...prev, user }));
    return user;
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({ ...prev, user: null }));
  }, []);

  const updateUser = useCallback((patch: Partial<AppUser>) => {
    setState((prev) => (prev.user ? { ...prev, user: { ...prev.user, ...patch } } : prev));
  }, []);

  const value = useMemo<ShopState>(() => {
    const cartLines = state.cart
      .map((line) => {
        const product = products.find((p) => p.id === line.productId);
        return product ? { product, qty: line.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    return {
      ready,
      ...state,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      moveToCart,
      applyCoupon,
      signIn,
      signOut,
      updateUser,
      cartCount: state.cart.reduce((s, l) => s + l.qty, 0),
      cartLines,
    };
  }, [
    state,
    ready,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    toggleWishlist,
    moveToCart,
    applyCoupon,
    signIn,
    signOut,
    updateUser,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export const DELIVERY_FEE = 49;
export const FREE_DELIVERY_OVER = 999;
export const TAX_RATE = 0.05;

export function useCartTotals() {
  const { cartLines, coupon } = useShop();
  const mrpTotal = cartLines.reduce((s, l) => s + l.product.mrp * l.qty, 0);
  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const productDiscount = mrpTotal - subtotal;

  let couponDiscount = 0;
  if (coupon === "KMWELCOME" && subtotal >= 999) couponDiscount = Math.round(subtotal * 0.1);
  if (coupon === "MART200" && subtotal >= 1499) couponDiscount = 200;
  if (coupon === "FESTIVE15" && subtotal >= 2999) couponDiscount = Math.round(subtotal * 0.15);

  const afterDiscount = Math.max(subtotal - couponDiscount, 0);
  const delivery = afterDiscount === 0 || afterDiscount >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const total = afterDiscount + delivery + tax;

  return { mrpTotal, subtotal, productDiscount, couponDiscount, delivery, tax, total };
}
