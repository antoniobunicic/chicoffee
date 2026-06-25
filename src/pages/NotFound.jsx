import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className={styles.wrap}>
      <span className={styles.code}>404</span>
      <h1 className={styles.heading}>{t.notFound.heading}</h1>
      <p className={styles.text}>{t.notFound.text}</p>
      <Link to="/" className={styles.cta}>{t.notFound.cta}</Link>
    </section>
  )
}
