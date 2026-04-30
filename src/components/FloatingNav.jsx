import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import CartIcon from './CartIcon'
import LogoCHI from './LogoCHI'
import styles from './FloatingNav.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'NAR Store', to: '/nar' },
  { label: 'Kontakt', to: '/kontakt' },
  { label: 'Webshop', to: '/webshop' },
]

export default function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <div className={styles.wrapper}>
        {!isHome && (
          <Link to="/" className={styles.logoLink}>
            <LogoCHI className={styles.logoMark} />
          </Link>
        )}

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label="Otvori meni"
        >
          <List size={24} weight="light" />
        </button>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.cartWrapper}>
          <CartIcon />
        </div>
      </div>

      {menuOpen && (
        <div className={styles.overlay}>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Zatvori meni"
          >
            <X size={28} weight="light" />
          </button>
          <nav className={styles.overlayNav}>
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.overlayLink} ${isActive ? styles.overlayActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
