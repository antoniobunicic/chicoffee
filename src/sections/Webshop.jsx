import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Check } from '@phosphor-icons/react'
import { fetchCollections } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import coverImg from '../assets/images/webshop/moods.jpg'
import stackedImg from '../assets/images/webshop/stacked.jpg'
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
        {product.vendor && (
          <span className={styles.vendor}>{product.vendor}</span>
        )}

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price, lang)}</span>
          {product.availableForSale ? (
            <button
              className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
              onClick={handleAdd}
              disabled={cartLoading}
              aria-label={t.webshop.addToCart}
            >
              {added ? <Check size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
            </button>
          ) : (
            <span className={styles.soldOut}>{t.webshop.soldOut}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Webshop() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('categories')
  const { addItem, loading: cartLoading } = useCart()
  const { t, lang } = useLanguage()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchCollections(10, 50, lang)
      .then((data) => { if (!cancelled) setCollections(data) })
      .catch((err) => { if (!cancelled) { console.error('Shopify error:', err); setError(err.message) } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [lang])

  const allProducts = useMemo(() => {
    const seen = new Set()
    const list = []
    for (const c of collections) {
      for (const p of c.products) {
        if (!seen.has(p.id)) { seen.add(p.id); list.push(p) }
      }
    }
    return list
  }, [collections])

  let content
  if (loading) {
    content = <p className={styles.status}>{t.webshop.loading}</p>
  } else if (error) {
    content = <p className={styles.status}>{t.webshop.error}</p>
  } else if (allProducts.length === 0) {
    content = <p className={styles.status}>{t.webshop.empty}</p>
  }

  return (
    <>
      <div className={styles.heroHeader}>
        <img src={coverImg} alt="" className={styles.heroBg} />
      </div>
      <section className={styles.webshop}>
        <div className={styles.introRow}>
          <div className={styles.introCol}>
            <h1 className={styles.shopTitle}>SHOP</h1>
            <div className={styles.intro}>
              {t.webshop.intro.map((para, i) => (
                <p key={i} className={i === 0 ? styles.introLead : styles.introPara}>{para}</p>
              ))}
            </div>
          </div>
          <div className={styles.introImageCol}>
            <img src={stackedImg} alt="" className={styles.introImage} />
          </div>
        </div>

        {content || (
          <>
            <div className={styles.filterBar}>
              <span className={styles.count}>
                {allProducts.length} {t.webshop.productsLabel}
              </span>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'categories' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('categories')}
                >
                  {t.webshop.byCategory}
                </button>
                <button
                  className={`${styles.viewBtn} ${viewMode === 'all' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('all')}
                >
                  {t.webshop.showAll}
                </button>
              </div>
            </div>

            {viewMode === 'categories' ? (
              collections.map((collection) => (
                <div key={collection.id} className={styles.collection}>
                  <div className={styles.collectionHeader}>
                    <h2 className={styles.sectionTitle}>{collection.title}</h2>
                    {collection.description && (
                      <p className={styles.collectionDesc}>{collection.description}</p>
                    )}
                  </div>
                  <div className={styles.products}>
                    {collection.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={addItem}
                        cartLoading={cartLoading}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.products}>
                {allProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addItem}
                    cartLoading={cartLoading}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
