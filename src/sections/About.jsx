import styles from './About.module.css'
import LogoCHI from '../components/LogoCHI'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="o-nama" className={styles.about}>
      <LogoCHI className={styles.bgLogo} aria-hidden="true" />
      <div className={styles.textCol}>
        <h2 className={styles.heading}>
          {t.about.heading}
        </h2>
        <p className={styles.body}>
          {t.about.body}
        </p>
      </div>
    </section>
  )
}
