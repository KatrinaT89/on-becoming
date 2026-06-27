import Link from 'next/link'
import styles from './home.module.css'

const latestEpisodes = [
  {
    num: '09',
    title: 'Who Do I Think I Am?',
    teaser: 'Getting honest about imposter syndrome and self-doubt, and how to back yourself anyway when the voice asks who do you think you are.',
    url: 'https://open.spotify.com/episode/4nN5OHVKUgGfwtMKrsXASo',
  },
  {
    num: '08',
    title: 'Dating After Divorce, Part 2',
    teaser: "The lessons, the mistakes I'll happily admit, and the realisations that changed how I showed up in dating.",
    url: 'https://open.spotify.com/episode/4Y7ELPzb5Wy6VpSZncvJiF',
  },
  {
    num: '07',
    title: 'Dating After Divorce, Part 1',
    teaser: 'Modern dating after my marriage ended. Situationships, standards and self-worth, because dating is about finding yourself again too.',
    url: 'https://open.spotify.com/episode/4pLNHvnXfdV7bcEwIhsRTO',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.eyebrow}>A podcast for women starting over</div>
            <h1 className={styles.h1}>
              On
              <span className={styles.h1Italic}>Becoming</span>
            </h1>
            <p className={styles.heroTagline}>
              Honest conversations about healing, identity and building a beautiful life after divorce, with Katrina Thorpe.
            </p>
            <div className={styles.heroCta}>
              <a
                href="https://open.spotify.com/show/2M1x3mbVqhngqItLNyae3k"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaSpotify}
              >
                Listen on Spotify
              </a>
              <Link href="/about" className={styles.ctaMeet}>
                Meet Katrina
              </Link>
            </div>
          </div>

          <div className={styles.heroImageWrap}>
            <div className={styles.archPortrait} role="img" aria-label="Portrait of Katrina Thorpe" />
          </div>
        </div>
      </section>

      {/* WHAT THIS PODCAST IS ABOUT */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutEyebrow}>What this podcast is about</div>
          <p className={styles.aboutStatement}>
            If you're rebuilding your life after a divorce or a breakup, you don't have to do it alone.{' '}
            <span className={styles.pinkItalic}>On Becoming</span> is the warm, honest voice that reminds you who you are.
          </p>
          <div className={styles.chips}>
            {['Healing', 'Identity', 'Dating again', 'Friendship', 'Money', 'Mindset'].map(chip => (
              <span key={chip} className={styles.chip}>{chip}</span>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST EPISODES */}
      <section className={styles.epsSection}>
        <div className={styles.epsHeader}>
          <div className={styles.epsEyebrow}>Latest episodes</div>
          <h2 className={styles.epsHeading}>New this season</h2>
        </div>

        <div>
          {latestEpisodes.map((ep, i) => (
            <div
              key={ep.num}
              className={`${styles.epRow} ${i === latestEpisodes.length - 1 ? styles.epRowLast : ''}`}
            >
              <div className={styles.epNum}>{ep.num}</div>
              <div className={styles.epBody}>
                <h3 className={styles.epTitle}>{ep.title}</h3>
                <p className={styles.epTeaser}>{ep.teaser}</p>
              </div>
              <a
                href={ep.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.spotifyLink}
              >
                Spotify &rarr;
              </a>
            </div>
          ))}
        </div>

        <div className={styles.epsCta}>
          <Link href="/episodes" className={styles.browseBtn}>
            Browse all episodes
          </Link>
        </div>
      </section>

      {/* JOIN THE COMMUNITY */}
      <section className={styles.communitySection}>
        <div className={styles.communityInner}>
          <h2 className={styles.communityHeading}>
            Join the <span className={styles.pinkLightItalic}>community</span>
          </h2>
          <p className={styles.communityText}>
            Get new episodes and quiet reflections straight to your inbox. No noise, just a little encouragement when you need it.
          </p>
          <div className={styles.communityForm}>
            <input
              placeholder="Your email"
              className={styles.communityInput}
              aria-label="Email address"
            />
            <Link href="/newsletter" className={styles.subscribeBtn}>
              Subscribe
            </Link>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteInner}>
          <div className={styles.quoteDivider} />
          <p className={styles.quoteText}>
            Some seasons break you open. This is the podcast I needed in mine. Honest, tender, and quietly hopeful. Wherever you are in your becoming,{' '}
            <em className={styles.pinkItalic}>you are so welcome here.</em>
          </p>
          <div className={styles.quoteAttribution}>Katrina</div>
        </div>
      </section>
    </>
  )
}
