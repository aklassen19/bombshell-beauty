/**
 * Step 2 of the CMS login: swap GitHub's code for a token and hand it back.
 *
 * Decap opens /api/auth in a popup and waits for that popup to postMessage a
 * token to it. This page completes the exchange server-side and performs that
 * handshake, then closes itself.
 */

/** Only ever post the token back to the site that opened the popup. */
function escapeJs(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function page(status, payload) {
  const message = escapeJs(`authorization:github:${status}:${JSON.stringify(payload)}`);
  return `<!doctype html>
<meta charset="utf-8">
<title>Signing in…</title>
<body style="font-family:system-ui;padding:40px;text-align:center;color:#835741;background:#fffbfa">
<p>Finishing sign-in…</p>
<script>
(function () {
  var message = ${message};
  function send(e) {
    if (!window.opener) return;
    window.opener.postMessage(message, e.origin);
    window.removeEventListener('message', send, false);
    setTimeout(function () { window.close(); }, 400);
  }
  window.addEventListener('message', send, false);
  // Decap replies to this with its own origin, which is what we post to.
  if (window.opener) window.opener.postMessage('authorizing:github', '*');
  else document.body.innerHTML = '<p>Open the CMS at /admin/ and sign in from there.</p>';
})();
</script>
</body>`;
}

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  const clientSecret = process.env.GITHUB_OAUTH_SECRET;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!clientId || !clientSecret) {
    res
      .status(500)
      .send(page('error', { message: 'OAuth is not configured on this deployment.' }));
    return;
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookie = req.headers.cookie ?? '';
  const expected = cookie.match(/decap_oauth_state=([a-f0-9]+)/)?.[1];

  // Clear the one-shot state cookie either way.
  res.setHeader(
    'Set-Cookie',
    'decap_oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
  );

  if (!code) {
    res.status(400).send(page('error', { message: 'GitHub did not return a code.' }));
    return;
  }

  if (!state || state !== expected) {
    res
      .status(400)
      .send(page('error', { message: 'Sign-in expired. Please try again.' }));
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok || data.error || !data.access_token) {
      res
        .status(401)
        .send(page('error', { message: data.error_description ?? 'GitHub refused the sign-in.' }));
      return;
    }

    res.status(200).send(page('success', { token: data.access_token, provider: 'github' }));
  } catch {
    res
      .status(502)
      .send(page('error', { message: 'Could not reach GitHub. Please try again.' }));
  }
}
