# monis.rent · Build Your Workspace

An interactive workspace configurator for [monis.rent](https://monis.rent), a tech-gear rental service for remote workers in Bali. Pick a bundle, swap the desk, add a chair, up to two monitors and accessories, and watch an illustrated room put itself together as you go. Switch between weekly and monthly pricing, then rent the setup through a short checkout.

**Live:** https://desk-maker.vercel.app

## The feature monis.rent doesn't have yet

Right now monis.rent sells gear item by item. A remote worker who lands in Canggu needs a whole desk setup, not a single monitor, and today they have to piece it together from product pages and work out the total themselves. This builder closes that gap:

- **Start from a preset** (Essentials, Founders, Trading) or an empty room. Each bundle keeps a **20% discount** only while all of its items are still in the setup, and a warning names the item to add back.
- **See it before you rent it.** A live illustrated scene adds each item as it's chosen, with "+" hotspots suggesting the next piece.
- **Guard rails that match the real world:** at most two screens per desk, and an electric desk is added automatically if you pick a monitor or accessory with nothing to put it on.
- **One price everywhere.** The weekly/monthly toggle updates every price, label and total.
- **Short checkout.** Line items, delivery day and time slot, address, totals, then a confirmation.

## Stack and why

| | |
|---|---|
| **Next.js 16 (App Router) + TypeScript** | Both pages are server components that prerender statically. Only the configurator is client-side (`"use client"` islands), so the shell ships as HTML and hydrates the interactive parts. |
| **Tailwind CSS v4** | Design tokens (greens, warm neutrals, savings accent, radii, shadows) are mapped in `tailwind.config.ts` and loaded with `@config`. Plus Jakarta Sans 400–800 is loaded with `next/font`, so no request goes to Google at runtime. |
| **Zustand** | One small store (`src/store/configurator.ts`) with the handoff's exact state shape: `desk, chair, monitors[], acc{}, bundle, billing, tab, day, slot, booked, toast`. Builder and checkout share it across routes, and the setup persists to `sessionStorage`, so a refresh on checkout keeps the cart. |
| **Framer Motion** | Scene items fade and drop in (`translateY(-26px) scale(.85)` → rest, with the handoff's `cubic-bezier(.34,1.56,.64,1)`) and reverse on removal through `AnimatePresence`. It also drives the confirmation pop-in. Monitors glide to re-centre when the second one comes or goes. |

### Structure

```
src/
  app/                 page.tsx (builder), checkout/page.tsx: server shells
  lib/
    catalog.ts         typed catalog + bundles (placeholder prices, see note inside)
    pricing.ts         pure derivations: line items, subtotal, bundle check, discount, total
    delivery.ts        delivery-day copy computed in Bali time (Asia/Makassar)
  store/               Zustand store + post-hydration rehydrator
  components/
    art/               the 14 item illustrations (CSS shapes ported 1:1 from the handoff)
    scene/             800×520 room + layered live preview, scaled to its container
    builder/           bundles, preview card, hotspots, tabs, product cards, summary, mobile
    checkout/          line items, delivery picker, totals, confirmation + confetti
    ui/                billing toggle, category tabs, toast
```

Pricing is a set of pure functions (`computeTotals`), separate from React, so it could be unit-tested or reused on a server checkout as is.

### Notes

- **Accessibility:** controls are real buttons. Billing, bundles, delivery day and slot are radio groups; categories are a tablist with arrow-key navigation; toggles expose `aria-pressed` and the monitor stepper has labelled −/+ buttons. The toast and totals are live regions. The scene is an `img` whose alt text lists the current setup. The confirmation is a modal dialog: it takes focus, closes on Escape and hands focus back. Motion respects `prefers-reduced-motion`.
- **Dates:** the design's "Tomorrow, 29 Sep" is computed from today in Bali time, so it never goes stale. Pages are prerendered, so dates fill in after hydration to avoid mismatches.
- **Rent with 0 items** is a disabled button, not a no-op.
- **Mobile additions:** the builder shows the scene toast and an "In your setup" chip row, so items can be removed on a phone. The mobile mockup has no removal control.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Node 20+ recommended. The original design handoff is in `design-reference/`; open `monis Workspace Builder.dc.html` with `support.js` next to it to view the prototype.

## If I had more time

- **Sync catalog and pricing to the live API.** Names, specs, real weekly/monthly SKU prices (replacing the `round(weekly × 3.03)` placeholder), same-day eligibility, stock and bundle definitions should come from monis.rent's catalog, and the cart should submit through their existing checkout.
- **Swap the shape illustrations for commissioned SVG/WebP art.** Each item keeps its box size and anchor point, so the scene's layout and layering rules stay the same.
- **AI-generated "room preview".** Let the renter upload a photo of their villa or co-living room and get a photo-real render of the chosen setup in their own space, next to the illustrated preview.
