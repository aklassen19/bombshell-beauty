/**
 * Step 1 of the CMS login: hand the editor off to GitHub.
 *
 * Decap's GitHub backend expects the site to provide its own OAuth handler
 * unless it is hosted on Netlify. This is that handler. It is a plain Vercel
 * function sitting next to the static site — the site itself stays static.
 *
 * The client secret lives only in the environment, never in the browser.
 */
import { randomBytes } from 'node:crypto';

export default function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    res.status(500).send('GITHUB_OAUTH_ID is not set on this deployment.');
    return;
  }

  // Guards against a third party kicking off a login and racing the callback.
  const state = randomBytes(16).toString('hex');
  res.setHeader(
    'Set-Cookie',
    `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
  );

  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  const redirectUri = `${proto}://${req.headers.host}/api/callback`;

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'repo,user');
  url.searchParams.set('state', state);

  res.redirect(302, url.toString());
}
