import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useLanguage } from '../context/LanguageContext'
import { legal, LEGAL_PAGES } from '../i18n/legal'

const FOOTER_LINKS = [
  { key: 'home', to: '/' },
  { key: 'philosophy', to: '/philosophy' },
  { key: 'nar', to: '/nar' },
  { key: 'kontakt', to: '/lokacije' },
  { key: 'webshop', to: '/webshop' },
]

export default function Footer() {
  const { t, lang } = useLanguage()
  const footerRef = useRef(null)

  // Publish the footer's height so the content above can reserve exactly that
  // much bottom margin — the space that reveals the fixed footer on scroll.
  useLayoutEffect(() => {
    const el = footerRef.current
    if (!el) return
    const setHeight = () =>
      document.documentElement.style.setProperty('--footer-height', `${el.offsetHeight}px`)
    setHeight()
    const observer = new ResizeObserver(setHeight)
    observer.observe(el)
    return () => observer.disconnect()
  }, [lang])

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <span className={styles.logo} role="img" aria-label="CHI Coffee" />
        </div>

        <nav className={styles.nav}>
          <p className={styles.contactLabel}>{t.footer.menuLabel}</p>
          {FOOTER_LINKS.map(({ key, to }) => (
            <Link key={to} to={to} className={styles.navLink}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>

        <div className={styles.visit}>
          <p className={styles.contactLabel}>{t.footer.visitTitle}</p>

          <div className={styles.locGrid}>
            <div className={styles.footerLoc}>
              <p className={styles.footerLocName}>Zagreb</p>
              <p>{t.footer.hoursZagreb}</p>
            </div>

            <div className={styles.footerLoc}>
              <p className={styles.footerLocName}>Trogir</p>
              <p>
                {t.footer.hoursTrogir.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className={styles.footerContact}>
            <a href="mailto:chi_coffee@yahoo.com">chi_coffee@yahoo.com</a>
            <a href="https://www.instagram.com/chispecialtycoffee" target="_blank" rel="noopener noreferrer">
              @chispecialtycoffee
            </a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <nav className={styles.legal} aria-label={t.footer.legalLabel}>
          {LEGAL_PAGES.map(({ key, slug }) => (
            <Link key={key} to={slug} className={styles.legalLink}>
              {legal[lang][key].title}
            </Link>
          ))}
        </nav>
        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} CHI Coffee. {t.footer.rights}</p>
          <a
            href="https://vreva.hr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.vreva}
            aria-label="Vreva"
          >
            <span className={styles.vrevaLogo} role="img" aria-label="Vreva" />
          </a>
        </div>
      </div>
    </footer>
  )
}
