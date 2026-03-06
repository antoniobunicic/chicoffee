import styles from './Manifesto.module.css'
import LogoCHI from '../components/LogoCHI'

const LOGO_COUNT = 160

export default function Manifesto() {
  return (
    <section className={styles.manifesto}>
      <div className={styles.pattern} aria-hidden="true">
        {Array.from({ length: LOGO_COUNT }).map((_, i) => (
          <LogoCHI key={i} className={styles.patternLogo} />
        ))}
      </div>


      <p className={styles.text}>
        SPECIALTY COFFEE<br />ROASTERS
      </p>
    </section>
  )
}
