# Handoff: On Becoming — Podcast Brand Website

A complete spec for building the **On Becoming with Katrina Thorpe** marketing website in a real codebase using Claude Code. A developer who was not part of the design conversation should be able to build the whole site from this document alone.

---

## 1. Overview

**On Becoming** is a podcast for women navigating life after divorce or a breakup — healing, identity, dating, friendships, finances, mindset, and building a fulfilling life. The host, Katrina Thorpe, shares her own story so listeners feel less alone.

This is a **brand website, not a player**. Listeners go to Spotify to actually listen; the site builds connection and trust. It has **5 pages**: Home, About, Episodes, Newsletter, Contact, plus a shared nav and footer.

Tone: warm, honest, personal, empowering. Visual feel: soft, feminine, **editorial — like a beautiful lifestyle magazine**, not a corporate site. Generous white space.

---

## 2. About the design files

The files in `prototypes/` are **design references created in HTML** (a streaming-component format called "DC" that uses inline styles). They show the intended **look, layout, copy, and behavior** — they are **not** production code to ship directly.

Your task: **recreate these designs in a real, production framework**, pixel-faithfully, using that framework's idioms. Open the `.dc.html` files in a browser to see them render (they load `support.js` from the same folder). Read the markup for exact structure, copy, colors, and spacing — every value is inline so it's all there.

### Recommended stack
The two forms require server-side secrets, so pick a framework with server routes:
- **Next.js (App Router) on Vercel** is the path of least resistance — the two functions in `api/` are already written as Vercel-style handlers. Drop them into `app/api/subscribe/route.js` and `app/api/contact/route.js` (light adaptation to the Route Handler signature).
- Alternatives: Astro + serverless functions, SvelteKit, Remix, Nuxt. Any works; keep the API keys server-side.

Build it as a normal component-based site (one `<Nav>`, one `<Footer>`, a page per route). **Do not** copy the DC runtime or inline-style approach — translate to your framework's styling system (CSS Modules, Tailwind, styled-components, etc.). The design tokens in §5 make this straightforward.

### Fidelity: **High-fidelity.** 
Final colors, type, spacing, and interactions. Recreate the UI pixel-faithfully. Where the prototype uses a media query (noted per component), honor the same breakpoints.

---

## 3. Sitemap & navigation

```
/            Home
/about       About
/episodes    Episodes
/newsletter  Newsletter
/contact     Contact
```

Top nav (sticky): logo left, links right → **Home · About · Episodes · Newsletter · Contact**. Mobile (≤840px): links collapse into a hamburger that toggles a dropdown panel. The current page's link is shown in pink. Full spec in §6.

---

## 4. Brand

- **Soft pink `#c48a9a`** — the accent. Use for CTAs, links, underlines, pull quotes, dividers, active nav. NOT a background fill (except buttons).
- **Grey-blue `#393e46`** — nav text, dark section backgrounds (newsletter band, footer, CTAs), body-secondary text.
- **Cream `#faf8f6`** — primary page background.
- **Charcoal `#1e1e1e`** — primary body/heading text.
- A lighter pink **`#e0a7b6` / `#e9c4cf`** appears for italic accent words on dark backgrounds.
- A warm secondary surface **`#f3eee9`** is used for alternating bands (pull quotes, episode list bg).

### Typography
- **Headings & logo:** Playfair Display (serif), weights 400/500/600, with *italic* used heavily for accent words (e.g. "On *Becoming*", "*alone.*"). High-contrast editorial serif.
- **Body & UI:** DM Sans (sans-serif), weights 300/400/500/600.
- Load both from Google Fonts.
- Eyebrows/labels: DM Sans, ~12px, `letter-spacing: .22em`, `text-transform: uppercase`, pink, weight 600.

---

## 5. Design tokens

```
/* Color */
--cream:        #faf8f6;   /* page bg */
--surface-warm: #f3eee9;   /* alt bands */
--pink:         #c48a9a;   /* accent / CTA */
--pink-light:   #e0a7b6;   /* accent on dark bg */
--greyblue:     #393e46;   /* dark bands, secondary text */
--charcoal:     #1e1e1e;   /* primary text */
--error:        #b4546b;   /* form error text */
--hairline:     rgba(57,62,70,.10-.14);  /* borders/dividers */

/* Type */
font-serif: 'Playfair Display', serif;
font-sans:  'DM Sans', sans-serif;
/* Display H1: serif 500, 48–78px, line-height .97–1.08, letter-spacing -.015em
   H2: serif 500, 34–48px
   H3 (cards): serif 500, 24–26px
   Body: sans 400, 15–18.5px, line-height 1.6–1.8
   Eyebrow: sans 600, 12px, .22em tracking, uppercase, pink */

/* Radius */
pill: 40px (buttons, inputs, chips)
card: 6–16px
arch: 190px 190px 14px 14px (hero portrait — rounded top, soft bottom)

/* Shadow */
portrait: 0 26px 60px rgba(57,62,70,.20)
card:     0 18px 44px rgba(57,62,70,.16)

/* Layout */
content max-width: 1080–1180px, centered, 40px side padding
section vertical padding: ~80–104px
breakpoints: 860px (layout stacks), 840px (nav→hamburger), 760/620/600 (minor)
```

Buttons: pink fill `#c48a9a`, white text, pill radius, ~15–17px padding, weight 600. Secondary button: charcoal/cream outline, pill. Text link: charcoal with a 1.5px pink bottom-border.

---

## 6. Global components

### Nav (`SiteNav.dc.html`)
- Sticky top, `background: rgba(250,248,246,.92)` + `backdrop-filter: blur(10px)`, bottom hairline border.
- Inner: max-width 1180px, `padding: 22px 40px`, flex space-between.
- **Logo** (left, links to `/`): Playfair 25px/600, charcoal "On " + pink italic "Becoming".
- **Links** (right): DM Sans 13px, `.08em` tracking, uppercase, color `#393e46`; the active page's link is `#c48a9a`.
- **≤840px:** hide the link row, show a 3-bar hamburger (24px bars, `#393e46`). Tapping toggles a dropdown panel below the bar listing the 5 links stacked, each with a bottom hairline. State: `open` boolean.

### Footer (`SiteFooter.dc.html`)
- `background: #393e46`, cream text, `padding: 72px 40px 36px`, max-width 1180px.
- Two columns (`1.3fr 1fr`, stack ≤760px):
  - **Left:** Playfair 28px logo, tagline "A safe, beautiful space for women becoming themselves again, with Katrina Thorpe.", then social links (currently **Instagram only** → `https://www.instagram.com/onbecoming_podcast`). *(Facebook & TikTok intentionally removed; a TikTok link may be added later.)*
  - **Right:** "Stay close" + mini newsletter field (email input + "Join" pill linking to `/newsletter`).
- Bottom hairline row: "© 2026 On Becoming with Katrina Thorpe" + "Listen wherever you get your podcasts".

---

## 7. Pages

> Exact copy lives in the prototypes; this lists structure + intent. **Do not** alter copy (it's the client's voice and deliberately avoids em dashes — see §11).

### 7.1 Home (`Home.dc.html`)
Sections top→bottom:
1. **Hero** — 2-col (`1fr .92fr`, stacks ≤860px). Left: eyebrow "A podcast for women starting over", big serif H1 "On / *Becoming*", tagline, two CTAs ("▶ Listen on Spotify" pink → Spotify show; "Meet Katrina" text-link → /about). Left column has `padding-left:56px` on desktop (0 on mobile). Right: **arched portrait** — `assets/katrina-portrait.jpeg`, `aspect-ratio:38/49`, `border-radius:195px 195px 14px 14px`, big soft shadow, `background-position: 56% 16%`.
2. **What this podcast is about** — centered, eyebrow + large serif statement + 6 topic chips (Healing, Identity, Dating again, Friendship, Money, Mindset) as outlined pills.
3. **Latest episodes** — centered heading "New this season", then 3 list rows (episodes 09/08/07, newest first): big italic serif number, title, 1-line teaser, "Spotify →" link. Below: outlined "Browse all episodes" pill → /episodes. Rows separated by top hairlines.
4. **Join the community** (dark band `#393e46`) — centered H2 "Join the *community*", paragraph, inline email field + "Subscribe" pill → /newsletter.
5. **Pull quote** (warm band `#f3eee9`) — centered pink hairline, large serif quote ("Some seasons break you open…"), "Katrina" attribution. *Placed after the dark band on purpose, to break up two dark sections.*
6. Footer.

### 7.2 About (`About.dc.html`)
1. **Hero** — 2-col. Left: eyebrow "Meet Katrina", H1 "Hi, I'm *Katrina.*", intro paragraph. Right: portrait `assets/katrina-about.jpeg`, `aspect-ratio:4/5`, `border-radius:14px`, shadow.
2. **My journey** — centered narrow column (max 720px), H2 + 2 paragraphs. Body type 17.5px/1.8.
3. **Life outside the mic** — eyebrow + 3-up photo grid (`assets/life-lake.jpeg`, `life-fishing.jpeg`, `life-boat.jpeg`), each `aspect-ratio:4/5`, `border-radius:12px`. Grid → 2-col ≤600px.
4. **Why I started On Becoming** — narrow column, H2 + 2 paragraphs.
5. **Pull quote** (warm band, `margin:50px 0`) — large **pink** italic serif quote ("You are not starting over…"). Brand requirement: this pull quote is in the pink.
6. **What I hope you feel** — narrow column, H2 + 2 paragraphs + "Katrina xx" in italic serif.
7. **CTA** (dark band) — "Come sit with *me*", two buttons (Browse episodes / Join the community).
8. Footer.

### 7.3 Episodes (`Episodes.dc.html`)
- **Header** — centered eyebrow "The episodes", H1 "Listen & *become*", intro line.
- **Episode list** — single column, max-width 860px, 9 cards (newest first, 09→01). Each card (`background:#fff`, hairline border, `border-radius:10px`, ~38px padding):
  - Header row: big italic serif **number** + **title** (serif) + **teaser** (1–2 sentences).
  - Actions row: "▶ Listen on Spotify" pink pill (→ the episode's Spotify URL) + a **"Read show notes" / "Hide show notes"** toggle (text button with pink underline).
  - Expanded panel (toggle): full description **paragraphs**, optional **extras** (a sub-heading + bulleted list — used by EP 02 for the tools/recommendations and EP 04 for mentions), optional **links** (EP 05 has a "Get the free guide… (join the newsletter)" link → /newsletter), and a "Katrina xx" sign-off.
  - State: per-card `open` boolean.
- **CTA** (dark band) — "Never miss an *episode*" → /newsletter.
- Footer.
- **Canonical episode data:** see `episodes.json` in this folder (titles, Spotify URLs, teasers, full paragraphs, extras, links). Mirror it exactly. The same array is in `Episodes.dc.html`'s logic class.

### 7.4 Newsletter (`Newsletter.dc.html`)
- One framed card, 2-col (`1.05fr .95fr`, stacks ≤860px; image moves above on mobile).
  - **Left:** eyebrow "The community", H1 "You don't have to figure this out *alone.*", paragraph leading with the **free guide** ("Becoming Her: A Strategic Identity Reset") as the instant welcome gift, then a 3-item bullet list, then the **form**.
  - **Right:** image `assets/katrina-welcome.jpeg`, full-bleed cover.
- **Form behavior** (state machine — see §8): email input + "Join the community" submit. On success, swap the form for a warm success card ("You're in." + "your free guide is on its way. Katrina xx"). Inline validation error for bad/empty email. Fine print under the button.
- **Backend:** POST `/api/subscribe` (EmailOctopus). See §9.
- Footer.

> **Free guide delivery:** the guide is **not** hosted on the site. It is delivered by an EmailOctopus *welcome automation* when someone subscribes — that's the incentive to sign up. The site's job is only to capture the subscribe; every "get the guide" CTA routes to /newsletter.

### 7.5 Contact (`Contact.dc.html`)
- 2-col (`.9fr 1.1fr`, stacks ≤860px).
  - **Left:** eyebrow "Say hello", H1 "I'd love to hear *from you.*", paragraph, a friendly photo (`assets/katrina-contact.jpeg`, `aspect-ratio:5/4`, rounded, shadow), then "Find me here" → Instagram (@onbecoming_podcast).
  - **Right:** form card (white, rounded 16px) with **Name / Email / Message** fields (rounded 10px inputs, pink focus border), inline validation error, "Send message" pink pill. On success, swap for "Thank you. Thanks for reaching out. I'll be in touch soon. Katrina xx".
- **Backend:** POST `/api/contact` (Resend). See §9.
- Footer.

---

## 8. Interactions & state

- **Mobile nav:** `open` boolean; hamburger toggles dropdown. Close on link tap.
- **Episode show-notes:** per-card `open` boolean; toggle expands/collapses the notes panel and flips the button label.
- **Newsletter form:** `status ∈ {idle, loading, success, error}`, `email`, `error`. Validate email with `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`. On submit → `loading` → POST `/api/subscribe` → `success` or inline `error`. Button label shows "Subscribing…" while loading.
- **Contact form:** `status`, `name`, `email`, `message`, `error`. Require name + message + valid email. On submit → `loading` → POST `/api/contact` → `success` swap or inline `error`. Button shows "Sending…".
- **Spotify / external links:** open in a new tab (`target="_blank"`, add `rel="noopener"`).
- **Responsive:** honor breakpoints in §5. All tap targets ≥44px on mobile.

> The prototype form handlers fall back to showing the success state when no backend is present (so the design previews). In production, **remove that fallback** and surface the real error state when the API returns non-OK. The relevant code is commented in each `.dc.html` logic block.

---

## 9. Backend (server-side only — keep keys secret)

Two handlers are provided in `api/` (Vercel-style; adapt to your framework's route handler):

### `api/subscribe.js` — EmailOctopus
- POST `{ email }`. Validates, then calls EmailOctopus API v2 (`POST https://api.emailoctopus.com/lists/{LIST_ID}/contacts`, Bearer auth) to add the subscriber. Treats already-subscribed as success.
- Env: `EMAILOCTOPUS_API_KEY`, `EMAILOCTOPUS_LIST_ID`.

### `api/contact.js` — Resend
- POST `{ name, email, message }`. Validates, then sends a formatted email to Katrina via Resend (`POST https://api.resend.com/emails`, Bearer auth), with `reply_to` set to the sender.
- Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (Katrina's inbox), `CONTACT_FROM_EMAIL` (a verified sender on the Resend domain).

All five env vars must be set in the host before launch. Never expose them client-side.

---

## 10. Assets

In `prototypes/assets/` (copy into your app's public/assets):

| File | Used on | Notes |
|---|---|---|
| `cover.png` | (brand reference) | Original 3000×3000 podcast cover with wordmark baked in. Not used in final pages but useful for favicon/social cards. |
| `katrina-portrait.jpeg` | Home hero (arch) | Clean studio profile, no text overlay. |
| `katrina-about.jpeg` | About hero | Studio, hand on heart. |
| `katrina-welcome.jpeg` | Newsletter | Smiling studio, welcoming. |
| `katrina-contact.jpeg` | Contact | Café candid, approachable. |
| `life-lake.jpeg`, `life-fishing.jpeg`, `life-boat.jpeg` | About "Life outside the mic" | Lifestyle/outdoor selfies. |

All photos are the client's own. The wordmark style ("On" charcoal + "Becoming" pink italic) is recreated in live text using Playfair Display — no logo image needed.

Favicon / social share image: derive from `cover.png` (not yet produced — flag to client).

---

## 11. Important conventions (client requests)

- **No em dashes (—) anywhere in copy.** The client considers them an "AI tell." All copy has been rewritten to use commas/periods. Keep it that way in any new copy.
- **Episode descriptions are the client's real words** — preserve verbatim (see `episodes.json`).
- **Instagram is the only live social** (`@onbecoming_podcast`). No Facebook. TikTok may be added later — leave the footer/contact easy to extend.
- A **women's support community** (group where members talk to each other) is under consideration but **not yet decided** — build nothing for it now, but keep nav/footer easy to add a "Community" link later.
- **Spotify show URL** for the hero "Listen" CTA: client to supply the main show link; episode-level URLs are in `episodes.json`.

---

## 12. Files in this bundle

```
design_handoff_on_becoming_website/
├── README.md                ← this file
├── episodes.json            ← canonical data for all 9 episodes
├── api/
│   ├── subscribe.js         ← EmailOctopus handler
│   └── contact.js           ← Resend handler
└── prototypes/              ← HTML design references (open in a browser)
    ├── Home.dc.html
    ├── About.dc.html
    ├── Episodes.dc.html
    ├── Newsletter.dc.html
    ├── Contact.dc.html
    ├── SiteNav.dc.html
    ├── SiteFooter.dc.html
    ├── support.js           ← runtime so the .dc.html files render locally
    └── assets/              ← all images
```

## 13. Build checklist
- [ ] Scaffold the chosen framework; set up Playfair Display + DM Sans, the §5 tokens.
- [ ] Build `<Nav>` (sticky, hamburger ≤840px) and `<Footer>`.
- [ ] Build the 5 pages to match the prototypes pixel-faithfully.
- [ ] Wire the two API routes; set the 5 env vars; remove the preview success-fallback so real errors show.
- [ ] Episode show-notes expand/collapse; both forms' state machines + validation.
- [ ] Responsive pass at 840/860/760/600px; tap targets ≥44px.
- [ ] Favicon + social share image from the cover.
- [ ] Confirm no em dashes in any copy.
