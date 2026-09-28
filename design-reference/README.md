# Handoff: monis.rent — Build Your Workspace

## Overview
A visual configurator for monis.rent (Bali tech-gear rental). A remote worker starts from a bundle preset (or empty room), customises desk, chair, monitors and accessories, watches an illustrated desk scene assemble live, toggles weekly/monthly billing, and rents the setup through a short checkout with a celebratory confirmation.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy. Recreate them in the target codebase's environment (e.g. the existing monis.rent Next.js/React app) using its established components, data layer and patterns. If no environment exists, React + a CSS approach of your choice is appropriate.

Open `monis Workspace Builder.dc.html` in a browser (keep `support.js` and the two other `.dc.html` files alongside it) to see all screens on one canvas. Everything is clickable and shares state.

## Fidelity
**High-fidelity** for layout, colors, typography, spacing, copy and interactions.
Caveats:
- **Brand colors and font are assumptions** (monis.rent's exact tokens were not available). Swap in the real brand tokens; keep the structure.
- **Prices are placeholders** except the 24" monitor ("from $6/week", from monis.rent). Pull real prices from the catalog.
- **Monthly price formula is a placeholder**: `monthly = round(weekly × 3.03)` (≈ 4.33 weeks × 0.7). Replace with real monthly SKU pricing.
- The illustrated scene is built from positioned divs for prototyping speed. In production, replace with SVG (or layered PNG/WebP) illustrations per item, keeping the same composition and layering rules described below.

## Screens / Views

### 1. Builder — Desktop (1440 wide)
**Purpose:** choose a bundle, customise items, see live preview and total, proceed to rent.

**Layout**
- Page bg `#F6F5F1`. Top nav: white, 16px 40px padding, bottom border `1px #ECEAE4`, flex row gap 20.
  - Logo "monis" + ".rent" (`.rent` in `#0E6B53`), 24px/800, letter-spacing −0.04em.
  - Two pills (bg `#F4F3EF`, radius 12, padding 9×14, 14px): "Deliver to **Canggu, Bali**", "Delivery **Tomorrow, 29 Sep**" (label `#6B6F74`, value 700).
  - Spacer, then nav links (15px/600 `#3C4043`, gap 28): All products · Bundles · How it works.
  - Cart button: bg `#121417`, white, radius 12, padding 10×16, count badge (bg `#0E6B53`, 22px tall, radius 11, 12px).
- Content: padding 32px 40px 40px, column gap 24.
- **Header row** (flex, space-between, align end):
  - Left: "New" pill (bg `#121417`, white, 12px/700, radius 999, 5×10) + "Workspace Builder" (14px/600 `#0E6B53`); H1 "Build your workspace" 52px/800, ls −0.04em, lh 1; subline 17px `#5F6368`: "Start from a bundle, make it yours, and we'll set it all up at your place tomorrow."
  - Right badges: "Next-day delivery" (bg `#E3F1EA`, text `#0A5140`, 8px dot `#16A34A`, radius 12, 10×14, 14px/700); "Setup & pickup included" (white, border `1px #ECEAE4`, 14px/600).
- **Bundle row:** 4-col grid, gap 12. Card: white, radius 18, padding 16×18, border 2px (`#0E6B53` selected / `#ECEAE4`), hover translateY(−2px). Name 16px/800, "−20%" tag (bg `#FFEDE3`, text `#B5400F`, 12px/800, radius 999, 3×8; not on "Start fresh"), desc 13px `#5F6368` lh 1.4, price line 14px/700 "From $X/wk" (bundle total × 0.8) or "Pay per item".
- **Main grid:** `minmax(0,1fr) 480px`, gap 24, align start.
  - **Preview card** (white, radius 24, border `#ECEAE4`, padding 12, column gap 14):
    - Scene (radius 16, aspect 800:520). Overlays: "Live preview" pill top-left (white 92%, 13px/700, green dot), "N items" pill top-right. Hotspot chips (see Interactions). Toast bottom-center (bg `#121417`, white, 14px/600, radius 999, 11×18).
    - "In your setup" row: label 13px/700 `#6B6F74`; chips (bg `#F4F3EF`, radius 999, 13px/600, padding 6 6 6 12) each with a 20px white round "×" remove button. Empty: "Nothing yet. Pick a desk to start."
  - **Selection panel** (white, radius 24, border `#ECEAE4`, padding 20, column gap 16):
    1. Billing row: segmented control 250px wide (track `#F4F3EF` radius 14 padding 4; segments 38px tall radius 10, active white + `0 1px 3px rgba(0,0,0,.12)`, 14px/700) "Weekly | Monthly"; chip "Monthly saves ~30%" (bg `#FFEDE3`, `#B5400F`, 13px/800).
    2. Tabs (underline style, bottom border `#ECEAE4`): Desk · Chair · Monitors · Accessories. 15px/700; active `#121417` with 2.5px underline, inactive `#6B6F74`. Count pill 20px (filled: `#E3F1EA`/`#0A5140`; zero: `#F4F3EF`/`#6B6F74`).
    3. Product grid: 2 cols, gap 12. Card: radius 18, border 2px (`#0E6B53` + bg `#F2F9F5` when selected; else `#ECEAE4` + white), padding 8 8 12, hover translateY(−2px). Image well 124px tall, bg `#F6F3EE`, radius 12, optional "Same-day" pill top-left (white, 11px/700 `#0A5140`). Name 14px/700, spec 12px `#6B6F74`. Price 15px/800 + "/wk" 12px/600 `#6B6F74`. Button 32px tall radius 10, 13px/700: "+ Add" / "Select" (bg `#121417`) or "✓ Added" / "✓ Selected" (bg `#0E6B53`). Monitors, once added, show a stepper (bg `#0E6B53`, − qty +).
    4. Summary block (bg `#F6F5F1`, radius 18, padding 16, gap 12): discount line "{Bundle} bundle −20%  −$X" (`#0A5140`, 700) or warning "Add back the {item} to keep your bundle discount." (13px/600 `#B5400F`); "{N} items · per week" 13px; total 40px/800 ls −0.03em + "/wk"; right note "Delivery & setup free / Cancel anytime" 13px `#6B6F74`; CTA "Rent Your Setup →" 56px, radius 14, bg `#0E6B53` (hover `#0A5140`, active scale .98), white 17px/800.

### 2. Checkout — Desktop
- Nav: logo + "← Back to builder" link (15px/700 `#0E6B53`).
- Grid `minmax(0,1fr) 500px`, gap 24, padding 32 40 48.
- Left: H1 "Your setup" 44px/800. Row (grid 1.1fr / 1fr, gap 20): scene thumbnail (radius 20) + "What happens next" card with 3 numbered steps (26px circles `#E3F1EA`/`#0A5140`): "We deliver {when} and set everything up." / "Swap or add gear anytime from your account." / "Leaving Bali? We pick it all up, no fee." Below: line-item list card (white, radius 20, padding 8×20); each row: 64px thumb (bg `#F6F3EE`, radius 12), name 15px/700, spec 13px `#6B6F74`, "Remove" 13px/600 `#6B6F74`, price 15px/800 right-aligned 80px. Row divider `#F0EEE9`.
- Right card (white, radius 24, padding 24, gap 18):
  - Billing segmented (Weekly | Monthly + "Save ~30%" in `#B5400F`).
  - Delivery: 3 day tiles (Today / Same-day; Tomorrow / Tue 29 Sep; Wed 30 Sep / Or later) — radius 12, 2px border, selected `#0E6B53` + `#F2F9F5`. Time slots "8–12 / 12–16 / 16–20": 36px, radius 10; selected bg `#121417` white text. Address field (border `1.5px #E2E0DA`, radius 12): "Villa Kayu 3, Jl. Pantai Berawa, Canggu".
  - Totals: Subtotal · N items; bundle discount (green); "Delivery, setup & pickup — Free" (green); divider; "Total per week" 16px/800 and amount 34px/800.
  - CTA "Rent this setup" 58px, radius 14, `#0E6B53`. Below: green dot + "Arrives {when}" 13px/700 `#0A5140`.
- **Confirmation overlay** (on Rent): full-cover `rgba(246,245,241,.9)`, confetti (44 pieces, colors `#0E6B53 #FF7A45 #16A34A #F6C453 #121417`, fall 2–4s staggered). Card 600px, white, radius 28, padding 40, shadow `0 30px 80px rgba(20,20,20,.16)`, pops in from scale .92/translateY 30 with `cubic-bezier(.34,1.56,.64,1)` .55s. Contents: 68px green check circle; "Order MR-48213" 13px/700 uppercase `#6B6F74`; "You're all set. See you {tomorrow}." 40px/800; body 16px `#5F6368`: "Our team arrives {when} at Villa Kayu 3 and sets everything up. You just plug in your laptop."; scene thumbnail; buttons "Track delivery" (green) and "Back to builder" (`#F4F3EF`, closes overlay).

### 3. Builder — Mobile (390×844)
White status + header (logo 20px, "Next-day delivery" pill). Content padding 14: title 26px/800; scene (radius 18) with "N items" pill; horizontally scrolling bundle pills (2px border, "−20%" in `#B5400F`); tabs Desk · Chair · Monitors · Extras (13px/700, equal width, underline); horizontal scrolling product cards 150px wide (96px image well, name 13px/700 clamped to 2 lines, price 14px/800, 28px square add button showing "+", "✓" or "×N"). Sticky bottom bar (white, top border): small billing segmented (176px) + "Save ~30% monthly" chip; total 26px/800 + "Rent Your Setup" button (52px, radius 14, green, flex 1). Hide horizontal scrollbars.

### 4. Checkout — Mobile
Header "← Your setup". Scrollable: line items (48px thumbs, name 14px/700, price 14px/800); card with Delivery, Bundle −20%, Setup & pickup Free. Sticky bottom: "Total per week" + amount 26px/800, CTA "Rent this setup" 52px green (triggers same confirmation).

## Interactions & Behavior
- **Bundle select** replaces the entire setup with the bundle's items and shows toast "{Bundle} loaded. Make it yours." ("Fresh start" for empty).
- **Desk**: single-select (cards say Select/✓ Selected); can be removed only via setup chip / checkout Remove.
- **Chair**: toggle.
- **Monitors**: add up to **2 total** (any mix). Third attempt → toast "Two screens max per desk". Stepper −/+ on added cards.
- **Accessories**: toggles (MX Keyboard, MX Master mouse, Laptop Stand, Smart LED Desk Lamp, Monitor Light Bar, Smart Power Strip).
- **Auto-desk**: adding a monitor or accessory with no desk auto-adds Electrical Adjustable Desk + toast "Added an Electrical Adjustable Desk to put it on".
- **Toast**: on every add; fades/slides up, auto-hides after 1.7s.
- **Hotspot chips** on the preview (white pill, 22px green "+" circle, 13px/700, shadow `0 6px 20px rgba(20,20,20,.14)`, hover scale 1.06). Shown only when relevant (positions as % of scene): "Pick a desk" (40,62) if no desk; "Add a monitor" (41,26) if 0 monitors → adds 27"; "Second screen" (62,24) if 1 → adds 24"; "Add a chair" (43,74); "Desk lamp" (71,42). Toggleable via prop.
- **Bundle discount**: 20% off the bundle items' combined price, applied only while every bundle item is still present (quantity-aware). If broken, show the add-back warning naming the first missing item.
- **Billing toggle** switches all prices, labels (/wk ↔ /mo, "per week" ↔ "per month") everywhere.
- **Scene animation**: each item fades in (opacity .35s ease) and drops in from translateY(−26px) scale(.85) → 0/1 with `cubic-bezier(.34,1.56,.64,1)` .5s. Monitor slots animate `left` (.45s) when re-centred.
- Rent button with 0 items is a no-op (disable it in production).

## Scene composition (800×520 logical canvas, scaled to container width)
Wall `#F3EEE7`; window at (48,44) 220×290 with 10px white frame, warm sky gradient `#FDEBD3→#F7CFA3`, palm leaves, green hills; white sill; diagonal warm light beam; framed terracotta arch print at (650,70); floor from y=440 with wood planks `#E8DAC5/#DFCFB7`. Always-present terracotta-pot snake plant at (668,250) = the Bali accent.
Layer order (back → front): floor shadow, plant, power strip (floor under desk, 470,418), desk (160,270; top surface y=270), monitor slots, light bar (centered on first monitor, on its top edge), laptop stand (170,184), lamp (548,130), keyboard (330,258), mouse (468,257), chair shadow, chair (315,280).
Monitors: widths 24"=150, 27"=176, 34"=230 (heights 118/132/130); 1 monitor centered on x=400; 2 monitors side by side with 14px gap, group centered on x=400; bottoms sit on y=270.

## State Management
```
desk: 'desk_electric' | 'desk_dual' | 'desk_mech' | null
chair: boolean
monitors: string[]   // max 2, e.g. ['mon27','mon24']
acc: { [id]: 1 }     // accessories set
bundle: 'scratch' | 'essentials' | 'founders' | 'trading'   // last loaded preset
billing: 'week' | 'month'
tab: 'desk' | 'chair' | 'mon' | 'acc'
day: 'today' | 'tomorrow' | 'later';  slot: '8–12' | '12–16' | '16–20'
booked: boolean;  toast: string
```
Derived: item list, counts, subtotal, bundle intact/missing, discount, total. In production, fetch catalog (names, specs, weekly/monthly prices, same-day eligibility, stock) and bundles from the existing API; submit cart via existing checkout.

## Catalog used in the prototype (placeholder prices, weekly)
- Electrical Adjustable Desk — Sit-stand, 70–118 cm — $9
- Dual-Motor Standing Desk — 3-stage lift, 120 kg load — $12
- Mechanical Adjustable Desk — Crank lift, no power needed — $6
- Ergonomic Office Chair — 4D arms, lumbar, headrest — $8
- 24" Full HD Monitor — 144 Hz IPS — $6 (same-day)
- 27" 4K Monitor — USB-C, 100% sRGB — $9 (same-day)
- 34" Curved Monitor — WQHD, 180 Hz — $14 (same-day)
- Logitech MX Keyboard — $3 · Logitech MX Master S3 — $2.50 · Ergonomic Laptop Stand — $1.50 · Smart LED Desk Lamp — $2 · Monitor Light Bar — $2 · Smart Power Strip — $1

Bundles: Essentials = electric desk + chair. Founders = electric desk, chair, 27" 4K, laptop stand, keyboard, mouse, power strip. Trading = dual-motor desk, chair, 34" curved, keyboard, mouse, light bar, power strip. (Default start: Founders.)

## Design Tokens
Colors
- Ink `#121417`; secondary text `#5F6368`, `#6B6F74`; body dark `#3C4043`
- Page bg `#F6F5F1`; canvas bg `#E7E5DF`; card `#FFFFFF`; subtle fill `#F4F3EF`; image well `#F6F3EE`
- Borders `#ECEAE4`, `#E2E0DA`, row divider `#F0EEE9`
- Primary green `#0E6B53`, hover `#0A5140`, tint `#E3F1EA`, selected card bg `#F2F9F5`, status dot `#16A34A`
- Savings/discount accent: bg `#FFEDE3`, text `#B5400F`
Typography: Plus Jakarta Sans (400–800). Scale: 52/44/40 display (800, ls −0.03 to −0.04em, lh 1), 26/24 section, 17/16/15/14/13/12/11 body & UI.
Radius: 8, 10, 12, 14 (buttons), 16–18 (cards), 20–24 (panels), 28 (modal), 999 (pills).
Shadows: segment `0 1px 3px rgba(0,0,0,.12)`; chip `0 6px 20px rgba(20,20,20,.14)`; modal `0 30px 80px rgba(20,20,20,.16)`.
Spacing: 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40.

## Assets
No external images. All product illustrations and the room are flat illustrations drawn in `Tech Item Art.dc.html` / `Tech Scene.dc.html` (HTML/CSS shapes). Recreate as SVGs in production (one per item id: desk_electric, desk_dual, desk_mech, chair, mon24, mon27, mon34, keyboard, mouse, laptopstand, lamp, lightbar, power, plant) or commission illustrations in the same style. Font from Google Fonts.

## Files
- `monis Workspace Builder.dc.html` — all four screens, state and pricing logic (see the `Component` class at the bottom).
- `Tech Scene.dc.html` — the live preview scene and layout rules.
- `Tech Item Art.dc.html` — per-item illustrations.
- `support.js` — runtime needed only to open the prototypes in a browser.
