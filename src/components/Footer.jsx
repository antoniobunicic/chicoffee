import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useLanguage } from '../context/LanguageContext'

const FOOTER_LINKS = [
  { key: 'home', to: '/' },
  { key: 'philosophy', to: '/philosophy' },
  { key: 'nar', to: '/nar' },
  { key: 'kontakt', to: '/lokacije' },
  { key: 'webshop', to: '/webshop' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
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

        <div className={styles.contact}>
          <p className={styles.contactLabel}>{t.footer.visitLabel}</p>
          <a href="https://www.instagram.com/chispecialtycoffee" target="_blank" rel="noopener noreferrer">
            @chispecialtycoffee
          </a>
          <a href="mailto:chi_coffee@yahoo.com">chi_coffee@yahoo.com</a>
        </div>

        <div className={styles.hours}>
          <p className={styles.contactLabel}>{t.footer.locationsLabel}</p>

          <div className={styles.footerLoc}>
            <p className={styles.footerLocName}>Zagreb</p>
            <p>{t.footer.hoursZagreb}</p>
          </div>

          <div className={styles.footerLoc}>
            <p className={styles.footerLocName}>Trogir</p>
            <p>
              {t.footer.hoursTrogir.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.footer.hoursTrogir.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} CHI Coffee. {t.footer.rights}</p>
      </div>
    </footer>
  )
}
