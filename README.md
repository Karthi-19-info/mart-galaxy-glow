# Karthick Mart Launch

Karthick Mart — Premium E-Commerce Website

ROLE

Act as a senior full-stack developer, UI/UX designer, animation designer, and e-commerce architect with 10+ years of experience.

Build a production-quality e-commerce website called:

KARTHICK MART

Tagline:

"Smart Shopping. Better Living."

1. CORE REQUIREMENT

Create a modern, premium, responsive e-commerce website for Karthick Mart.

The website should feel like a real commercial e-commerce platform, not a simple AI-generated demo.

Prioritize:

Premium UI/UX

Fast performance

Smooth animations

Responsive design

Accessibility

Reusable components

Clean architecture

Functional interactions

Use Indian Rupees (₹) throughout the website.

2. DESIGN THEME

Use a premium dark theme.

Primary colors:

Deep black

Dark charcoal

Dark gray

Accent colors:

Electric blue

Purple

Cyan

Use subtle gradients and glowing effects.

Design style:

Modern

Futuristic

Minimal

Premium

Clean

Professional

Use rounded cards, glassmorphism, subtle borders, soft shadows, and elegant typography.

Do not overuse gradients or animations.

3. ANIMATED BACKGROUND

This is a major requirement.

Create a beautiful animated background across the website.

The background should include:

Slowly moving gradient blobs

Floating particles

Glowing orbs

Animated gradient mesh

Subtle light waves

Small floating dots

Smooth background movement

Soft blue/purple/cyan glow

The animation should move continuously but slowly.

Example visual concept:

Dark black background with subtle blue and purple glowing particles moving slowly behind the content.

The background must remain subtle enough that:

Text remains readable

Product images remain clear

Buttons remain visible

Users are not distracted

Use CSS animations and/or performant animation libraries where appropriate.

Respect:

prefers-reduced-motion

and reduce animations for users who have motion reduction enabled.

Do NOT use a heavy animation that causes performance problems.

4. BRANDING

Website name:

KARTHICK MART

Create a modern logo using:

KM

as the logo mark.

Logo concept:

A futuristic KM symbol combined with a shopping/cart-inspired visual.

Display:

Karthick Mart

under or beside the logo depending on screen size.

Use the tagline:

Smart Shopping. Better Living.

5. NAVIGATION BAR

Create a sticky modern navbar.

Desktop navigation:

Karthick Mart logo

Home

Shop

Categories

Deals

New Arrivals

Search

Wishlist

Cart

Account

Add:

Search icon

Wishlist icon

Shopping cart icon

User icon

Display cart item count dynamically.

Navbar should have a subtle glass/blur effect when scrolling.

6. HERO SECTION

Create a visually impressive hero section.

Heading:

"Everything You Need. All in One Mart."

Subheading:

"Discover quality products, amazing deals, and effortless shopping at Karthick Mart."

Buttons:

Shop Now

Explore Deals

Add an animated visual on the right side.

Use:

Floating product cards

Glowing circles

Animated shopping elements

Subtle particle effects

Do not make the hero animation distracting.

7. CATEGORIES

Create an attractive category section.

Categories:

Groceries

Electronics

Fashion

Home & Kitchen

Beauty

Personal Care

Sports

Accessories

Each category card should include:

Icon/image

Category name

Number of products

Hover animation

When clicking a category, navigate to the corresponding filtered product listing.

8. DEALS SECTION

Create a premium deals section.

Heading:

"Today's Best Deals"

Show:

Product image

Product name

Original price

Discount price

Discount percentage

Rating

Add to Cart

Add a countdown timer for selected deals.

Example:

Deal ends in: 04 : 25 : 18

9. PRODUCT LISTING

Create a professional product listing page.

Product card must contain:

Product image

Product name

Brand

Rating

Review count

Original price

Sale price

Discount percentage

Stock status

Wishlist button

Add to Cart button

Add smooth hover effects.

10. SEARCH

Create a functional global product search.

Search by:

Product name

Brand

Category

Description

Include:

Search suggestions

Recent searches

Popular searches

Use debouncing to avoid unnecessary requests.

Show a proper empty state when no results exist.

11. FILTERS

Create a responsive filtering system.

Filters:

Category

Brand

Price

Rating

Discount

Availability

Sorting:

Relevance

Price Low → High

Price High → Low

Highest Rated

Newest

Biggest Discount

Filters must actually affect the displayed products.

12. PRODUCT DETAILS

Create a detailed product page.

Include:

Product image gallery

Product name

Brand

Rating

Reviews

Price

Discount

Stock availability

Quantity selector

Add to Cart

Buy Now

Wishlist

Sections:

Description

Specifications

Delivery information

Return policy

Customer reviews

Also show:

Related Products

and

Frequently Bought Together

13. SHOPPING CART

Create a fully functional shopping cart.

Users can:

Add products

Remove products

Increase quantity

Decrease quantity

Clear cart

Display:

Subtotal

Discount

Delivery fee

Tax

Final total

Add:

Proceed to Checkout

Persist the cart so refreshing the browser does not remove items.

14. WISHLIST

Create a functional wishlist.

Users can:

Add products

Remove products

Move products to cart

Create a beautiful empty wishlist state.

15. AUTHENTICATION

Create:

Login

Register

Forgot Password

Reset Password

Support email/password authentication.

Protect user account pages.

16. USER DASHBOARD

Create:

My Profile

Name

Email

Phone

Profile image

My Orders

Show:

Order ID

Date

Products

Total

Status

Order statuses:

Processing

Shipped

Out for Delivery

Delivered

Cancelled

Also include:

Wishlist

Addresses

Payment methods

Settings

17. CHECKOUT

Create a clean multi-step checkout.

Step 1

Shipping Address

Step 2

Delivery Method

Step 3

Payment Method

Step 4

Order Review

Step 5

Order Confirmation

Show the order summary throughout the checkout process.

Use a test/mock payment flow initially.

Structure the application so Razorpay or Stripe can be integrated later.

Never store raw card details.

18. ADMIN DASHBOARD

Create a separate protected admin dashboard.

Navigation:

Dashboard

Products

Categories

Orders

Customers

Reviews

Coupons

Inventory

Analytics

Settings

Use a professional dark admin interface.

19. ADMIN ANALYTICS

Display:

Total Revenue

Total Orders

Total Customers

Total Products

Pending Orders

Low Stock Products

Charts:

Revenue

Orders

Customer Growth

Top Products

Category Performance

Make charts responsive.

20. PRODUCT MANAGEMENT

Admin can:

Add products

Edit products

Delete products

Update prices

Update discounts

Update stock

Upload product images

Change category

Change product status

Product fields:

Product name

SKU

Description

Category

Brand

Price

Discount

Stock

Images

Specifications

Rating

21. INVENTORY

Create inventory management.

Display:

Product

SKU

Current stock

Minimum stock

Inventory status

Statuses:

In Stock

Low Stock

Out of Stock

Highlight low-stock products.

22. COUPONS

Create coupon functionality.

Coupon fields:

Coupon code

Discount type

Discount amount

Minimum order value

Expiry date

Usage limit

Active/inactive

Allow customers to apply coupons during checkout.

23. DATABASE

Create a properly structured relational database.

Entities:

Users

Products

Categories

Brands

Product Images

Reviews

Orders

Order Items

Cart

Wishlist

Addresses

Coupons

Payments

Inventory

Create proper relationships.

Do not store the entire application in one database table.

24. SECURITY

Implement:

Authentication

Authorization

Protected routes

Role-based access

Admin-only functionality

Input validation

Secure database policies

Customers must not be able to access admin functionality.

25. PERFORMANCE

Optimize for fast loading.

Use:

Lazy loading

Optimized images

Pagination

Debounced search

Skeleton loading

Efficient components

Minimal unnecessary API calls

The animated background must not significantly reduce performance.

26. MICRO-INTERACTIONS

Add polished interactions.

Examples:

When adding a product:

"Added to cart ✓"

When adding to wishlist:

"Added to wishlist ♡"

Buttons should have subtle hover and click animations.

Cards should have subtle elevation/glow effects.

Page transitions should be smooth.

27. FOOTER

Create a premium footer.

Sections:

Karthick Mart

Smart Shopping. Better Living.

Shop

All Products

Categories

Deals

New Arrivals

Customer Service

Contact Us

FAQ

Shipping

Returns

Company

About Us

Careers

Privacy Policy

Terms & Conditions

Follow Us

Instagram

Facebook

YouTube

X

Bottom:

© 2026 Karthick Mart. All rights reserved.

28. RESPONSIVE DESIGN

The entire website must work on:

Desktop

Laptop

Tablet

Mobile

Mobile navigation should transform into a hamburger menu.

Product grids should automatically adapt.

Do not allow horizontal scrolling.

Ensure all buttons and interactive elements are touch-friendly.

29. REUSABLE COMPONENTS

Create reusable components such as:

Navbar

Footer

ProductCard

ProductGrid

CategoryCard

SearchBar

FilterSidebar

CartItem

RatingStars

PriceDisplay

Button

Modal

Toast

SkeletonLoader

Pagination

AdminSidebar

DashboardCard

Avoid duplicated code.

30. SAMPLE PRODUCTS

Create realistic demo products.

Use at least:

8 categories

30 products

10 brands

15 reviews

10 sample orders

Use realistic Indian pricing.

Example:

Samsung Galaxy Buds

₹9,999 → ₹7,499

Organic Basmati Rice 5kg

₹899 → ₹749

Nike Running Shoes

₹6,999 → ₹4,999

Do not use obviously fake placeholder products.

31. QUALITY CONTROL

Before completing the project, verify:

No broken routes

No console errors

No broken images

No horizontal scrolling

Responsive mobile design

Responsive desktop design

Cart works

Wishlist works

Search works

Filters work

Authentication works

Protected routes work

Admin permissions work

Product CRUD works

Checkout works

Loading states exist

Error states exist

Empty states exist

Animations are smooth

Accessibility is considered

FINAL DESIGN DIRECTION

The final website should look like a premium futuristic Indian e-commerce brand.

Brand:

KARTHICK MART

Theme:

Dark + Neon + Glassmorphism + Animated Background

Design personality:

Premium + Futuristic + Clean + Fast + Professional

Do not create a generic template.

Make the website visually impressive while maintaining excellent usability and performance.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mart-galaxy-glow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ecc6e84e-1ea5-4a3a-9861-1892e2168da9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
