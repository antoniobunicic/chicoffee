import styles from './Visit.module.css'
import LocationMap from '../components/LocationMap'
import { useLanguage } from '../context/LanguageContext'

export default function Visit() {
  const { t } = useLanguage()

  return (
    <section id="posjeti" className={styles.visit}>
      <div className={styles.imageCol}>
        <LocationMap />
      </div>

      <div className={styles.infoCol}>
        <span className={styles.eyebrow}>{t.visit.eyebrow}</span>
        <h2 className={styles.heading}>{t.visit.headingLine1}<br /><em>{t.visit.headingLine2}</em></h2>

        <div className={styles.details}>
          <div className={styles.detailGroup}>
            <h4 className={styles.detailLabel}>{t.visit.addressLabel}</h4>
            <p className={styles.detailValue}>
              Preradovićeva 34<br />
              10000 Zagreb
            </p>
          </div>

          <div className={styles.detailGroup}>
            <h4 className={styles.detailLabel}>{t.visit.hoursLabel}</h4>
            <p className={styles.detailValue}>
              {t.visit.hoursValue}
            </p>
          </div>

        </div>

        <div className={styles.details}>
          <div className={styles.detailGroup}>
            <h4 className={styles.detailLabel}>{t.visit.contactLabel}</h4>
            <p className={styles.detailValue}>
              <a href="mailto:chi_coffee@yahoo.com" className={styles.emailLink}>chi_coffee@yahoo.com</a>
            </p>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/khfnyiroB7BuNzJN9"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          {t.visit.mapLink}
        </a>
      </div>
    </section>
  )
}
