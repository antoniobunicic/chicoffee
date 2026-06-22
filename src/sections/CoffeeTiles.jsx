import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shopify/queries'
import { useLanguage } from '../context/LanguageContext'
import styles from './CoffeeTiles.module.css'

export default function CoffeeTiles() {
  const [products, setProducts] = useState([])
  const { t, lang } = useLanguage()

  useEffect(() => {
    fetchProducts(20, lang).then((all) => setProducts(all.slice(0, 4)))
  }, [lang])

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t.webshop.sectionTitle}</h2>

      <div className={styles.tiles}>
        {products.length === 0
          ? [...Array(4)].map((_, i) => <div key={i} className={styles.tile} />)
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

      <Link to="/webshop" className={styles.cta}>{t.webshop.homeCta}</Link>
    </section>
  )
}
