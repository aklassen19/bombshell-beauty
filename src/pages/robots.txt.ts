import type { APIRoute } from 'astro';

/** Keeps the sitemap line pointing at wherever the site actually lives. */
export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? 'http://localhost:4321').replace(/\/$/, '');

  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${origin}/sitemap-index.xml
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
