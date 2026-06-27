// Serverless function: send a contact-form submission to Katrina via Resend.
// Works on Vercel (place in /api) or adapt for Netlify/Cloudflare.
// Reads secrets from environment variables — never expose these in client code:
//   RESEND_API_KEY      – your Resend API key (resend.com → API Keys)
//   CONTACT_TO_EMAIL    – the address that should receive form submissions (Katrina's email)
//   CONTACT_FROM_EMAIL  – a verified sender on your Resend domain, e.g. "On Becoming <hello@onbecoming.com>"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !message || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Please complete all fields with a valid email.' });
  }

  const API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO_EMAIL;
  const FROM = process.env.CONTACT_FROM_EMAIL;
  if (!API_KEY || !TO || !FROM) {
    return res.status(500).json({ error: 'Contact form is not configured.' });
  }

  const esc = (s) => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `
    <div style="font-family:Arial,sans-serif;color:#1e1e1e;line-height:1.6;">
      <h2 style="color:#c48a9a;margin:0 0 16px;">New message from On Becoming</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#faf8f6;border-left:3px solid #c48a9a;padding:14px 18px;border-radius:4px;">${esc(message)}</p>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `On Becoming — message from ${name}`,
        html,
      }),
    });

    if (response.ok) {
      return res.status(200).json({ ok: true });
    }
    return res.status(502).json({ error: 'Could not send your message right now.' });
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach the email service.' });
  }
}
