import { useLanguage } from '../context/LanguageContext'
import styles from './LanguageSwitch.module.css'

const LANGS = ['hr', 'en']

export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={`${styles.switch} ${className}`}>
      {LANGS.map((code, i) => (
        <span key={code} className={styles.group}>
          {i > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
          <button
            type="button"
            className={`${styles.lang} ${lang === code ? styles.active : ''}`}
            onClick={() => setLang(code)}
            aria-label={code === 'hr' ? 'Hrvatski' : 'English'}
            aria-pressed={lang === code}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
