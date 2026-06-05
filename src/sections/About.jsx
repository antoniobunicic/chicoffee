import styles from './About.module.css'
import vibeVideo from '../assets/videos/vibe.mp4'
import sketchSvg from '../assets/images/sketch-cups.svg'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="o-nama" className={styles.about}>
      <div className={styles.imageCol}>
        <video
          src={vibeVideo}
          className={styles.image}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.textCol}>
        <h2 className={styles.heading}>
          {t.about.heading}
        </h2>
        <p className={styles.body}>
          {t.about.body}
        </p>
        <img src={sketchSvg} alt="" className={styles.sketch} aria-hidden="true" />
      </div>
    </section>
  )
}
