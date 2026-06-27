export async function POST(request) {
  const body = await request.json().catch(() => ({}))
  const { email } = body

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 })
  }

  const API_KEY = process.env.EMAILOCTOPUS_API_KEY
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

  if (!API_KEY || !LIST_ID) {
    console.warn('[subscribe] EMAILOCTOPUS_API_KEY or EMAILOCTOPUS_LIST_ID not set')
    return Response.json({ error: 'Newsletter is not configured.' }, { status: 500 })
  }

  try {
    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: API_KEY, email_address: email, status: 'SUBSCRIBED' }),
    })

    const data = await response.json().catch(() => ({}))

    if (
      response.ok ||
      data?.error?.code === 'CONFLICT' ||
      data?.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS'
    ) {
      return Response.json({ ok: true })
    }

    return Response.json({ error: 'Could not subscribe right now.' }, { status: 502 })
  } catch {
    return Response.json({ error: 'Could not reach the newsletter service.' }, { status: 502 })
  }
}
