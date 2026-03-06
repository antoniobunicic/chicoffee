import styles from './About.module.css'
import vibeVideo from '../assets/videos/vibe.mp4'
import sketchSvg from '../assets/images/sketch-cups.svg'

export default function About() {
  return (
    <section id="o-nama" className={styles.about}>
      <div className={styles.imageCol}>
        <video
          src={vibeVideo}
          className={styles.image}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.textCol}>
        <h2 className={styles.heading}>
          Kava s karakterom
        </h2>
        <p className={styles.body}>
          Pažljivo birana zrna, promišljeno pripremljena kava
          i prostor u kojem je u redu zadržati se.
        </p>
        <img src={sketchSvg} alt="" className={styles.sketch} aria-hidden="true" />
      </div>
    </section>
  )
}
