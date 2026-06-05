import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import shelfImg from '../assets/images/shelf.jpg'
import styles from './Webshop.module.css'

function formatPrice(price, lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

function ProductCard({ product, onAdd, cartLoading }) {
  const [added, setAdded] = useState(false)
  const { t, lang } = useLanguage()

  async function handleAdd(e) {
    e.preventDefault()
    if (!product.variantId) return
    await onAdd(product.variantId)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.card}>
      <Link to={`/webshop/${product.handle}`} className={styles.imgWrap}>
        {product.image ? (
          <img
            src={product.image.url}
            alt={product.image.altText || product.title}
            className={styles.img}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
      </Link>

      <div className={styles.cardBody}>
        {product.productType && (
          <span className={styles.eyebrow}>{product.productType}</span>
        )}
        <Link to={`/webshop/${product.handle}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        <div className={styles.meta}>
          {product.vendor && (
            <span className={styles.vendor}>{product.vendor}</span>
          )}
          <span className={styles.price}>{formatPrice(product.price, lang)}</span>
        </div>
        <button
          className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
          onClick={handleAdd}
          disabled={cartLoading || !product.availableForSale}
        >
          {!product.availableForSale ? t.webshop.soldOut : added ? t.webshop.added : t.webshop.addToCart}
        </button>
      </div>
    </div>
  )
}

export default function Webshop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem, loading: cartLoading } = useCart()
  const { t, lang } = useLanguage()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProducts(20, lang)
      .then((data) => { if (!cancelled) setProducts(data) })
      .catch((err) => { if (!cancelled) { console.error('Shopify error:', err); setError(err.message) } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [lang])

  let content
  if (loading) {
    content = <p className={styles.status}>{t.webshop.loading}</p>
  } else if (error) {
    content = <p className={styles.status}>{t.webshop.error}</p>
  } else if (products.length === 0) {
    content = <p className={styles.status}>{t.webshop.empty}</p>
  }

  return (
    <>
      <div className={styles.heroHeader}>
        <img src={shelfImg} alt="" className={styles.heroBg} />
      </div>
      <section className={styles.webshop}>
        {content || (
          <>
            <h2 className={styles.sectionTitle}>{t.webshop.sectionTitle}</h2>
            <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addItem}
                cartLoading={cartLoading}
              />
            ))}
          </div>
          </>
        )}
      </section>
    </>
  )
}
