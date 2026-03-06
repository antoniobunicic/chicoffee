import styles from './VideoStrip.module.css'
import video1 from '../assets/videos/video1.mp4'
import video2 from '../assets/videos/video2.mp4'

export default function VideoStrip() {
  return (
    <div className={styles.wrapper}>
      <video src={video1} className={styles.video} autoPlay loop muted playsInline />
      <video src={video2} className={styles.video} autoPlay loop muted playsInline />
    </div>
  )
}
