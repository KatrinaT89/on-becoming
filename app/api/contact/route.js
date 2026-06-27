export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const { name, email, message } = body

  if (!name || !message || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'Please complete all fields with a valid email.' }, { status: 400 })
  }

  const API_KEY = process.env.RESEND_API_KEY
  const TO = process.env.CONTACT_TO_EMAIL
  const FROM = process.env.CONTACT_FROM_EMAIL

  if (!API_KEY || !TO || !FROM) {
    console.warn('[contact] RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL not set')
    return Response.json({ error: 'Contact form is not configured.' }, { status: 500 })
  }

  const esc = s => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const html = `
    <div style="font-family:Arial,sans-serif;color:#1e1e1e;line-height:1.6;">
      <h2 style="color:#c48a9a;margin:0 0 16px;">New message from On Becoming</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#faf8f6;border-left:3px solid #c48a9a;padding:14px 18px;border-radius:4px;">${esc(message)}</p>
    </div>`

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
        subject: `On Becoming -- message from ${name}`,
        html,
      }),
    })

    if (response.ok) return Response.json({ ok: true })
    return Response.json({ error: 'Could not send your message right now.' }, { status: 502 })
  } catch {
    return Response.json({ error: 'Could not reach the email service.' }, { status: 502 })
  }
}
