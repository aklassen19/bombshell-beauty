import type { APIRoute } from 'astro';
import raw from '../../content/admin-config.yml?raw';

/**
 * Serves the CMS config with the site's real address filled in.
 *
 * Decap needs an absolute `base_url` to send the GitHub login off to, and
 * there is no custom domain yet — so the address is whatever Astro was built
 * with (see astro.config.mjs) rather than something hardcoded that would go
 * stale the moment a domain is connected.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = (site?.origin ?? 'http://localhost:4321').replace(/\/$/, '');

  return new Response(raw.replaceAll('__SITE_URL__', origin), {
    headers: { 'Content-Type': 'text/yaml; charset=utf-8' },
  });
};
