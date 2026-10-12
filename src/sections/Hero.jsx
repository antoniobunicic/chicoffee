import { Link } from 'react-router-dom'
import styles from './Hero.module.css'
import heroImg from '../assets/images/coffee-beans.jpg'
import LogoAnimated from '../components/LogoAnimated'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.overlay} />
      <a
        href="https://www.instagram.com/chispecialtycoffee"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.signature}
      >@chispecialtycoffee</a>
      <Link to="/shop" className={styles.logoLink}>
        <LogoAnimated className={styles.logo} />
        <span className={styles.cta}>{t.hero.shopCta}</span>
      </Link>
    </section>
  )
}
