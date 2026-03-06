import styles from './Hero.module.css'
import heroImg from '../assets/images/hero.webp'
import LogoAnimated from '../components/LogoAnimated'

export default function Hero() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.overlay} />
      <a
        href="https://www.instagram.com/chicoffee.hr"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.signature}
      >@chicoffee.hr</a>
      <div className={styles.logoWrapper}>
        <LogoAnimated className={styles.logo} />
      </div>
    </section>
  )
}
