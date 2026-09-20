// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The site's own address, used for canonical links, the sitemap and the
 * social share card.
 *
 * There is no custom domain yet, so this follows whatever Vercel is serving:
 * VERCEL_PROJECT_PRODUCTION_URL is the stable production hostname. Pointing
 * these at a domain that does not exist would be worse than having no domain
 * at all — canonical tags would send search engines to a dead host and the
 * share card image would fail to load.
 *
 * When Krista has a real domain, set SITE_URL in Vercel's environment
 * variables (or replace this whole block) and redeploy.
 */
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  integrations: [sitemap()],
  image: {
    // Astro resizes and re-encodes everything in src/assets at build time.
    responsiveStyles: true,
  },
});
