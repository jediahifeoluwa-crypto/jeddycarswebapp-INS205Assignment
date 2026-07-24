# Jeddy Cars

Luxury car dealership web app. Dark-themed frontend, 9 pages: home, inventory, vehicle details, compare, financing, contact, login, customer dashboard, admin dashboard.

```
frontend/
├── index.html          home page — hero, search, featured/new/bestseller cars, finance widget, testimonials, news, newsletter
├── inventory.html       full inventory, filters, car-match quiz
├── vehicle.html         single vehicle page — gallery, specs, financing, reserve/buy/inspect
├── compare.html         compare up to 3 vehicles side by side
├── finance.html         loan calculator + finance application form
├── contact.html         contact form, map, hours, WhatsApp, FAQ
├── login.html           sign in / sign up / forgot password
├── dashboard.html       customer account — wishlist, orders, bookings, notifications, change password
├── admin.html           admin panel — analytics, vehicle CRUD, customers, orders, bookings, messages, reviews
├── css/style.css        all the styling
└── js/data.js, app.js   vehicle data + all the shared logic (theme, wishlist, compare, login, finance math)
```

## Pages & sections

**Homepage** — hero slideshow (4 images, auto-rotates), search bar, stats strip, Featured/New Arrivals/Bestsellers grids, brand pills, a live finance calculator widget, testimonials, news cards (static, no CMS), newsletter signup (toast only, doesn't save anywhere).

**Inventory** — filter bar (keyword, brand, body type, price, fuel, condition), sort dropdown, active filter chips, and a 3-question car match quiz that recommends vehicles.

**Vehicle detail** — image gallery with zoom, a 360° viewer that's a placeholder (not actually interactive yet), tabs for overview/specs/features, animated "dyno readout" stat bars, sticky sidebar with buy/reserve/inspect buttons and a per-car finance slider, similar vehicles at the bottom.

**Compare** — side-by-side spec table, up to 3 vehicles, pulled from whatever's been added via the compare buttons elsewhere.

**Financing** — full loan calculator (vehicle picker, price/down payment/APR/term sliders) plus a finance application form.

**Contact** — contact form, quick-info cards, embedded map, WhatsApp button, FAQ accordion.

**Login** — one card that swaps between sign in / sign up / forgot password without changing page. Forgot password skips straight to setting a new one since there's no email server behind it.

**Customer dashboard** — Overview, Wishlist, Recently Viewed, Saved Searches, Purchase History, Appointments, Notifications, Security (change password).

**Admin dashboard** — Analytics (KPIs + a revenue bar chart), Manage Vehicles (real add/edit/delete), Customers, Orders, Bookings, Messages, Reviews, Inventory Reports.

**Every page** also gets the nav bar, footer, cookie banner, back-to-top button, WhatsApp float, and a scripted live chat widget (canned replies, not a real chat provider) — all injected by `app.js` so it only had to be built once.

## What actually works vs. what's just for show

Runs entirely in the browser — no server needed. Search/filter, wishlist, compare, the finance calculator, login/signup/forgot password, and the admin vehicle CRUD screen are all wired up using `localStorage`, so the whole thing works the moment `index.html` is opened.

Passwords are stored in plain text in `localStorage`. Fine for a demo, not something to ship live — that needs a real backend with proper password hashing.

Vehicle photos are real photos of the actual make/model (pulled from Wikimedia Commons and checked to make sure they match), not manufacturer press shots. Fine for a demo, swap them for licensed photography before going live anywhere real.

Admin dashboard's Customers, Orders, Bookings, and Messages tabs show hardcoded demo data, not real visitor activity. If someone books an inspection or submits the contact form on the live site, it shows a success message but nothing is actually saved. Same for the finance application form. Only Manage Vehicles is actually wired to persist.

No backend right now. Everything above is client-side only. Real accounts, real orders, or real payments would need a separate backend project.

## Running it locally

Just open `frontend/index.html` in a browser. Or serve it so relative paths behave:

```bash
cd frontend
python3 -m http.server 5500
# open http://localhost:5500
```

Admin login: `admin@jeddycars.com` / `admin123`. Or sign up like a normal customer.

## Demo credentials

- Admin: `admin@jeddycars.com` / `admin123`
