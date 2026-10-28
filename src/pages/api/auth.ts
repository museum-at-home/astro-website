export async function GET({ url }: any) {
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  const clientId = import.meta.env.GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;
  const redirectUri = `${url.origin}/api/auth`;

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(`Error: ${tokenData.error_description}`, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // Return HTML that posts token back to CMS
    return new Response(
      `
      <script>
        if (window.opener) {
          window.opener.postMessage({
            type: 'authorization:github',
            payload: {
              token: '${accessToken}'
            }
          }, window.location.origin);
          window.close();
        } else {
          document.body.innerHTML = '<h1>Authorization successful!</h1><p>You can now close this window.</p>';
        }
      </script>
      `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
