import Link from 'next/link'
import styles from './about.module.css'

export const metadata = {
  title: 'About Katrina Thorpe | On Becoming Podcast',
  description: "Meet Katrina Thorpe, host of On Becoming. After her own divorce, she created the honest, warm conversations she needed most — and couldn't find.",
}

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>Meet Katrina</div>
            <h1 className={styles.h1}>
              Hi, I'm <span className={styles.h1Accent}>Katrina.</span>
            </h1>
            <p className={styles.heroIntro}>
              I'm the voice behind On Becoming. A few years ago my marriage ended, and with it, the version of life I thought I'd have forever. This podcast is everything I wish someone had said to me back then.
            </p>
          </div>
          <div className={styles.heroImageWrap}>
            <div className={styles.heroPortrait} role="img" aria-label="Portrait of Katrina Thorpe" />
          </div>
        </div>
      </section>

      {/* MY JOURNEY */}
      <section className={styles.storySection}>
        <h2 className={styles.h2}>My journey</h2>
        <p className={styles.storyPara}>
          When my marriage ended, I didn't just lose a relationship. I lost the story I'd built my whole identity around. For a while, I didn't recognise the woman in the mirror.
        </p>
        <p className={styles.storyPara}>
          The months that followed were the hardest, loneliest and, strangely, the most transformative of my life. Slowly, through a lot of trial and error and a few too many late nights, I started to rebuild. Not back into who I was, but forward into someone I actually liked.
        </p>
      </section>

      {/* LIFE OUTSIDE THE MIC */}
      <section className={styles.lifeSection}>
        <div className={styles.lifeEyebrow}>Life outside the mic</div>
        <div className={styles.lifeGrid}>
          <div
            className={styles.lifePhoto}
            style={{ backgroundImage: "url('/assets/life-lake.jpeg')", backgroundPosition: '40% 50%' }}
            role="img"
            aria-label="Katrina at a lake"
          />
          <div
            className={styles.lifePhoto}
            style={{ backgroundImage: "url('/assets/life-fishing.jpeg')", backgroundPosition: '50% 35%' }}
            role="img"
            aria-label="Katrina fishing"
          />
          <div
            className={styles.lifePhoto}
            style={{ backgroundImage: "url('/assets/life-boat.jpeg')", backgroundPosition: '50% 35%' }}
            role="img"
            aria-label="Katrina on a boat"
          />
        </div>
      </section>

      {/* WHY I STARTED */}
      <section className={styles.storySection}>
        <h2 className={styles.h2}>Why I started On Becoming</h2>
        <p className={styles.storyPara}>
          I started this podcast because the conversations I needed most were the ones nobody was having out loud. The messy middle. The 3am questions. The grief that hides inside a 'fresh start.'
        </p>
        <p className={styles.storyPara}>
          I wanted to create the warm, honest voice I went looking for and couldn't find, for the woman sitting exactly where I once sat, wondering if she'd ever feel like herself again.
        </p>
      </section>

      {/* PULL QUOTE */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteInner}>
          <p className={styles.quoteText}>
            You are not starting over. You are starting from experience, and becoming someone you were always meant to be.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            Come sit with <span className={styles.ctaAccent}>me</span>
          </h2>
          <p className={styles.ctaText}>
            Start with an episode, or join the community and we'll stay in touch.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/episodes" className={styles.btnPink}>Browse episodes</Link>
            <Link href="/newsletter" className={styles.btnOutlineLight}>Join the community</Link>
          </div>
        </div>
      </section>

      {/* WHAT I HOPE YOU FEEL */}
      <section className={`${styles.storySection} ${styles.storySectionFinal}`}>
        <h2 className={styles.h2}>What I hope you feel</h2>
        <p className={styles.storyPara}>
          More than anything, I want you to feel less alone. Whether you're in the rawest early days or finally finding your feet again, I hope this space feels like a friend who truly gets it.
        </p>
        <p className={styles.storyPara}>
          There's no timeline here, and no 'right' way to heal. Just honest conversation, gentle encouragement, and the quiet reminder that you are becoming, and you are so welcome here.
        </p>
        <p className={styles.signoff}>Katrina xx</p>
      </section>
    </>
  )
}
