# What's worth adding next

Eight things the site could gain, ordered by bookings won per dollar rather
than by how interesting they are to build. Prices checked **20 September 2026**
from each service's own pricing page; currencies are as each company bills.

The first two cost nothing, are Krista's to do in under an hour, and between
them do more than the other six combined.

---

### 1. Three reviews from past brides — free, Krista

`Testimonials.astro` is built and live, and renders **nothing** until there is
a real review in `src/content/testimonials.json`. Deliberate: an invented
review would mislead a bride into booking. Instagram comments count, with
permission.

### 2. A Google Business Profile — free, Krista

What "bridal makeup Edmonton" actually returns is a map and three businesses.
The website supports that listing; it does not replace it. Google verifies the
business first, which takes a few days. Reviews land here too, so this and the
item above feed each other.

### 3. An automatic "got it" reply — US$12/mo, or free + half a day

A bride currently sends her inquiry into silence until Krista answers.

- **Web3Forms Pro**, about US$12/month billed yearly, includes an
  autoresponder. Nothing to maintain. The free tier does not.
- **Or build it into the site**: an Astro server route plus a free email tier
  (3,000 emails a month, 100 a day) costs nothing per month but adds a moving
  part that can quietly stop working.

### 4. Deposits taken online — no monthly fee, per-transaction

A Square payment link turns "I'll e-transfer you" into a date actually held.
No monthly fee; Square Canada charges 2.6% + 15¢ tapped in person, 3.3% + 30¢
online. About an hour of work on the site.

The bigger version — **HoneyBook** (US$36/mo, US$29 paid yearly) or **Dubsado**
(US$35/mo) — also sends the contract and chases the balance. Worth it when the
admin hours cost more than the subscription, which is later than their sales
pages suggest.

### 5. Trials that book themselves — free, ~2 hours

**Square Appointments** is free for a single person: online booking, calendar
sync, email reminders.

**Only the trial.** A wedding date must never be self-bookable — it is quoted,
and depends on party size and travel. The inquiry form stays as it is for
weddings.

### 6. Her Instagram feed on the site — free tier, half a day

She posts every wedding already. **Behold** is free to 1,200 widget views a
month (with a small badge), US$10/mo above that.

**Condition:** since December 2024 Instagram only allows third-party feeds from
**Business** accounts. Hers may need switching over — free, but it changes how
her profile behaves. Confirm before promising it.

### 7. Three or four pages written for search — free, ~a day

What happens at a trial. How the wedding morning is timed. What travel costs
outside Edmonton. These are what brides type into Google, and a small site with
real answers can rank for them. Slow to pay off, and worthless if the answers
are filler rather than hers.

### 8. Gallery polish — free, half a day

Tap to enlarge; split bridal from party work. Last on purpose: it makes a good
gallery better, it does not put a bride in the gallery. **Real photos to fill
it matter more than this.**

---

## The one thing not to do: rebuild it in another framework

Nothing on this list is blocked by Astro. Astro runs server code on Vercel with
an adapter — API routes, form handling, sessions, per-visitor rendering — and
the paid items above are outside services that embed the same way into any
site. This site is static because a brochure site should be, not because Astro
could not do more.

The one honest reason to switch would be **brides logging in** to see their own
contract, timeline and payments. That is an app rather than a website, and even
then it should sit beside this site rather than replace it.

What a rewrite would cost: every page rebuilt, the CMS wiring and the
build-time image pipeline redone, a heavier site for eight pages and some
photos, and more to maintain on a project with no maintenance budget.
