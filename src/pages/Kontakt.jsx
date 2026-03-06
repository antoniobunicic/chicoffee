import Visit from '../sections/Visit'
import styles from './Kontakt.module.css'
import headerImg from '../assets/images/kontakt/cover.webp'

export default function Kontakt() {
  return (
    <>
      <div className={styles.header}>
        <img src={headerImg} alt="CHI Coffee" className={styles.headerImg} />
        <div className={styles.headerOverlay}>
          <span className={styles.eyebrow}>Pronađi nas</span>
          <h1 className={styles.heading}>Preradovićeva 34,<br /><em>Zagreb.</em></h1>
        </div>
      </div>
      <Visit />
    </>
  )
}
