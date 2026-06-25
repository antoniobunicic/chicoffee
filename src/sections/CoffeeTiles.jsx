import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchLatestPerCollection } from '../shopify/queries'
import { useLanguage } from '../context/LanguageContext'
import styles from './CoffeeTiles.module.css'

// Circle path radius 74 → circumference. Leave a hair of margin so no browser
// drops the boundary glyph at the seam.
const CIRCUMFERENCE = 2 * Math.PI * 74 - 1.5

function CircularTitle({ text, fontSize }) {
  // Non-breaking spaces so SVG doesn't trim/collapse the separator at the seam
  const sep = String.fromCharCode(160, 160) + '•' + String.fromCharCode(160, 160)
  const repeated = `${text}${sep}${text}${sep}`
  const textRef = useRef(null)
  const [spacing, setSpacing] = useState(0)

  useLayoutEffect(() => {
    let cancelled = false
    const measure = () => {
      const el = textRef.current
      if (!el || cancelled) return
      el.style.letterSpacing = '0px'
      const len = el.getComputedTextLength()
      if (!len) return
      const gaps = Math.max(repeated.length - 1, 1)
      setSpacing((CIRCUMFERENCE - len) / gaps)
    }
    // Measure once the custom font is ready so the metrics are correct
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(measure)
    } else {
      measure()
    }
    return () => { cancelled = true }
  }, [repeated, fontSize])

  return (
    <svg className={styles.circle} viewBox="0 0 200 200" role="img" aria-label={text}>
      <defs>
        <path id="rotationPath" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <text ref={textRef} style={{ fontSize, letterSpacing: `${spacing}px` }}>
        <textPath href="#rotationPath" startOffset="0">{repeated}</textPath>
      </text>
    </svg>
  )
}

export default function CoffeeTiles() {
  const [products, setProducts] = useState([])
  const { t, lang } = useLanguage()

  useEffect(() => {
    fetchLatestPerCollection(10, lang).then(setProducts)
  }, [lang])

  return (
    <section className={styles.section}>
      <div className={styles.stage}>
        <div className={styles.circleWrap}>
          <CircularTitle
            text={t.webshop.sectionTitle}
            fontSize={lang === 'en' ? '19px' : '18px'}
          />
        </div>

        <div className={styles.tiles}>
          {products.length === 0
            ? [...Array(3)].map((_, i) => <div key={i} className={styles.tile} />)
            : products.map((product) => (
                <Link key={product.id} to={`/webshop/${product.handle}`} className={styles.tile}>
                  {product.image ? (
                    <img src={product.image.url} alt={product.image.altText || product.title} className={styles.img} />
                  ) : (
                    <div className={styles.imgPlaceholder} />
                  )}
                </Link>
              ))}
        </div>
      </div>

      <Link to="/webshop" className={styles.cta}>{t.webshop.homeCta}</Link>
    </section>
  )
}
