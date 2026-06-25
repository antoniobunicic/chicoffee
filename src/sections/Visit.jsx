import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Visit.module.css'
import LocationMap from '../components/LocationMap'
import { useLanguage } from '../context/LanguageContext'
import zagrebVideo from '../assets/videos/zagreb.mp4'
import trogirVideo from '../assets/videos/trogir.mp4'

const LOCATIONS = [
  {
    name: 'Zagreb',
    addressLines: ['Preradovićeva 34', '10000 Zagreb'],
    position: [45.80955, 15.97433],
    mapUrl: 'https://maps.app.goo.gl/khfnyiroB7BuNzJN9',
    hoursKey: 'hoursZagreb',
    video: zagrebVideo,
  },
  {
    name: 'Trogir',
    addressLines: ['Budislavićeva 3A', '21220 Trogir'],
    position: [43.516797266577726, 16.25029354683449],
    mapUrl: 'https://maps.app.goo.gl/APkWjYtQAuzqAGp68',
    hoursKey: 'hoursTrogir',
    video: trogirVideo,
  },
]

export default function Visit() {
  const { t } = useLanguage()
  const [modalVideo, setModalVideo] = useState(null)

  return (
    <section id="posjeti" className={styles.visit}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>{t.visit.eyebrow}</span>
        <h2 className={styles.heading}>
          {t.visit.headingLine1}<br /><em>{t.visit.headingLine2}</em>
        </h2>
      </div>

      <div className={styles.locations}>
        {LOCATIONS.map((loc) => (
          <div key={loc.name} className={styles.location}>
            <div className={styles.mapCol}>
              <LocationMap position={loc.position} label={`CHI · ${loc.name}`} />
            </div>

            <div className={styles.videoCol}>
              <video
                src={loc.video}
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
                onClick={() => setModalVideo(loc.video)}
              />
            </div>

            <div className={styles.infoCol}>
              <h3 className={styles.locationName}>{loc.name}</h3>

              <div className={styles.detailGroup}>
                <h4 className={styles.detailLabel}>{t.visit.addressLabel}</h4>
                <p className={styles.detailValue}>
                  {loc.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < loc.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              <div className={styles.detailGroup}>
                <h4 className={styles.detailLabel}>{t.visit.hoursLabel}</h4>
                <p className={styles.detailValue}>
                  {t.visit[loc.hoursKey].split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < t.visit[loc.hoursKey].split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                {t.visit.mapLink}
              </a>
            </div>
          </div>
        ))}
      </div>

      {modalVideo &&
        createPortal(
          <div className={styles.modalBackdrop} onClick={() => setModalVideo(null)}>
            <button
              className={styles.modalClose}
              onClick={() => setModalVideo(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <video
              src={modalVideo}
              className={styles.modalVideo}
              autoPlay
              loop
              muted
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </section>
  )
}
