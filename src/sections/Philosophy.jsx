import styles from './Philosophy.module.css'
import { useLanguage } from '../context/LanguageContext'
import coverImg from '../assets/images/philosophy/pour-over-brewing.jpg'
import midImg from '../assets/images/coffee.jpg'
import sketchSvg from '../assets/images/sketch-cups.svg'

export default function Philosophy() {
  const { t } = useLanguage()

  return (
    <>
      <div className={styles.hero}>
        <img src={coverImg} alt="" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t.philosophy.title}</h1>
        </div>
      </div>

      <section className={styles.body}>
        <p className={styles.lead}>{t.philosophy.lead}</p>

        <div className={styles.paragraphs}>
          {t.philosophy.paragraphs.map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
        </div>

        <div className={styles.imageBreak}>
          <img src={midImg} alt="" className={styles.breakImg} />
        </div>

        <p className={styles.closing}>{t.philosophy.closing}</p>

        <img src={sketchSvg} alt="" className={styles.sketch} aria-hidden="true" />
      </section>
    </>
  )
}
