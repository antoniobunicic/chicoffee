import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import styles from './Wholesale.module.css'

// Must match the hidden static form in index.html so Netlify detects it at build time.
const FORM_NAME = 'wholesale'

const FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name', required: true },
  { name: 'company', type: 'text', autoComplete: 'organization', required: true },
  { name: 'email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', type: 'tel', autoComplete: 'tel', required: false },
]

export default function Wholesale() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      form.reset()
      setStatus('success')
    } catch (err) {
      console.error('Wholesale form error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="wholesale" className={styles.wholesale}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <span className={styles.eyebrow}>{t.wholesale.eyebrow}</span>
          <h2 className={styles.heading}>{t.wholesale.heading}</h2>
          {t.wholesale.paragraphs.map((para, i) => (
            <p key={i} className={styles.paragraph}>{para}</p>
          ))}
        </div>

        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <p className={styles.honeypot} aria-hidden="true">
            <label>Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
          </p>

          <div className={styles.grid}>
            {FIELDS.map(({ name, ...rest }) => (
              <label key={name} className={styles.field}>
                <span className={styles.label}>{t.wholesale.fields[name]}</span>
                <input name={name} className={styles.input} {...rest} />
              </label>
            ))}
          </div>

          <label className={styles.field}>
            <span className={styles.label}>{t.wholesale.fields.message}</span>
            <textarea name="message" rows={5} required className={`${styles.input} ${styles.textarea}`} />
          </label>

          <button type="submit" className={styles.submit} disabled={status === 'sending'}>
            {status === 'sending' ? t.wholesale.sending : t.wholesale.submit}
          </button>

          <p className={styles.status} role="status" aria-live="polite">
            {status === 'success' && t.wholesale.success}
            {status === 'error' && <span className={styles.error}>{t.wholesale.error}</span>}
          </p>
        </form>
      </div>
    </section>
  )
}
