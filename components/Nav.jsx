'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Episodes', href: '/episodes' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          On <span className={styles.logoAccent}>Becoming</span>
        </Link>

        <div className={styles.links}>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.linkActive : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          className={styles.burger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      {open && (
        <div className={styles.dropdown}>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.dropdownLink} ${pathname === href ? styles.dropdownLinkActive : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
