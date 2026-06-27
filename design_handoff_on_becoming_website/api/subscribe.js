// Serverless function: add a subscriber to EmailOctopus.
// Works on Vercel (place in /api) or adapt for Netlify/Cloudflare.
// Reads secrets from environment variables — never expose these in client code:
//   EMAILOCTOPUS_API_KEY   – your EmailOctopus API key (emailoctopus.com → Settings → API)
//   EMAILOCTOPUS_LIST_ID   – the ID of the mailing list to add subscribers to

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;
  if (!API_KEY || !LIST_ID) {
    return res.status(500).json({ error: 'Newsletter is not configured.' });
  }

  try {
    // EmailOctopus API v2 (Bearer auth). https://emailoctopus.com/api-documentation
    const response = await fetch(
      `https://api.emailoctopus.com/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      }
    );

    const data = await response.json().catch(() => ({}));

    // Treat an already-subscribed contact as success.
    if (response.ok || data?.error?.code === 'CONFLICT' || data?.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return res.status(200).json({ ok: true });
    }

    return res.status(502).json({ error: 'Could not subscribe right now.' });
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach the newsletter service.' });
  }
}
