import Visit from '../sections/Visit'
import styles from './Kontakt.module.css'
import headerImg from '../assets/images/kontakt/cover.webp'
import { useLanguage } from '../context/LanguageContext'

export default function Kontakt() {
  const { t } = useLanguage()

  return (
    <>
      <div className={styles.header}>
        <img src={headerImg} alt="CHI Coffee" className={styles.headerImg} />
        <div className={styles.headerOverlay}>
          <h1 className={styles.heading}>{t.kontaktPage.heading}</h1>
        </div>
      </div>
      <Visit />
    </>
  )
}
