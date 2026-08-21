export type CategorySlug =
  | "groceries"
  | "electronics"
  | "fashion"
  | "home-kitchen"
  | "beauty"
  | "personal-care"
  | "sports"
  | "accessories";

export type Category = {
  slug: CategorySlug;
  name: string;
  icon: string;
  blurb: string;
};

export const categories: Category[] = [
  { slug: "groceries", name: "Groceries", icon: "ShoppingBasket", blurb: "Daily staples & pantry" },
  { slug: "electronics", name: "Electronics", icon: "Cpu", blurb: "Audio, mobiles & gadgets" },
  { slug: "fashion", name: "Fashion", icon: "Shirt", blurb: "Everyday & occasion wear" },
  { slug: "home-kitchen", name: "Home & Kitchen", icon: "CookingPot", blurb: "Cook, clean & organise" },
  { slug: "beauty", name: "Beauty", icon: "Sparkles", blurb: "Skin, hair & makeup" },
  { slug: "personal-care", name: "Personal Care", icon: "HeartPulse", blurb: "Wellness essentials" },
  { slug: "sports", name: "Sports", icon: "Dumbbell", blurb: "Fitness & outdoors" },
  { slug: "accessories", name: "Accessories", icon: "Watch", blurb: "Bags, watches & more" },
];

export const brands = [
  "Samsung",
  "Nike",
  "boAt",
  "Prestige",
  "Mamaearth",
  "Tata Sampann",
  "Levi's",
  "Milton",
  "Dot & Key",
  "Decathlon",
] as const;

export type Brand = (typeof brands)[number];

export type Specification = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: CategorySlug;
  sku: string;
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  stock: number;
  minStock: number;
  createdAt: string;
  hue: number;
  description: string;
  specs: Specification[];
  tags: string[];
};

const p = (
  name: string,
  brand: Brand,
  category: CategorySlug,
  mrp: number,
  price: number,
  rating: number,
  reviewCount: number,
  stock: number,
  hue: number,
  createdAt: string,
  description: string,
  specs: Specification[],
  tags: string[] = [],
): Product => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return {
    id: slug,
    slug,
    name,
    brand,
    category,
    sku: `KM-${category.slice(0, 3).toUpperCase()}-${slug.slice(0, 6).toUpperCase()}`,
    price,
    mrp,
    rating,
    reviewCount,
    stock,
    minStock: 12,
    createdAt,
    hue,
    description,
    specs,
    tags,
  };
};

export const products: Product[] = [
  p("Samsung Galaxy Buds Core", "Samsung", "electronics", 9999, 7499, 4.5, 1284, 42, 250, "2026-07-28",
    "Compact true-wireless earbuds with active noise cancellation, 30 hours of total playback and crystal-clear call quality for daily commutes.",
    [{ label: "Battery", value: "30 hrs with case" }, { label: "ANC", value: "Yes, adaptive" }, { label: "Bluetooth", value: "5.3" }, { label: "Warranty", value: "1 year" }],
    ["bestseller", "deal"]),
  p("Samsung 32 inch Smart LED TV", "Samsung", "electronics", 24999, 17999, 4.3, 862, 14, 265, "2026-06-11",
    "HD Ready smart LED television with built-in apps, 20W sound output and a slim bezel-less frame that fits any living room.",
    [{ label: "Display", value: "32\" HD Ready" }, { label: "Sound", value: "20W" }, { label: "OS", value: "Tizen" }],
    ["deal"]),
  p("boAt Rockerz 450 Headphones", "boAt", "electronics", 3990, 1499, 4.2, 5320, 120, 285, "2026-05-02",
    "Over-ear wireless headphones with 40mm drivers, up to 15 hours of playback and plush padded earcups for long listening sessions.",
    [{ label: "Playback", value: "15 hrs" }, { label: "Driver", value: "40mm" }, { label: "Charging", value: "Type-C" }],
    ["bestseller", "deal"]),
  p("boAt Stone 358 Bluetooth Speaker", "boAt", "electronics", 3490, 1799, 4.1, 2144, 63, 205, "2026-07-04",
    "Rugged IPX7 water-resistant portable speaker with 10W RMS sound, dual-pairing and 12 hours of nonstop playtime.",
    [{ label: "Output", value: "10W RMS" }, { label: "Rating", value: "IPX7" }, { label: "Playtime", value: "12 hrs" }]),
  p("Samsung 7kg Front Load Washing Machine", "Samsung", "home-kitchen", 32990, 26490, 4.4, 411, 8, 240, "2026-04-19",
    "Fully automatic front load washer with Hygiene Steam, Digital Inverter motor and 14 wash programmes for Indian fabrics.",
    [{ label: "Capacity", value: "7 kg" }, { label: "Energy", value: "5 star" }, { label: "Warranty", value: "2 yrs + 10 yrs motor" }]),
  p("boAt Wave Call Smart Watch", "boAt", "accessories", 4499, 1799, 4.0, 3320, 88, 290, "2026-08-01",
    "1.83\" HD display smartwatch with Bluetooth calling, 700+ active modes and up to 7 days of battery on a single charge.",
    [{ label: "Display", value: "1.83\" HD" }, { label: "Battery", value: "7 days" }, { label: "Water", value: "IP68" }],
    ["new"]),

  p("Organic Basmati Rice 5kg", "Tata Sampann", "groceries", 899, 749, 4.6, 932, 210, 130, "2026-07-16",
    "Long-grain aged organic basmati rice with a naturally rich aroma — perfect for biryani, pulao and everyday meals.",
    [{ label: "Weight", value: "5 kg" }, { label: "Type", value: "Organic aged" }, { label: "Shelf life", value: "12 months" }],
    ["deal"]),
  p("Tata Sampann Unpolished Toor Dal 2kg", "Tata Sampann", "groceries", 379, 319, 4.5, 1810, 340, 120, "2026-06-22",
    "Unpolished toor dal that retains natural protein and fibre, cooks evenly and delivers a thick homely sambar.",
    [{ label: "Weight", value: "2 kg" }, { label: "Protein", value: "22g / 100g" }]),
  p("Cold Pressed Groundnut Oil 1L", "Tata Sampann", "groceries", 425, 349, 4.4, 640, 180, 95, "2026-05-30",
    "Wood-pressed groundnut oil with a nutty aroma and no chemical refining — ideal for South Indian cooking.",
    [{ label: "Volume", value: "1 L" }, { label: "Process", value: "Cold pressed" }]),
  p("Premium Filter Coffee Powder 500g", "Tata Sampann", "groceries", 549, 449, 4.7, 1245, 96, 30, "2026-07-09",
    "80:20 coffee-chicory blend roasted in small batches for a strong, aromatic South Indian filter kaapi.",
    [{ label: "Blend", value: "80% coffee, 20% chicory" }, { label: "Weight", value: "500 g" }],
    ["bestseller"]),
  p("Roasted Almonds 500g", "Tata Sampann", "groceries", 749, 599, 4.3, 528, 150, 85, "2026-04-27",
    "Californian almonds dry-roasted without oil or salt for a crunchy, everyday healthy snack.",
    [{ label: "Weight", value: "500 g" }, { label: "Type", value: "Dry roasted" }]),
  p("Assorted Millet Combo Pack 3kg", "Tata Sampann", "groceries", 699, 549, 4.2, 268, 70, 60, "2026-08-06",
    "Three millet varieties — ragi, kodo and foxtail — for balanced, fibre-rich everyday meals.",
    [{ label: "Weight", value: "3 x 1 kg" }, { label: "Variety", value: "Ragi, Kodo, Foxtail" }],
    ["new"]),

  p("Nike Revolution Running Shoes", "Nike", "sports", 6999, 4999, 4.4, 2210, 55, 230, "2026-07-21",
    "Lightweight everyday running shoes with soft foam cushioning and a breathable knit upper for long-distance comfort.",
    [{ label: "Upper", value: "Knit mesh" }, { label: "Sole", value: "Soft foam" }, { label: "Fit", value: "Regular" }],
    ["bestseller", "deal"]),
  p("Nike Dri-FIT Training T-Shirt", "Nike", "fashion", 2295, 1549, 4.3, 980, 130, 220, "2026-06-14",
    "Sweat-wicking Dri-FIT training tee with a relaxed cut and mesh back panel that keeps you dry through tough sets.",
    [{ label: "Fabric", value: "100% recycled polyester" }, { label: "Fit", value: "Standard" }]),
  p("Decathlon Yoga Mat 8mm", "Decathlon", "sports", 1499, 1099, 4.5, 1420, 145, 165, "2026-05-18",
    "High-density 8mm NBR mat with a textured non-slip surface and carry strap for studio or home practice.",
    [{ label: "Thickness", value: "8 mm" }, { label: "Material", value: "NBR foam" }]),
  p("Decathlon Adjustable Dumbbell Set 20kg", "Decathlon", "sports", 4999, 3799, 4.4, 690, 34, 155, "2026-07-11",
    "Vinyl-coated adjustable dumbbell pair with secure screw collars for progressive strength training at home.",
    [{ label: "Weight", value: "20 kg total" }, { label: "Coating", value: "Vinyl" }]),
  p("Decathlon Cycling Helmet", "Decathlon", "sports", 1999, 1499, 4.2, 315, 9, 185, "2026-08-09",
    "In-mould road cycling helmet with 18 vents, dial-fit adjustment and reflective rear strip for evening rides.",
    [{ label: "Certification", value: "CE EN1078" }, { label: "Vents", value: "18" }],
    ["new"]),
  p("Decathlon Insulated Trekking Backpack 30L", "Decathlon", "accessories", 3499, 2599, 4.3, 402, 48, 200, "2026-06-28",
    "30L trekking backpack with padded ventilated straps, rain cover and a hydration-compatible main compartment.",
    [{ label: "Capacity", value: "30 L" }, { label: "Weight", value: "780 g" }]),

  p("Levi's 511 Slim Fit Jeans", "Levi's", "fashion", 3999, 2399, 4.5, 3120, 92, 275, "2026-07-02",
    "Iconic 511 slim fit in stretch denim with a mid-rise waist that holds shape through all-day wear.",
    [{ label: "Fit", value: "Slim" }, { label: "Fabric", value: "98% cotton, 2% elastane" }],
    ["bestseller"]),
  p("Levi's Cotton Casual Shirt", "Levi's", "fashion", 2499, 1499, 4.2, 860, 110, 260, "2026-05-25",
    "Breathable pure-cotton shirt with a soft collar and tailored silhouette — easy from desk to dinner.",
    [{ label: "Fabric", value: "100% cotton" }, { label: "Sleeve", value: "Full" }]),
  p("Levi's Logo Hoodie", "Levi's", "fashion", 3499, 2099, 4.4, 540, 64, 295, "2026-08-12",
    "Brushed fleece hoodie with a kangaroo pocket and embroidered batwing logo for cool-weather layering.",
    [{ label: "Fabric", value: "Cotton fleece" }, { label: "Fit", value: "Relaxed" }],
    ["new"]),
  p("Levi's Leather Reversible Belt", "Levi's", "accessories", 1999, 1299, 4.1, 288, 118, 60, "2026-04-30",
    "Genuine leather belt with a reversible rotating buckle — black on one side, tan on the other.",
    [{ label: "Material", value: "Genuine leather" }, { label: "Width", value: "35 mm" }]),

  p("Prestige Svachh Pressure Cooker 5L", "Prestige", "home-kitchen", 3450, 2599, 4.6, 4210, 76, 25, "2026-06-05",
    "Svachh deep lid pressure cooker that stops spillage, with a hard-anodised body safe for induction and gas.",
    [{ label: "Capacity", value: "5 L" }, { label: "Base", value: "Induction ready" }, { label: "Warranty", value: "5 years" }],
    ["bestseller", "deal"]),
  p("Prestige Non-Stick Dosa Tawa 28cm", "Prestige", "home-kitchen", 1650, 1149, 4.4, 1980, 132, 45, "2026-05-09",
    "Spiral-base non-stick tawa with a 3-layer coating that spreads heat evenly for paper-thin dosas.",
    [{ label: "Diameter", value: "28 cm" }, { label: "Coating", value: "3-layer non-stick" }]),
  p("Prestige Mixer Grinder 750W", "Prestige", "home-kitchen", 5499, 3899, 4.3, 2260, 40, 280, "2026-07-24",
    "750W mixer grinder with three stainless steel jars and overload protection for daily masala and chutney duty.",
    [{ label: "Power", value: "750 W" }, { label: "Jars", value: "3" }, { label: "Warranty", value: "2 years" }],
    ["deal"]),
  p("Milton Thermosteel Flask 1L", "Milton", "home-kitchen", 1799, 1299, 4.6, 3410, 205, 190, "2026-06-18",
    "Double-walled vacuum-insulated steel flask that keeps drinks hot for 24 hours and cold for 24 hours.",
    [{ label: "Capacity", value: "1 L" }, { label: "Retention", value: "24 hrs hot / cold" }],
    ["bestseller"]),
  p("Milton Stainless Steel Lunch Box Set", "Milton", "home-kitchen", 1299, 899, 4.3, 1120, 168, 170, "2026-08-03",
    "Three leak-resistant stainless steel containers in an insulated jacket bag for office and school tiffin.",
    [{ label: "Containers", value: "3" }, { label: "Material", value: "Stainless steel" }],
    ["new"]),

  p("Mamaearth Vitamin C Face Serum 30ml", "Mamaearth", "beauty", 799, 549, 4.4, 6280, 240, 205, "2026-07-14",
    "Lightweight vitamin C and turmeric serum that visibly brightens dull skin and fades spots over 6 weeks.",
    [{ label: "Volume", value: "30 ml" }, { label: "Key actives", value: "Vitamin C, Turmeric" }],
    ["bestseller", "deal"]),
  p("Mamaearth Onion Hair Oil 250ml", "Mamaearth", "personal-care", 599, 419, 4.3, 8420, 260, 25, "2026-06-01",
    "Onion and redensyl hair oil that reduces breakage and nourishes the scalp with a non-sticky finish.",
    [{ label: "Volume", value: "250 ml" }, { label: "Free from", value: "Sulphates, parabens" }]),
  p("Dot & Key Sunscreen SPF 50 PA++++", "Dot & Key", "beauty", 695, 519, 4.5, 3140, 175, 300, "2026-08-08",
    "Watermelon SPF 50 PA++++ sunscreen with a weightless matte finish and zero white cast for humid Indian days.",
    [{ label: "SPF", value: "50 PA++++" }, { label: "Volume", value: "50 ml" }],
    ["new", "deal"]),
  p("Dot & Key Cica Calming Moisturiser", "Dot & Key", "personal-care", 645, 479, 4.2, 1490, 140, 300, "2026-07-19",
    "Oil-free cica and ceramide gel moisturiser that calms redness and hydrates acne-prone skin for 24 hours.",
    [{ label: "Volume", value: "60 ml" }, { label: "Skin type", value: "Oily, acne-prone" }]),
  p("Mamaearth Ubtan Body Wash 300ml", "Mamaearth", "personal-care", 449, 329, 4.1, 980, 190, 40, "2026-05-13",
    "Turmeric and saffron ubtan body wash with a creamy lather that leaves skin soft and lightly fragranced.",
    [{ label: "Volume", value: "300 ml" }, { label: "Fragrance", value: "Saffron, Turmeric" }]),
];

export type Review = {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export const reviews: Review[] = [
  { id: "r1", productId: "samsung-galaxy-buds-core", author: "Arun Prakash", city: "Chennai", rating: 5, title: "Superb ANC for the price", body: "Used them on the Chennai metro daily for a month. Noise cancellation is genuinely good and calls are clear.", date: "2026-08-04", verified: true },
  { id: "r2", productId: "samsung-galaxy-buds-core", author: "Divya R", city: "Coimbatore", rating: 4, title: "Great sound, snug fit", body: "Bass is punchy and they never fall out during runs. Case could have been smaller.", date: "2026-07-30", verified: true },
  { id: "r3", productId: "organic-basmati-rice-5kg", author: "Meenakshi S", city: "Madurai", rating: 5, title: "Aroma is real", body: "Grains stay separate and the aroma fills the kitchen. Made biryani for 12 people, everyone asked which rice.", date: "2026-08-02", verified: true },
  { id: "r4", productId: "organic-basmati-rice-5kg", author: "Vikram J", city: "Bengaluru", rating: 4, title: "Good value in 5kg", body: "Cheaper than my usual brand and quality is comparable. Packaging arrived sealed.", date: "2026-07-21", verified: true },
  { id: "r5", productId: "nike-revolution-running-shoes", author: "Sandeep Kumar", city: "Hyderabad", rating: 5, title: "Light and comfortable", body: "Ran 40km in the first week, no blisters. Sizing is true to my usual UK 9.", date: "2026-08-07", verified: true },
  { id: "r6", productId: "nike-revolution-running-shoes", author: "Nithya M", city: "Chennai", rating: 4, title: "Nice but narrow", body: "Cushioning is excellent for daily jogs. If you have wide feet order half a size up.", date: "2026-07-26", verified: false },
  { id: "r7", productId: "prestige-svachh-pressure-cooker-5l", author: "Lakshmi Narayanan", city: "Trichy", rating: 5, title: "No more spills", body: "The deep lid actually works — no dal on the stove anymore. Handles stay cool too.", date: "2026-07-18", verified: true },
  { id: "r8", productId: "prestige-svachh-pressure-cooker-5l", author: "Fathima A", city: "Kochi", rating: 5, title: "Worth every rupee", body: "Works perfectly on my induction hob. Three whistles and rice is done.", date: "2026-06-29", verified: true },
  { id: "r9", productId: "mamaearth-vitamin-c-face-serum-30ml", author: "Sneha Patel", city: "Pune", rating: 4, title: "Visible glow in 3 weeks", body: "Dark spots on my cheeks have faded noticeably. Absorbs fast, no stickiness.", date: "2026-08-01", verified: true },
  { id: "r10", productId: "mamaearth-vitamin-c-face-serum-30ml", author: "Harini V", city: "Salem", rating: 3, title: "Good but small bottle", body: "Works well on my skin, just finishes quickly with twice-daily use.", date: "2026-07-12", verified: true },
  { id: "r11", productId: "boat-rockerz-450-headphones", author: "Rahul Menon", city: "Bengaluru", rating: 4, title: "Battery is the hero", body: "Charged once in ten days of work calls. Mic is average in noisy rooms.", date: "2026-07-28", verified: true },
  { id: "r12", productId: "levis-511-slim-fit-jeans", author: "Ajay Selvam", city: "Chennai", rating: 5, title: "Perfect fit as always", body: "Fourth pair of 511s. The stretch makes them comfortable for long drives.", date: "2026-08-05", verified: true },
  { id: "r13", productId: "milton-thermosteel-flask-1l", author: "Priya Iyer", city: "Mumbai", rating: 5, title: "Still hot at night", body: "Filled with tea at 7am, still warm at 6pm. Zero leaks in my bag.", date: "2026-07-23", verified: true },
  { id: "r14", productId: "decathlon-yoga-mat-8mm", author: "Karthika B", city: "Trivandrum", rating: 5, title: "Great grip", body: "No slipping even in sweaty sessions and the thickness protects my knees.", date: "2026-07-15", verified: true },
  { id: "r15", productId: "dot-key-sunscreen-spf-50-pa", author: "Mohammed Irfan", city: "Chennai", rating: 4, title: "No white cast", body: "Finally a sunscreen that does not make me look grey. Matte finish lasts a few hours.", date: "2026-08-10", verified: true },
];

export type OrderStatus = "Processing" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  date: string;
  customer: string;
  email: string;
  status: OrderStatus;
  items: { productId: string; qty: number; price: number }[];
  total: number;
  payment: "UPI" | "Card" | "Cash on Delivery" | "Net Banking";
  city: string;
};

const orderTotal = (items: { qty: number; price: number }[]) =>
  items.reduce((s, i) => s + i.qty * i.price, 0);

const mkOrder = (
  id: string,
  date: string,
  customer: string,
  email: string,
  status: OrderStatus,
  items: { productId: string; qty: number; price: number }[],
  payment: Order["payment"],
  city: string,
): Order => ({ id, date, customer, email, status, items, total: orderTotal(items), payment, city });

export const orders: Order[] = [
  mkOrder("KM2026-1041", "2026-08-18", "Arun Prakash", "arun.prakash@example.in", "Processing",
    [{ productId: "samsung-galaxy-buds-core", qty: 1, price: 7499 }, { productId: "premium-filter-coffee-powder-500g", qty: 2, price: 449 }], "UPI", "Chennai"),
  mkOrder("KM2026-1040", "2026-08-17", "Meenakshi S", "meenakshi.s@example.in", "Shipped",
    [{ productId: "organic-basmati-rice-5kg", qty: 2, price: 749 }, { productId: "tata-sampann-unpolished-toor-dal-2kg", qty: 1, price: 319 }], "Cash on Delivery", "Madurai"),
  mkOrder("KM2026-1039", "2026-08-16", "Sandeep Kumar", "sandeep.k@example.in", "Out for Delivery",
    [{ productId: "nike-revolution-running-shoes", qty: 1, price: 4999 }], "Card", "Hyderabad"),
  mkOrder("KM2026-1038", "2026-08-15", "Priya Iyer", "priya.iyer@example.in", "Delivered",
    [{ productId: "milton-thermosteel-flask-1l", qty: 1, price: 1299 }, { productId: "milton-stainless-steel-lunch-box-set", qty: 1, price: 899 }], "UPI", "Mumbai"),
  mkOrder("KM2026-1037", "2026-08-13", "Fathima A", "fathima.a@example.in", "Delivered",
    [{ productId: "prestige-svachh-pressure-cooker-5l", qty: 1, price: 2599 }, { productId: "prestige-non-stick-dosa-tawa-28cm", qty: 1, price: 1149 }], "Net Banking", "Kochi"),
  mkOrder("KM2026-1036", "2026-08-11", "Rahul Menon", "rahul.menon@example.in", "Delivered",
    [{ productId: "boat-rockerz-450-headphones", qty: 1, price: 1499 }], "UPI", "Bengaluru"),
  mkOrder("KM2026-1035", "2026-08-09", "Sneha Patel", "sneha.patel@example.in", "Cancelled",
    [{ productId: "mamaearth-vitamin-c-face-serum-30ml", qty: 2, price: 549 }], "Card", "Pune"),
  mkOrder("KM2026-1034", "2026-08-07", "Ajay Selvam", "ajay.selvam@example.in", "Delivered",
    [{ productId: "levis-511-slim-fit-jeans", qty: 1, price: 2399 }, { productId: "levis-logo-hoodie", qty: 1, price: 2099 }], "UPI", "Chennai"),
  mkOrder("KM2026-1033", "2026-08-05", "Karthika B", "karthika.b@example.in", "Delivered",
    [{ productId: "decathlon-yoga-mat-8mm", qty: 1, price: 1099 }, { productId: "decathlon-adjustable-dumbbell-set-20kg", qty: 1, price: 3799 }], "Net Banking", "Trivandrum"),
  mkOrder("KM2026-1032", "2026-08-02", "Vikram J", "vikram.j@example.in", "Delivered",
    [{ productId: "samsung-32-inch-smart-led-tv", qty: 1, price: 17999 }], "Card", "Bengaluru"),
];

export const coupons = [
  { code: "KMWELCOME", type: "percent" as const, amount: 10, minOrder: 999, expiry: "2026-12-31", usageLimit: 1000, used: 218, active: true },
  { code: "MART200", type: "flat" as const, amount: 200, minOrder: 1499, expiry: "2026-10-31", usageLimit: 500, used: 96, active: true },
  { code: "FESTIVE15", type: "percent" as const, amount: 15, minOrder: 2999, expiry: "2026-11-15", usageLimit: 300, used: 41, active: true },
  { code: "SUMMER25", type: "percent" as const, amount: 25, minOrder: 1999, expiry: "2026-06-30", usageLimit: 200, used: 200, active: false },
];

export type Coupon = (typeof coupons)[number];

/* ---------- derived helpers ---------- */

export const discountPercent = (product: Pick<Product, "mrp" | "price">) =>
  Math.round(((product.mrp - product.price) / product.mrp) * 100);

export const productById = (id: string) => products.find((x) => x.id === id);

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const categoryCount = (slug: CategorySlug) =>
  products.filter((x) => x.category === slug).length;

export const reviewsForProduct = (id: string) => reviews.filter((r) => r.productId === id);

export const stockStatus = (product: Product) =>
  product.stock === 0 ? "Out of Stock" : product.stock <= product.minStock ? "Low Stock" : "In Stock";

export const dealProducts = () =>
  products.filter((x) => x.tags.includes("deal")).sort((a, b) => discountPercent(b) - discountPercent(a));

export const newArrivals = () =>
  [...products].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 12);

export const bestSellers = () => products.filter((x) => x.tags.includes("bestseller"));

export const relatedProducts = (product: Product, limit = 4) =>
  products
    .filter((x) => x.id !== product.id && (x.category === product.category || x.brand === product.brand))
    .slice(0, limit);
