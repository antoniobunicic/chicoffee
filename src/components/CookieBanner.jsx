import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CookieBanner.module.css'
import { useLanguage } from '../context/LanguageContext'

const STORAGE_KEY = 'chi-cookie-consent'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const decide = (choice) => {
    window.localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label={t.cookies.title}>
      <div className={styles.inner}>
        <p className={styles.text}>
          {t.cookies.text}{' '}
          <Link to="/privatnost-i-kolacici" className={styles.link}>
            {t.cookies.more}
          </Link>
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.reject}`}
            onClick={() => decide('rejected')}
          >
            {t.cookies.reject}
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.accept}`}
            onClick={() => decide('accepted')}
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
