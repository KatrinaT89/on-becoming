'use client'

import { useState } from 'react'
import styles from './newsletter.module.css'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function NewsletterClient() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setError("Hmm, that email doesn't look quite right. Mind checking it?")
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
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
        ? 'Something went wrong on our end. Please try again in a moment.'
        : err.message)
    }
  }

  const isForm = status === 'idle' || status === 'loading'

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.card}>
          {/* LEFT: copy + form */}
          <div className={styles.cardLeft}>
            <div className={styles.eyebrow}>The community</div>
            <h1 className={styles.h1}>
              You don't have to figure this out{' '}
              <span className={styles.h1Accent}>alone.</span>
            </h1>
            <p className={styles.intro}>
              Join a quiet, kind corner of the internet. Sign up and the first thing you'll get is my free guide,{' '}
              <span className={styles.introItalic}>Becoming Her: A Strategic Identity Reset</span>. After that, expect:
            </p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>
                <span className={styles.bulletDot}>&bull;</span>
                Your free guide, the moment you join
              </li>
              <li className={styles.bullet}>
                <span className={styles.bulletDot}>&bull;</span>
                New episodes the moment they drop
              </li>
              <li className={styles.bullet}>
                <span className={styles.bulletDot}>&bull;</span>
                Honest reflections and little encouragements. No spam, ever.
              </li>
            </ul>

            {isForm && (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="Your email address"
                  className={styles.emailInput}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Join the community'}
                </button>
                {error && <div className={styles.errorMsg}>{error}</div>}
                <div className={styles.finePrint}>
                  By subscribing you agree to receive emails from On Becoming. Unsubscribe anytime.
                </div>
              </form>
            )}

            {status === 'success' && (
              <div className={styles.successCard}>
                <div className={styles.successTitle}>You're in.</div>
                <p className={styles.successText}>
                  So glad you're here. Keep an eye on your inbox, your free guide is on its way. Katrina xx
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: image */}
          <div className={styles.cardImage} role="img" aria-label="Katrina Thorpe" />
        </div>
      </section>
    </div>
  )
}
