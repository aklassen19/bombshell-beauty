# Wording changes — 22 September 2026

Every line changed in the copy review, with what it said before, so any of
them can be put back. To undo all of them at once: `git revert` the commit
that added this file.

**Four were statements about Krista nobody had confirmed** (marked *unchecked
claim*). If she says the original is true, it can go back word for word.

## 1. `src/pages/index.astro`

*Unchecked claim — nobody confirmed she limits bookings or that dates go early.*

- **Was:** Krista takes a limited number of weddings each season, and dates go early.
- **Now:** Krista can only be at one wedding a day, so it is worth checking your date early.

## 2. `src/pages/gallery.astro`

*Unchecked claim — the photos may have been edited by the photographers.*

- **Was:** Real brides, real mornings, no filters doing the heavy lifting.
- **Now:** Real brides on their real wedding mornings.

## 3. `src/pages/gallery.astro`

*Unchecked claim — a promise she would have to keep up.*

- **Was:** <h2>She posts every wedding.</h2>
- **Now:** <h2>See her latest weddings.</h2>

## 4. `src/pages/gallery.astro`

*Goes with the heading above.*

- **Was:** The gallery is a selection. {site.instagramHandle} is the whole story, updated through the season.
- **Now:** The gallery is a selection. Follow {site.instagramHandle} for more of her work.

## 5. `src/pages/about.astro`

*Spoke for Krista in words she never said.*

- **Was:** The look itself is soft, luminous and deliberately yours. Krista is not interested in sending you down the aisle as a version of somebody else, and she would rather spend an extra ten minutes on a trial than have you spend the day adjusting.
- **Now:** The look itself is soft, luminous and built around you. The trial is where you settle it together, with time to change anything before the day, so the morning of holds no surprises.

## 6. `src/pages/about.astro`

*Canadian spelling.*

- **Was:** specialising
- **Now:** specializing

## 7. `src/content/faq.json`

*"styled-free" was garbled; "Arrive" was wrong (Krista comes to you); Canadian spelling.*

- **Was:** Arrive with a clean, moisturised face and dry, fully styled-free hair, unless Krista has told you otherwise.
- **Now:** Have a clean, moisturized face and clean, dry hair with no product in it, unless Krista has told you otherwise.

## 8. `src/pages/index.astro`

*Read backwards — the date was "held while you decide" after she had already signed.*

- **Was:** copy: `You get a contract and a quote. Sign it with a ${site.depositPercent}% deposit and the date is yours. It is held for one week while you decide.`,
- **Now:** copy: `Krista sends a quote and a contract, and holds your date for one week while you decide. Sign it with a ${site.depositPercent}% deposit and the date is yours.`,

## 9. `src/pages/services.astro`

*Travel prices are listed right there, so "quoted" was misleading; "per person unless noted" contradicted the per-person labels.*

- **Was:** Prices are per person unless noted. Travel is quoted with your package. Full terms
- **Now:** Travel is added to your quote at the rates above. Full terms

## 10. `src/content/services.json`

*Same travel line appeared twice on the page.*

- **Was:** "note": "All services are on location. Travel is quoted with your package."
- **Now:** "note": "Every service comes to you, wherever you are getting ready."

## 11. `src/pages/book.astro`

*Contradicted "Nothing here commits you to anything" (this one IS from her old site).*

- **Was:** <p class="eyebrow">Let's make it official</p>
- **Now:** <p class="eyebrow">Start here</p>

## 12. `src/pages/book.astro`

*Matches the price list's "up to age 16". ⚠️ Ask Krista whether a 16-year-old counts as a junior.*

- **Was:** <label for="num_jr">Under 16</label>
- **Now:** <label for="num_jr">Juniors, up to 16</label>

## 13. `src/pages/book.astro`

*Same, in the email Krista receives.*

- **Was:** num_jr: 'Under 16',
- **Now:** num_jr: 'Juniors, up to 16',

## 14. `src/pages/index.astro`

*"Two chairs" meant nothing to a bride.*

- **Was:** <h2>Two chairs, one artist,<br />no scramble at 7am.</h2>
- **Now:** <h2>Hair and makeup, one artist,<br />no 7am scramble.</h2>

## 15. `src/pages/book.astro`

*"Ready by" didn't say ready for what.*

- **Was:** <label for="start_time">Ready by</label>
- **Now:** <label for="start_time">Everyone ready by</label>

## 16. `src/pages/book.astro`

*Hint added under the field.*

- **Was:** placeholder="e.g. 1:00pm" /> </p>
- **Now:** placeholder="e.g. 1:00pm" /> <span class="hint">Usually when your photographer arrives.</span> </p>

## 17. `src/pages/book.astro`

*Same, in the email Krista receives.*

- **Was:** start_time: 'Ready by',
- **Now:** start_time: 'Everyone ready by',

## 18. `src/content/services.json`

*Read as if it depended on the bride's appointment; the FAQ says it's Krista's departure time.*

- **Was:** "name": "Early morning fee, 7am or earlier"
- **Now:** "name": "Early morning fee, if Krista leaves home by 7am"
