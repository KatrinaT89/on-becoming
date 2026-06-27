'use client'

import { useState } from 'react'
import styles from './contact.module.css'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  function clearError() { setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a message so I know who I'm talking to.")
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("That email doesn't look quite right. Mind checking it?")
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      })
      if (res.ok) {
        setStatus('success')
        return
      }
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.error || 'request_failed')
    } catch (err) {
      setStatus('idle')
      setError(err.message === 'request_failed'
        ? 'Something went wrong sending your message. Please try again in a moment.'
        : err.message)
    }
  }

  const isForm = status === 'idle' || status === 'loading'

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.layout}>
          {/* LEFT */}
          <div>
            <div className={styles.eyebrow}>Say hello</div>
            <h1 className={styles.h1}>
              I'd love to hear <span className={styles.h1Accent}>from you.</span>
            </h1>
            <p className={styles.intro}>
              A question, a story, a guest idea, or just a note to say the podcast found you at the right time. It all means the world. Drop me a message and I'll be in touch.
            </p>
            <div
              className={styles.photo}
              role="img"
              aria-label="Katrina Thorpe at a cafe"
            />
            <div className={styles.socialsLabel}>Find me here</div>
            <div className={styles.socialsList}>
              <a
                href="https://www.instagram.com/onbecoming_podcast"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.socialArrow}>&rarr;</span>
                Instagram &middot; @onbecoming_podcast
              </a>
              {/* TODO: add Facebook link when available */}
              {/* TODO: add TikTok link when available */}
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.formCard}>
            {isForm && (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.field}>
                  <label className={styles.label}>Name</label>
                  <input
                    className={styles.input}
                    value={name}
                    onChange={e => { setName(e.target.value); clearError() }}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); clearError() }}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    className={styles.textarea}
                    value={message}
                    onChange={e => { setMessage(e.target.value); clearError() }}
                    placeholder="Write your message here..."
                  />
                </div>
                {error && <div className={styles.errorMsg}>{error}</div>}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}

            {status === 'success' && (
              <div className={styles.successState}>
                <div className={styles.successTitle}>Thank you.</div>
                <p className={styles.successText}>
                  Thanks for reaching out. I'll be in touch soon.
                  <span className={styles.successSignoff}>Katrina xx</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
