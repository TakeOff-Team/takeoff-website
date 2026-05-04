# Handoff: Takeoff — AI Assessment Landing Page

## Overview
Single-page marketing site for **Takeoff**, an AI consulting offer run by Zach. The page sells one thing: a free 45-minute AI assessment with a $50 pay-you-back guarantee if it isn't worth your time. The landing page funnels every visitor toward a single inline form that hands off to Cal.com.

The site is intentionally **stupidly simple** — one CTA in disguise, editorial restraint, no SaaS tropes.

## About the Design Files
The files in this bundle (`Landing Page.html`, `app.jsx`, `tweaks-panel.jsx`, `assets/`) are **design references created in HTML/React** — a working prototype showing intended look and behavior. They are **not production code to ship directly**.

Your task is to **recreate this design in Astro** (per Zach's stack choice), using Astro's idioms (file-based routing, `.astro` components, scoped styles, partial hydration only where needed). The visual output should be pixel-identical; the implementation should be Astro-native.

The Tweaks panel (`tweaks-panel.jsx`) is a **design-time tool only** — do not port it to production. The `TOKENS_DEFAULTS` object inside `app.jsx` defines the locked-in token values; bake those into your Astro CSS variables and drop the runtime tweak machinery.

## Fidelity
**High-fidelity (hifi).** Every color, font weight, size, spacing value, rotation, shadow, and interaction is final and intentional. Recreate pixel-perfectly.

---

## Page Structure (in order)

1. **Hero** — wordmark, eyebrow tag, headline with green highlight on "for free", subhead, primary CTA, scroll cue
2. **Proof bridge** — centered "Time back is just the floor." headline + sub-line
3. **Proof artifacts** — two overlapping rotated text-message screenshots + 3 stacked stats
4. **Pull quote** — large editorial quote from Champ with circular headshot
5. **How it works** — 4 numbered steps, oversized neon green numerals
6. **Guarantee** — full-bleed black section, $50 in neon green, italic emphasis on "at least 5 hours a week"
7. **Booking form** — inline form with underline-only inputs → submits → opens Cal.com
8. **Founder block** — Zach's circular photo, intro line, link to personal site, social pills with icons
9. **Footer** — wordmark, contact email, legal links, copyright

---

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background |
| `--ink` | `#0A0A0A` | All body text, wordmark, dark section bg, button bg on hover |
| `--accent` | `#A6F23F` | Highlight box behind "for free", primary CTA bg, step numerals (01–04), $50 in guarantee, eyebrow dot, ::selection bg |
| `#3a3a3a` | | Hero subhead |
| `#444` | | Founder paragraph |
| `#555` | | Stats labels, how-it-works descriptions, proof bridge sub-line |
| `#666` | | Footer copy, guarantee eyebrow (deprecated) |
| `#888`–`#999` | | Mono micro-labels, form labels |
| `#bbb` | | Quote marks, scroll cue |
| `#ECECEC` | | Hairline dividers between stats and how-it-works rows |
| `#F0F0F0` | | Section borders (proof→howitworks, founder, etc.) |
| `#F4F4F4` | | Photo placeholder bg |

Dark guarantee section uses `#0A0A0A` bg, `#fff` heading, `#aaa` body, `#555` mono labels.

### Typography
- **Display + body**: `"Geist"`, system-ui, sans-serif (Google Fonts, weights 400/500/600/700)
- **Mono / labels**: `"Geist Mono"`, ui-monospace, monospace (weights 400/500/600)

### Type scale
| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero h1 | `clamp(48px, 8.6vw, 136px)` | 700 | 0.94 | `-0.03em` (tweakable) |
| Hero subhead | `clamp(17px, 1.5vw, 22px)` | 400 | 1.5 | — |
| Hero eyebrow | 11px | 400 | — | `0.18em` uppercase |
| Section h2 (proof bridge, how it works, form) | `clamp(40px, 5.4vw, 80px)` | 700 | 0.98–1.05 | `-0.03em` |
| Proof bridge (capped) | `clamp(36px, 5vw, 72px)` | 700 | 1.05 | `-0.03em` |
| Pull quote | `clamp(28px, 3.6vw, 52px)` | 500 | 1.15 | `-0.02em` |
| Stat number | `clamp(40px, 5.5vw, 80px)` | 700 | 1 | `-0.03em` |
| Step numeral (01–04) | `clamp(56px, 7vw, 110px)` | 700 | 0.9 | `-0.04em` (color: accent) |
| Step title | `clamp(28px, 3.2vw, 46px)` | 700 | 1.05 | `-0.025em` |
| Step description | `clamp(16px, 1.3vw, 19px)` | 400 | 1.5 | — |
| Guarantee h2 | `clamp(36px, 5.2vw, 84px)` | 600 | 1.05 | `-0.025em` |
| Guarantee `$50` | inherits, recolored accent | 700 | — | `-0.035em` |
| Founder h2 | `clamp(36px, 4.4vw, 64px)` | 700 | 1 | `-0.03em` |
| Form input | 19px | 400 | — | `-0.005em` |
| Mono micro-label | 11–13px | 500–600 | — | `0.06–0.18em` uppercase |

### Spacing
- Section vertical padding: `clamp(100px, 14vh, 180px)` standard; guarantee uses `clamp(140px, 22vh, 260px)` for extra weight
- Section horizontal padding: `48px` desktop, `24px` mobile (≤760px)
- Max content widths: `1280px` (proof, how it works), `1100px` (guarantee), `760px` (form), `720px` (founder), `900px` (proof bridge)

### Borders / radii / shadows
- Hairlines between stats and step rows: `1px solid #ECECEC`
- Section separators: `1px solid #F0F0F0`
- Photo radius: `999px` (fully circular)
- Pill button radius: `999px`
- Text-message screenshot radius: `22px`
- Quote headshot border: `1px solid #ECECEC`, 44×44px circle
- CTA shadow: `0 6px 18px -8px {accent}88` rest, `0 12px 30px -10px {accent}aa` hover
- Text-message drop-shadow: `drop-shadow(0 30px 50px rgba(0,0,0,0.18)) drop-shadow(0 8px 18px rgba(0,0,0,0.08))`

---

## Components & Behavior

### Wordmark
Square 8×8px filled block + "Takeoff" in Geist Mono semibold uppercase, 14px, letter-spacing 0.02em. Inline-flex, gap 8px.

### Highlight (signature green block)
Wraps inline text in a span with an absolutely-positioned background `<span>` behind it.
- Background span: `top: 0.08em; bottom: 0.12em; left: -0.06em; right: -0.06em`, accent color, `transform: rotate(-0.6deg)`, `border-radius: 2px`, `z-index: 0`
- Foreground text span: `position: relative; z-index: 1`
- **Critical**: punctuation immediately following (e.g., the period after "for free") must sit **outside** the Highlight component so it lands cleanly on the white page background.

### CTA button
Pill, accent bg, ink text, Geist 600. Two sizes (regular: 16px font / 16/28 padding; big: 19px / 22/36). Trailing arrow `→` translates +3px on hover; whole button lifts -2px and shadow deepens. Transition 180ms ease.

### Hero
- Centered column, `min-height: 100vh`, padding `32px 48px 56px`
- Vertical order: wordmark (centered top), flex-1 spacer, eyebrow tag with pulsing accent dot ("Free 45-min AI assessment"), h1, subhead, big CTA, scroll cue ("Scroll ↓") in mono micro-label
- Eyebrow dot: 6×6px circle accent + `0 0 0 4px {accent}33` ring
- Headline copy: `Get back 5+ hours every week, [for free].` — "for free" wrapped in `<Highlight>`, period after the closing tag.
- CTA scrolls smoothly to `#book` (booking form), offset -40px from top.

### Proof bridge
Centered block above artifacts. h2 "Time back is just the floor." (no nowrap; wraps naturally). Sub-line "Champ used his hours to 5× his agency's leads in 60 days." in 17–21px regular, color #555, max-width 46ch, centered.

### Text-message artifacts
Two screenshots (`assets/text-1.jpg` and `assets/text-2.jpg`), absolutely positioned within a flex container (`min-height: 480px`):
- text-1: `top: 8%; left: 4%; width: 62%`, rotation `-3.2deg`, z-index 1
- text-2: `bottom: 4%; right: 2%; width: 58%`, rotation `+2.4deg`, z-index 2 (sits in front)
Each artifact: `border-radius: 22px`, `overflow: hidden`, dark `#1c1c1e` bg behind the image, the drop-shadow filter above.
On mobile (≤760px), both go `position: static`, stack vertically with `gap: 24px`, widths `88%`, the first aligns flex-start, second aligns flex-end (preserves the left-right offset rhythm).

### Stats column (right of artifacts on desktop)
Three rows, vertically stacked, gap 40px. First row no top border; subsequent rows `border-top: 1px solid #ECECEC; padding-top: 28px`. Each row: huge number (clamp 40-80px, weight 700) over an 18px label in #555.
Stats: `5×` "more inbound leads" · `16 → 85+` "leads in 60 days" · `2× → 2×` "clicks MoM, Feb & Mar".

### Pull quote
Large editorial blockquote, top margin `clamp(80px, 10vh, 140px)`. Color `#bbb` curly quotes. Body: "I have more than 5x'd this channel via Organic / Paid / LinkedIn. This sh*t is fire." (note the asterisks — Zach explicitly wants `sh*t`, not the full word). Footer: 44×44 circular headshot (`assets/champ.jpeg`) + "Champ · Agency owner" in mono uppercase 13px #999.

### How it works
Heading: "Here's how it works." Below it, four rows separated by hairline borders (top on every row, plus bottom on the last). Each row is a 2-column grid: 120–200px numeral column + content column.
Steps:
1. **Apply.** "60-second form below."
2. **Assessment call.** "45 minutes on Zoom. We dig into where your time actually goes."
3. **I build your plan.** "Custom AI implementation plan delivered in 2–3 days."
4. **Plan review call.** "30 minutes together. You walk away with a 4-day implementation plan to save at least 5+ hours/week."

### Guarantee (full-bleed black)
`background: #0A0A0A`, white text, centered. Padding `clamp(140px, 22vh, 260px) 48px`. Heading copy:
> If I can't show you _at least 5 hours a week_ of AI leverage on the call, I'll send you **$50**.

- "at least 5 hours a week" wrapped in `<em>` with Geist italic, weight 600
- "$50" in accent green, weight 700, letter-spacing -0.035em

Below the heading: "Amazon gift card, Venmo, whatever you want." (color #aaa). And: "No fine print." (mono 12px #555 uppercase).

### Booking form
Section id `book`. Heading "Book your free assessment." plus sub-line "Only taking 3 businesses this month." (#666).
Four fields, each as `flex column gap: 10`:
- Name (text)
- Email (email)
- Business + website (text)
- "What's eating your time?" (textarea, rows=3)

Field styling: no boxes, just a 1.5px bottom border `#DEDEDE`, focus state turns border to `#0A0A0A`. 19px Geist, transparent bg, no outline. Mono uppercase label 11px above each field.

Submit: big CTA "Submit & book my call". On submit, sets `submitted` state to show "Redirecting to Cal.com…" then `window.open('https://cal.com/zachdoesai/assessment', '_blank')` after 600ms. Below the button, a mono micro-label: "Free · 60 seconds · No card required".

### Founder block
Centered, max-width 720px. Vertical stack:
- 220–300px circular photo (`assets/zach.jpeg`, 1:1, object-fit cover)
- h2 "Hey, I'm Zach."
- Paragraph "I help business owners get their time back with AI. No fluff. Just systems that work."
- Underlined link "Check out my stuff →" → `https://zachdoesai.com`
- Mono micro-label "5,500+ followers across platforms"
- Social pill row (flex-wrap, gap 12px, justify-center)

### Social pills
Pill button: 1.5px ink border, transparent bg, ink text, 14px Geist 500, padding 10px 18px, gap 9px. On hover: bg + border = ink, text + icon = white.

Each pill carries an inline SVG icon (16×16):
- **instagram** — outlined rounded square + circle + dot (camera glyph), stroke 1.8
- **tiktok** — filled glyph (path)
- **youtube** — filled play badge
- **skool** — outlined mortarboard, stroke 1.8

The four pills, in order: Instagram, TikTok, YouTube, Skool. Hrefs are placeholders (`#`) — fill in real URLs.

### Footer
3-column grid (`1fr 1fr auto`). Left: wordmark + tagline "Helping business owners get their time back with AI." Middle: `zach@takeoff.llc` plus "Privacy · Terms" links. Right: "© 2026 Takeoff LLC" mono uppercase #999. 1px top border `#ECECEC`. Padding 48px.

---

## Interactions & Animations
- All hovers: 180ms ease.
- CTA: lift + shadow grow + arrow nudge.
- Social pills: bg/text color flip.
- Form fields: bottom-border darkens on focus, 180ms.
- Hero CTA scroll: smooth, offsets 40px from top of `#book`.
- No scroll-triggered animations, no parallax, no fade-ins. Page is static and direct.

## Responsive behavior
- Single breakpoint at `760px` (mobile).
- On mobile: section padding tightens to `24px`; proof artifacts switch from absolute overlap to vertical stack with rotations preserved; type scales via `clamp()` automatically.
- No hamburger nav — there's no nav at all.

## State Management
- Form fields: local component state (`useState`), 4 keys.
- Submitted flag: shows "Redirecting…" copy and triggers `window.open` to Cal.com.
- That's the only state on the page.

## Assets (in `assets/` folder)
| File | Purpose |
|---|---|
| `zach.jpeg` | Founder portrait (1:1 crop, circular display) |
| `champ.jpeg` | Pull-quote headshot (44×44 circular) |
| `text-1.jpg` | Longer text-message screenshot (back-left, rotated -3.2°) |
| `text-2.jpg` | Cropped text-message screenshot (front-right, rotated +2.4°) |

All four are real-content photos — keep them as-is.

## Files in This Bundle
- `Landing Page.html` — entry HTML, loads React + Babel + Geist via Google Fonts, mounts `app.jsx`
- `app.jsx` — all design code (Hero, Proof, HowItWorks, Guarantee, BookingForm, Founder, Footer, plus Highlight/CTA/SocialIcon helpers)
- `tweaks-panel.jsx` — design-time only, **do not port**
- `assets/` — production-ready images

## Astro Migration Notes
- Each section becomes a `.astro` component (`Hero.astro`, `Proof.astro`, etc.)
- `TOKENS_DEFAULTS` from `app.jsx` → CSS custom properties in a global stylesheet (or `:root`).
- Geist via `@fontsource/geist` and `@fontsource/geist-mono`, or keep the Google Fonts link.
- Form: native `<form>` posting to your handler, or keep client-side JS via an Astro client island. Either works — the redirect-to-Cal.com behavior is the only JS dependency.
- Strip the React + Babel `<script>` tags and the Tweaks panel entirely.
- Drop SVG icon components inline into the Astro template (or extract to `<Icon name="...">`).
- Pull quote and Highlight component: trivial Astro slots.
- Keep the `clamp()` and oklch-friendly values intact — Astro will pass them through.

## SEO Hooks (since this is the next phase)
- `<title>`: `Takeoff — Get back 5+ hours every week, for free.`
- Meta description: pull from hero subhead + guarantee.
- Single H1 (hero), single H2 per section — already structured this way.
- Open Graph: needs an OG image (1200×630 with the headline, accent block, wordmark). Not in this bundle — generate during the SEO pass.
- Schema: `Person` (Zach) + `Service` (AI assessment) + `Offer` ($50 guarantee).
- The whole page should be statically rendered — no client JS required for first paint.
