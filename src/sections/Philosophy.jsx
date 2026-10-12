import { Link } from 'react-router-dom'
import styles from './Philosophy.module.css'
import { useLanguage } from '../context/LanguageContext'
import coverImg from '../assets/images/philosophy/pour-over-brewing.jpg'
import espressoImg from '../assets/images/philosophy/espresso-extraction.jpg'
import coffeeImg from '../assets/images/coffee.jpg'
import drippersImg from '../assets/images/philosophy/pour-over-drippers.jpg'
import shopImg from '../assets/images/coffee-boxes-table.jpg'
import locationsImg from '../assets/images/hero.webp'

function ArrowIcon() {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M0 12h38M28 2l10 10-10 10" />
    </svg>
  )
}

export default function Philosophy() {
  const { t } = useLanguage()
  const paras = t.philosophy.paragraphs

  const tiles = [
    { to: '/shop', img: shopImg, eyebrow: t.nav.shop, label: t.hero.shopCta },
    { to: '/lokacije', img: locationsImg, eyebrow: t.nav.kontakt, label: t.space.locationsCta },
  ]

  return (
    <>
      <div className={styles.hero}>
        <img src={coverImg} alt="" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>{t.philosophy.kicker}</p>
          <h1 className={styles.heroTitle}>{t.philosophy.motto}</h1>
        </div>
      </div>

      <section className={styles.body}>
        <p className={styles.intro}>{t.philosophy.lead}</p>
        {paras[0] && <p className={styles.lead}>{paras[0]}</p>}

        <div className={styles.imageBreak}>
          <img src={espressoImg} alt="" className={styles.breakImg} />
        </div>

        {paras[1] && <p className={styles.para}>{paras[1]}</p>}

        <div className={styles.imageBreak}>
          <img src={coffeeImg} alt="" className={styles.breakImg} />
        </div>

        {paras[2] && <p className={styles.para}>{paras[2]}</p>}

        <div className={`${styles.imageBreak} ${styles.imageBreakLast}`}>
          <img src={drippersImg} alt="" className={styles.breakImg} />
        </div>
      </section>

      <section className={styles.promise}>
        <p className={styles.promiseText}>{t.philosophy.closing}</p>
      </section>

      <nav className={styles.tiles} aria-label={t.philosophy.kicker}>
        {tiles.map(({ to, img, eyebrow, label }) => (
          <Link key={to} to={to} className={styles.tile}>
            <img src={img} alt="" className={styles.tileImg} />
            <span className={styles.tileShade} aria-hidden="true" />
            <span className={styles.tileContent}>
              <span className={styles.tileText}>
                <span className={styles.tileEyebrow}>{eyebrow}</span>
                <span className={styles.tileLabel}>{label}</span>
              </span>
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </nav>
    </>
  )
}
