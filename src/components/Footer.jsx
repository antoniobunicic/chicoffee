import styles from './Footer.module.css'
import logoSvg from '../assets/images/logo.svg'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <img src={logoSvg} alt="CHI Coffee" className={styles.logo} />
          <p className={styles.slogan}>{t.footer.slogan}</p>
        </div>

        <div className={styles.contact}>
          <p className={styles.contactLabel}>{t.footer.visitLabel}</p>
          <p>Preradovićeva 34, Zagreb</p>
          <a href="https://www.instagram.com/chispecialtycoffee" target="_blank" rel="noopener noreferrer">
            @chispecialtycoffee
          </a>
        </div>

        <div className={styles.hours}>
          <p className={styles.contactLabel}>{t.footer.hoursLabel}</p>
          <p>{t.footer.hoursValue}</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} CHI Coffee. {t.footer.rights}</p>
      </div>
    </footer>
  )
}
