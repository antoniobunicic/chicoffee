import styles from './NarStore.module.css'
import sketchCeramics from '../assets/images/sketch-ceramics.svg'
import narImg1 from '../assets/images/nar/interior.webp'
import narImg2 from '../assets/images/nar/interior-2.webp'
import narCover from '../assets/images/nar/cover.webp'
import narLogo from '../assets/images/nar/nar.svg'
import gallery1 from '../assets/images/nar/gallery-1.webp'
import gallery2 from '../assets/images/nar/gallery-2.webp'
import gallery3 from '../assets/images/nar/gallery-3.webp'
import gallery4 from '../assets/images/nar/gallery-4.webp'
import { useLanguage } from '../context/LanguageContext'

const GALLERY = [
  { src: gallery1, alt: 'CHI x NAR' },
  { src: gallery2, alt: 'CHI x NAR' },
  { src: gallery3, alt: 'CHI x NAR' },
  { src: gallery4, alt: 'CHI x NAR' },
]

export default function NarStore() {
  const { t } = useLanguage()

  return (
    <section id="nar" className={styles.nar}>
      <div className={styles.coverWrapper}>
        <img src={narCover} alt="CHI x NAR" className={styles.cover} />
        <div className={styles.coverOverlay}>
<img src={narLogo} alt="NAR" className={styles.narLogoImg} />
          <em className={styles.headingSubtitle}>{t.nar.subtitle}</em>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <img src={sketchCeramics} alt="" className={styles.sketch} aria-hidden="true" />
          <p className={styles.body}>
            {t.nar.body1}
          </p>
          <p className={styles.body}>
            {t.nar.body2}
          </p>
        </div>

        <div className={styles.images}>
          <img src={narImg1} alt="NAR Concept Store" className={styles.narImg} />
          <img src={narImg2} alt="NAR keramika i tekstil" className={styles.narImg} />
        </div>
      </div>

      <div className={styles.gallery}>
        {GALLERY.map(({ src, alt }) => (
          <div key={src} className={styles.galleryItem}>
            <img src={src} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  )
}
