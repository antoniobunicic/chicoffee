import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import CartIcon from './CartIcon'
import LogoCHI from './LogoCHI'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../context/LanguageContext'
import styles from './FloatingNav.module.css'

const NAV_LINKS = [
  { key: 'home', to: '/' },
  { key: 'nar', to: '/nar' },
  { key: 'kontakt', to: '/kontakt' },
  { key: 'webshop', to: '/webshop' },
]

export default function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLanguage()
  const isHome = pathname === '/'

  return (
    <>
      <div className={styles.wrapper}>
        {!isHome && (
          <div className={styles.leftGroup}>
            <Link to="/" className={styles.logoLink}>
              <LogoCHI className={styles.logoMark} />
            </Link>
          </div>
        )}

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label={t.nav.openMenu}
        >
          <List size={24} weight="light" />
        </button>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ key, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className={styles.rightGroup}>
          <LanguageSwitch className={styles.langSwitch} />
          <CartIcon />
        </div>
      </div>

      {menuOpen && (
        <div className={styles.overlay}>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label={t.nav.closeMenu}
          >
            <X size={28} weight="light" />
          </button>
          <nav className={styles.overlayNav}>
            {NAV_LINKS.map(({ key, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.overlayLink} ${isActive ? styles.overlayActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[key]}
              </NavLink>
            ))}
          </nav>
          <LanguageSwitch className={styles.overlayLangSwitch} />
        </div>
      )}
    </>
  )
}
