import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'
import { useLanguage } from '../context/LanguageContext'
import { legal, LEGAL_PAGES } from '../i18n/legal'

// Turns bare URLs and e-mail addresses inside a paragraph into clickable links.
function renderText(text) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g)
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    }
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      )
    }
    // Preserve intentional line breaks within a paragraph.
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function LegalPage({ docKey }) {
  const { t, lang } = useLanguage()
  const doc = legal[lang][docKey]
  const common = legal[lang]

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>
          {common.updatedLabel}: {common.updatedDate}
        </p>
      </header>

      <div className={styles.body}>
        {doc.intro && <p className={styles.intro}>{doc.intro}</p>}

        {doc.sections.map((section, i) => (
          <section key={i} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body?.map((para, j) => (
              <p key={j} className={styles.para}>
                {renderText(para)}
              </p>
            ))}
            {section.list && (
              <ul className={styles.list}>
                {section.list.map((item, j) => (
                  <li key={j}>{renderText(item)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <nav className={styles.related} aria-label={t.footer.menuLabel}>
          {LEGAL_PAGES.filter((p) => p.key !== docKey).map((p) => (
            <Link key={p.key} to={p.slug} className={styles.relatedLink}>
              {legal[lang][p.key].title}
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}
