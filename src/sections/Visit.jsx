import styles from './Visit.module.css'
import visitVideo from '../assets/videos/working-hours.mp4'

export default function Visit() {
  return (
    <section id="posjeti" className={styles.visit}>
      <div className={styles.imageCol}>
        <video
          src={visitVideo}
          className={styles.image}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.infoCol}>
        <span className={styles.eyebrow}>Posjeti nas</span>
        <h2 className={styles.heading}>Kava u centru,<br /><em>gdje je kava u centru.</em></h2>

        <div className={styles.details}>
          <div className={styles.detailGroup}>
            <h4 className={styles.detailLabel}>Adresa</h4>
            <p className={styles.detailValue}>
              Preradovićeva 34<br />
              10000 Zagreb
            </p>
          </div>

          <div className={styles.detailGroup}>
            <h4 className={styles.detailLabel}>Radno vrijeme</h4>
            <p className={styles.detailValue}>
              Svaki dan &nbsp; 8:00 – 20:00
            </p>
          </div>

        </div>

        <a
          href="https://maps.app.goo.gl/khfnyiroB7BuNzJN9"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          Otvori u Google Mapsu ↗
        </a>
      </div>
    </section>
  )
}
