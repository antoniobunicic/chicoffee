import styles from './Story.module.css'
import storyVideo from '../assets/videos/coffee-process.mp4'

export default function Story() {
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
            <span className={styles.eyebrow}>Filozofija</span>
            <h2 className={styles.heading}>
              Specialty coffee at the heart of the story
            </h2>
            <p className={styles.lead}>
              Svako zrno ima svoju priču, porijeklo i karakter — mi ga samo
              pokušavamo pripremiti na najbolji mogući način.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
