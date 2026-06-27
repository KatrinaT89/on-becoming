'use client'

import { useState } from 'react'
import Link from 'next/link'
import episodesData from '@/data/episodes.json'
import styles from './episodes.module.css'

export default function EpisodesClient() {
  const [openMap, setOpenMap] = useState({})

  function toggle(i) {
    setOpenMap(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <>
      {/* HEADER */}
      <section className={styles.headerSection}>
        <div className={styles.eyebrow}>The episodes</div>
        <h1 className={styles.h1}>
          Listen &amp; <span className={styles.h1Accent}>become</span>
        </h1>
        <p className={styles.headerIntro}>
          Honest, tender conversations on healing, identity, dating and the slow work of rebuilding. Read the notes, then press play wherever you are in your becoming.
        </p>
      </section>

      {/* EPISODE LIST */}
      <section className={styles.listSection}>
        {episodesData.episodes.map((ep, i) => {
          const isOpen = !!openMap[i]
          return (
            <div key={ep.num} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.epNum}>{ep.num}</span>
                <div>
                  <h3 className={styles.epTitle}>{ep.title}</h3>
                  <p className={styles.epTeaser}>{ep.teaser}</p>
                </div>
              </div>

              <div className={styles.cardActions}>
                <a
                  href={ep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.listenBtn}
                >
                  &#9654; Listen on Spotify
                </a>
                <button
                  className={styles.toggleBtn}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? 'Hide show notes' : 'Read show notes'}
                </button>
              </div>

              {isOpen && (
                <div className={styles.notes}>
                  {ep.paras.map((para, j) => (
                    <p key={j} className={styles.notesPara}>{para}</p>
                  ))}

                  {ep.extras.map((extra, j) => (
                    <div key={j} className={styles.extrasBlock}>
                      <div className={styles.extrasHeading}>{extra.heading}</div>
                      <ul className={styles.extrasList}>
                        {extra.items.map((item, k) => (
                          <li key={k} className={styles.extrasItem}>
                            <span className={styles.bullet}>&bull;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {ep.links.map((lnk, j) => (
                    <Link
                      key={j}
                      href={lnk.url}
                      className={styles.notesLink}
                    >
                      {lnk.label}
                    </Link>
                  ))}

                  <p className={styles.signoff}>{ep.signoff}</p>
                </div>
              )}
            </div>
          )
        })}
      </section>

    </>
  )
}
