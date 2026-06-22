import styles from './Philosophy.module.css'
import { useLanguage } from '../context/LanguageContext'
import coverImg from '../assets/images/philosophy/pour-over-brewing.jpg'
import espressoImg from '../assets/images/philosophy/espresso-extraction.jpg'
import coffeeImg from '../assets/images/coffee.jpg'
import drippersImg from '../assets/images/philosophy/pour-over-drippers.jpg'
import sketchSvg from '../assets/images/sketch-cups.svg'

export default function Philosophy() {
  const { t } = useLanguage()
  const paras = t.philosophy.paragraphs

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

        <div className={styles.imageBreak}>
          <img src={espressoImg} alt="" className={styles.breakImg} />
        </div>

        <div className={styles.paragraphs}>
          {paras[0] && <p className={styles.para}>{paras[0]}</p>}
          {paras[1] && <p className={styles.para}>{paras[1]}</p>}
        </div>

        <div className={styles.imageBreak}>
          <img src={coffeeImg} alt="" className={styles.breakImg} />
        </div>

        {paras[2] && (
          <div className={styles.paragraphs}>
            <p className={styles.para}>{paras[2]}</p>
          </div>
        )}

        <div className={styles.imageBreak}>
          <img src={drippersImg} alt="" className={styles.breakImg} />
        </div>

        <p className={styles.closing}>{t.philosophy.closing}</p>

        <img src={sketchSvg} alt="" className={styles.sketch} aria-hidden="true" />
      </section>
    </>
  )
}
