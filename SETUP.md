# Setup

Do these in order — each one makes the next testable.

**Where this stands (20 September 2026):** steps 1, 2 and 4b–4c are **done**.
What is left is step 3 (the booking form's inbox) and step 4a (Krista's own
GitHub account, then her collaborator invite). Nobody has completed a real
`/admin/` sign-in yet — the redirect to GitHub is verified working, the token
exchange that follows it is untested.

There is **no custom domain yet**, and nothing here needs one. The site runs on
its `.vercel.app` address and works out its own web address automatically, so
canonical links, the sitemap, the share card and the CMS login all stay correct
without anyone editing anything.

---

## 1. Connect Vercel to GitHub — ✅ done 20 Sep 2026

Deployments now come from `main`. Kept here for when it has to be redone.

1. vercel.com → project **bombshell-beauty**
2. **Settings** → **Git** → **Connect Git Repository**
3. Choose **aklassen19/bombshell-beauty**

   Not in the list? Click **Adjust GitHub App Permissions**, give Vercel access
   to this repo, then come back.
4. **Deployments** → **Redeploy**

**This step is not optional.** It's what makes the CMS work later. Krista
pressing "Publish" writes to GitHub — if Vercel isn't watching GitHub, her
change saves but the site never rebuilds, and it looks broken to her.

---

## 2. Turn off the login wall — ✅ done 20 Sep 2026

`bombshell-beauty.vercel.app` is public. Vercel puts new projects behind a
Vercel sign-in by default. Until this is off,
anyone you send the link to hits a login page instead of the website.

**Settings** → **Deployment Protection** → set **Vercel Authentication** to
**Disabled**.

**Test:** open the `.vercel.app` link in a private window. You should see the
site, not a login.

---

## 3. Make the booking form reach Krista's inbox

**The important one.** The old site posted to a placeholder URL that was never
filled in, so every inquiry sent through it failed. That's fixed in the code,
but it still needs somewhere to send to.

Inquiries go **straight to Krista's email** — no dashboard for anyone to
remember to check.

### Web3Forms (recommended, no account)

1. Go to <https://web3forms.com>
2. Enter `BlondeBBeauty@gmail.com`, press the button
3. An access key arrives in that inbox — copy it
4. Vercel → **Settings** → **Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `PUBLIC_FORM_ENDPOINT` | `https://api.web3forms.com/submit` |
   | `PUBLIC_FORM_ACCESS_KEY` | the key from the email |

5. **Redeploy.** Anything starting `PUBLIC_` is baked in when the site is
   built, so it needs a rebuild to take effect.

Free for 250 submissions a month. That free tier is email delivery only:
**the automatic "got it" reply to the bride is a paid feature** (Pro, about
US$12/month billed yearly, checked 20 Sep 2026). The alternative is to send
that reply from the site itself through a free email service — no monthly cost,
half a day of work, one more moving part. See NEXT.md, item 3.

### Or Formspree

Needs a free account at <https://formspree.io>. Set `PUBLIC_FORM_ENDPOINT` to
`https://formspree.io/f/xxxxxxxx` and leave `PUBLIC_FORM_ACCESS_KEY` unset.

### If you skip this

The form still works — it opens the bride's own email app with everything
filled in. Worse experience, but nothing is silently lost. A dashed setup note
shows on the booking page until it's configured.

### Test it — actually do this one

Submit a real inquiry through `/book/` and check the Gmail inbox. **Don't
assume it works because the deploy went green.** This is precisely the step
that was broken before. The dashed setup note disappearing confirms the
settings took; only a real email confirms delivery.

---

## 4. Let Krista edit the site herself

She gets a login at `/admin/` where she can change prices, add gallery photos,
edit the FAQ and paste in reviews. No code, no asking you.

**Optional and fiddliest. The site is fine without it.**

### 4a. She needs a GitHub account — ⬜ still owed

As of 20 Sep 2026 Krista has not made one. Free, at github.com. Then invite her: repo → **Settings** → **Collaborators**
→ **Add people**.

This is the part that stalls. It's an unfamiliar signup for a reason she won't
find obvious. Worth doing sitting beside her rather than over text.

### 4b. Create a GitHub OAuth App — ✅ done 20 Sep 2026

App registered against `https://bombshell-beauty.vercel.app`. Redo this only if
the address changes (see "When she gets a domain" below).

GitHub → your **Settings** → **Developer settings** (bottom of the sidebar) →
**OAuth Apps** → **New OAuth App**:

- **Homepage URL:** the `.vercel.app` address
- **Redirect URI:** that address + `/api/callback`

Three things GitHub's current form does that the older instructions did not:

- There is no single "Authorization callback URL" field any more. It is a
  **Redirect URIs** list with an **Add redirect URI** button, up to ten. Same
  thing. Add a second entry if `/admin/` will also be opened on the longer
  `bombshell-beauty-aklassen19s-projects.vercel.app` address.
- **Untick "Expire user access tokens".** It is ticked by default, and
  `api/callback.js` does no refresh-token handling — leaving it on signs Krista
  out roughly every eight hours, mid-edit, with an unhelpful error.
- Leave **Allow wildcard matching** and **Enable Device Flow** off.

Register, then generate a client secret. Copy both values — the secret is only
shown once.

**None of this exists in the GitHub mobile app.** Developer settings, and repo
→ Settings → Collaborators, are website-only. On a phone, type
`github.com/settings/developers` into the browser's address bar — tapping a
link hands off to the app.

### 4c. Add them to Vercel — ✅ done 20 Sep 2026

Both are set on Production, Preview and Development.

| Name | Value |
|---|---|
| `GITHUB_OAUTH_ID` | the Client ID |
| `GITHUB_OAUTH_SECRET` | the client secret |

**No `PUBLIC_` prefix on these.** That prefix ships a value to every visitor's
browser, and the secret must stay server-side. The secret is stored as
**sensitive**, so Vercel will not display it again to anyone — if it is ever
needed, regenerate it on GitHub rather than trying to read it back.

Redeploy, then visit `/admin/` and sign in.

**Test:** `curl -i "https://bombshell-beauty.vercel.app/api/auth?provider=github"`
should answer `302` with a `location` pointing at github.com. A `500` saying
`GITHUB_OAUTH_ID is not set` means the variables were saved but nothing was
rebuilt since — environment variables only reach the site on the next build.

That test covers the first half of the login only. The second half, where
GitHub's code is swapped for a token, can only be checked by signing in through
a browser. **Do that once yourself before Krista ever sees the link.**

### Why this is needed at all

The CMS normally leans on Netlify for logins. On Vercel it needs its own, which
is what `api/auth.js` and `api/callback.js` are. They only do the login
handshake.

---

## 5. Photos and reviews

### Photos

Drop files into `src/assets/photos/`, then list them in
`src/content/gallery.json` with a short description of each. Or upload through
`/admin/` once step 4 is done.

- **Don't resize or compress first.** Straight off the camera is right — the
  build does it better, and makes several sizes so phones get a small one.
- The **first photo gets the large slot** on the gallery page. Lead with the
  strongest.
- **Check about the photographers.** Wedding photos are usually the
  photographer's copyright even when they show Krista's work. Most are happy
  with a credit, but it's her relationship to manage.

### Reviews

The Reviews section is **hidden** until there's at least one real review in
`src/content/testimonials.json`. That's deliberate — invented reviews would
mislead a bride into booking.

Ask Krista for a few lines from past brides, or take them from her Instagram
comments with permission. For wedding bookings this does more work than any
amount of design.

---

## When she gets a domain

Add it in Vercel → **Settings** → **Domains**, then set one environment
variable:

| Name | Value |
|---|---|
| `SITE_URL` | `https://herdomain.ca` |

Redeploy. That's the whole job — the sitemap, canonical links, share card and
CMS login all follow it. Then update the OAuth App's **Homepage URL** and
**Redirect URI** from step 4b to the new address, or the CMS login breaks.

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
| `src/content/admin-config.yml` | What the CMS shows Krista |
| `src/pages/` | One file per page |
| `src/components/` | Nav, footer, reviews, the brand curve |
| `src/assets/photos/` | Photos. The build optimises them. |
| `src/styles/global.css` | Brand colours and shared styles |
| `api/` | The CMS login handler |
| `legacy/` | The original site, kept for reference. Not deployed. |
| `tools/` | One-off scripts used to prepare the logo and icons |

## Brand colours

Taken from Krista's own contract and price sheet, so the website matches the
documents her clients already receive. Defined once in `src/styles/global.css`
— please don't introduce new ones.

| | |
|---|---|
| Brown (text) | `#835741` |
| Blush | `#F1E4DD` |
| Cream (page) | `#FFFBFA` |
