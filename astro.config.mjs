// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update this when the real domain is connected — it is what generates the
// absolute URLs in sitemap.xml and the social share tags.
export const SITE = 'https://blondebombshellbeauty.ca';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  image: {
    // Astro resizes and re-encodes everything in src/assets at build time.
    responsiveStyles: true,
  },
});
