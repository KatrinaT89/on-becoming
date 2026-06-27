import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>
              On <span className={styles.logoAccent}>Becoming</span>
            </div>
            <p className={styles.tagline}>
              A safe, beautiful space for women becoming themselves again, with Katrina Thorpe.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/onbecoming_podcast"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialsLink}
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <div className={styles.stayHeading}>Stay close</div>
            <p className={styles.stayText}>New episodes &amp; reflections, straight to your inbox.</p>
            <div className={styles.emailRow}>
              <input
                placeholder="Your email"
                className={styles.emailInput}
                aria-label="Email address"
              />
              <Link href="/newsletter" className={styles.joinBtn}>
                Join
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 On Becoming with Katrina Thorpe</span>
          <span>Listen wherever you get your podcasts</span>
        </div>
      </div>
    </footer>
  )
}
