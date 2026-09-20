# Setup

Four things to finish. Step 1 is the urgent one — until it's done, the booking
form can't deliver to Krista's inbox.

---

## 1. Make the booking form reach Krista's inbox

**This is the important one.** The old site posted to a placeholder URL that was
never filled in, so every inquiry sent through it failed. That's fixed in the
code, but it still needs an address to send to.

Inquiries go **straight to Krista's email** — there's no dashboard for anyone to
remember to check.

### Option A — Web3Forms (recommended, no account)

1. Go to <https://web3forms.com>
2. Type `BlondeBBeauty@gmail.com` into the box and press the button
3. An access key arrives in that inbox — copy it
4. Add these in Vercel → Project → Settings → Environment Variables:

   | Name | Value |
   |---|---|
   | `PUBLIC_FORM_ENDPOINT` | `https://api.web3forms.com/submit` |
   | `PUBLIC_FORM_ACCESS_KEY` | the key from the email |

5. Redeploy

Free for 250 submissions a month. No login for Krista to lose.

### Option B — Formspree

Needs a free account at <https://formspree.io>. Create a form, copy its
endpoint, and set `PUBLIC_FORM_ENDPOINT` to
`https://formspree.io/f/xxxxxxxx`. Leave `PUBLIC_FORM_ACCESS_KEY` unset.

### If you skip this

The form still works — it opens the bride's own email app with everything
filled in. It's a worse experience, and a note appears on the booking page
until it's configured, but nothing is silently lost.

### Test it

Submit a real inquiry through `/book/` and check the inbox. Do this once
after going live. **Don't assume it works because it deployed.**

---

## 2. Point it at the real domain

Three places hold the domain. Search for `blondebombshellbeauty.ca` and
replace it with the real one:

- `astro.config.mjs` — controls the sitemap and share links
- `public/admin/config.yml` — `base_url` and `site_url`
- `public/robots.txt` — the sitemap line

Then add the domain in Vercel → Settings → Domains.

---

## 3. Let Krista edit the site herself

She gets a login at `yoursite.com/admin/` where she can change prices, add
gallery photos, edit the FAQ and paste in reviews. No code, no asking you.

**This is the fiddliest step. It's optional — the site works fine without it.**

### What Krista needs

A free GitHub account, and an invite to this repo as a collaborator. That's
the part most likely to stall, so it may be worth sitting with her for it.

### Wiring it up

1. **Create a GitHub OAuth App** — GitHub → Settings → Developer settings →
   OAuth Apps → New:
   - Homepage URL: `https://yoursite.com`
   - Authorization callback URL: `https://yoursite.com/api/callback`
2. Copy the Client ID, then generate a client secret
3. Add both in Vercel → Settings → Environment Variables:

   | Name | Value |
   |---|---|
   | `GITHUB_OAUTH_ID` | the Client ID |
   | `GITHUB_OAUTH_SECRET` | the client secret |

   **No `PUBLIC_` prefix on these.** That prefix ships a value to the browser,
   and the secret must stay server-side.

4. In `public/admin/config.yml`, set `repo:` to your real `owner/repo`
5. Redeploy, then visit `/admin/` and sign in

### Why this is needed at all

The CMS normally leans on Netlify for logins. On Vercel it needs its own,
which is what `api/auth.js` and `api/callback.js` are. They're small and
they only do the login handshake.

---

## 4. Add real photos and reviews

### Photos

Drop image files into `src/assets/photos/`, then list them in
`src/content/gallery.json` with a short description of each. Or upload them
through `/admin/` once step 3 is done.

Don't resize or compress anything first — the build does that automatically,
and it does it better. Straight off the camera is fine.

The first photo in the list gets the large slot on the gallery page, so put
the strongest one first.

**Worth checking:** if a wedding photographer took the shot, Krista usually
needs their permission to publish it, even of her own work. Most are happy
with a credit.

### Reviews

The Reviews section is **hidden** until there's at least one real review in
`src/content/testimonials.json`. That's deliberate — invented reviews would
mislead a bride into booking.

Ask Krista for a few lines from past brides, or pull them from her Instagram
comments with permission.

---

## Running it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview  # serve the built site
```

## Where things live

| Path | What it is |
|---|---|
| `src/content/` | All the words, prices and photo lists. Edit these. |
| `src/pages/` | One file per page |
| `src/components/` | Nav, footer, reviews, the brand curve |
| `src/assets/photos/` | Photos. The build optimises them. |
| `src/styles/global.css` | Brand colours and shared styles |
| `public/admin/` | The CMS |
| `api/` | The CMS login handler |
| `legacy/` | The original site, kept for reference. Not deployed. |
| `tools/` | One-off scripts used to prepare the logo and icons |

## Brand colours

Taken from Krista's own contract and price sheet, so the website matches the
documents her clients already receive. They're defined once in
`src/styles/global.css` — please don't introduce new ones.

| | |
|---|---|
| Brown (text) | `#835741` |
| Blush | `#F1E4DD` |
| Cream (page) | `#FFFBFA` |
