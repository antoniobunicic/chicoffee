import styles from './Story.module.css'
import storyVideo from '../assets/videos/coffee-process.mp4'
import { useLanguage } from '../context/LanguageContext'

export default function Story() {
  const { t } = useLanguage()

  return (
    <section className={styles.story}>
      <video
        src={storyVideo}
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.textCol}>
          <div className={styles.textContent}>
            <span className={styles.eyebrow}>{t.story.eyebrow}</span>
            <h2 className={styles.heading}>
              {t.story.heading}
            </h2>
            <p className={styles.lead}>
              {t.story.lead}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
