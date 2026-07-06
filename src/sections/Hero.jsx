import styles from './Hero.module.css'
import heroImg from '../assets/images/coffee-beans.jpg'
import LogoAnimated from '../components/LogoAnimated'

export default function Hero() {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.overlay} />
      <a
        href="https://www.instagram.com/chispecialtycoffee"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.signature}
      >@chispecialtycoffee</a>
      <div className={styles.logoWrapper}>
        <LogoAnimated className={styles.logo} />
      </div>
    </section>
  )
}
