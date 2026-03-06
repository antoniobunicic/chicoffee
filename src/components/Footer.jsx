import styles from './Footer.module.css'
import logoSvg from '../assets/images/logo.svg'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.brand}>
          <img src={logoSvg} alt="CHI Coffee" className={styles.logo} />
          <p className={styles.slogan}>Specialty Coffee Roasters • Slow Coffee Culture</p>
        </div>

        <div className={styles.contact}>
          <p className={styles.contactLabel}>Posjetite nas</p>
          <p>Preradovićeva 34, Zagreb</p>
          <a href="https://www.instagram.com/chicoffee.hr" target="_blank" rel="noopener noreferrer">
            @chicoffee.hr
          </a>
        </div>

        <div className={styles.hours}>
          <p className={styles.contactLabel}>Radno vrijeme</p>
          <p>Svaki dan: 08:00 – 20:00</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} CHI Coffee. Sva prava pridržana.</p>
      </div>
    </footer>
  )
}
