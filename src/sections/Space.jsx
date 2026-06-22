import styles from './Space.module.css'
import spaceImg from '../assets/images/concept-store.webp'
import { useLanguage } from '../context/LanguageContext'

export default function Space() {
  const { t } = useLanguage()

  return (
    <section className={styles.space}>
      <div className={styles.inner}>
      <div className={styles.imageCol}>
        <img src={spaceImg} alt={t.space.imageAlt} className={styles.image} />
      </div>

      <div className={styles.textCol}>
        <span className={styles.eyebrow}>{t.space.eyebrow}</span>
        <h2 className={styles.heading}>
          {t.space.headingLine1}<br />
          <em>{t.space.headingLine2}</em>
        </h2>
        <p className={styles.intro}>
          {t.space.intro}
        </p>

        <div className={styles.offerings}>
          {t.space.offerings.map(({ label, text }) => (
            <div key={label} className={styles.offering}>
              <h4 className={styles.offeringLabel}>{label}</h4>
              <p className={styles.offeringText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
