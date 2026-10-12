import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

// Available products first; Array#sort is stable, so Shopify's order is kept within each group.
function sortAvailableFirst(products) {
  return [...products].sort((a, b) => Number(b.availableForSale) - Number(a.availableForSale))
}

function ProductCard({ product, onAdd, cartLoading }) {
  const [added, setAdded] = useState(false)
  const resetTimer = useRef(null)
  const { t, lang } = useLanguage()
  const productUrl = `/shop/${product.handle}`
  const eyebrow = [product.metafields.country, product.metafields.coffee_roast]
    .filter(Boolean)
    .join(' · ') || product.productType

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function handleAdd() {
    if (!product.variantId) return
    if (!(await onAdd(product.variantId))) return
    setAdded(true)
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={`${styles.card} ${product.availableForSale ? '' : styles.cardSoldOut}`}>
      <Link to={productUrl} className={styles.imgWrap}>
        {product.image ? (
          <img
            src={product.image.url}
            alt={product.image.altText || product.title}
            className={styles.img}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
        {!product.availableForSale && (
          <span className={styles.soldOutBadge}>{t.webshop.soldOut}</span>
        )}
      </Link>

      <div className={styles.cardBody}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <Link to={productUrl} className={styles.titleLink}>
          <h3 className={styles.title}>{product.title}</h3>
        </Link>
        {product.vendor && (
          <span className={styles.vendor}>{product.vendor}</span>
        )}

        <div className={styles.priceRow}>
          <span className={styles.price}>
            {product.priceVaries && (
              <span className={styles.priceFrom}>{t.webshop.priceFrom} </span>
            )}
            {formatPrice(product.price, lang)}
          </span>
          {product.availableForSale && (product.hasMultipleVariants ? (
            // Several variants (e.g. weight) — the choice is made on the product page
            <Link to={productUrl} className={styles.addBtn} aria-label={t.webshop.chooseOption}>
              <Plus size={18} weight="bold" />
            </Link>
          ) : (
            <button
              type="button"
              className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
              onClick={handleAdd}
              disabled={cartLoading}
              aria-label={t.webshop.addToCart}
            >
              {added ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Webshop() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [viewMode, setViewMode] = useState('categories')
  const { addItem, loading: cartLoading } = useCart()
  const { t, lang } = useLanguage()
  const { hash } = useLocation()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchCollections(10, 50, lang)
      .then((data) => { if (!cancelled) setCollections(data) })
      .catch((err) => { if (!cancelled) { console.error('Shopify error:', err); setError(err.message) } })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [lang, reloadKey])

  // /shop#<collection-handle> (e.g. from a product breadcrumb) jumps to that collection once it renders
  useEffect(() => {
    if (loading || !hash) return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'instant' })
  }, [loading, hash])

  const sortedCollections = useMemo(
    () => collections.map((c) => ({ ...c, products: sortAvailableFirst(c.products) })),
    [collections]
  )

  const allProducts = useMemo(() => {
    const seen = new Set()
    const list = []
    for (const c of collections) {
      for (const p of c.products) {
        if (!seen.has(p.id)) { seen.add(p.id); list.push(p) }
      }
    }
    return sortAvailableFirst(list)
  }, [collections])

  const pluralCategory = new Intl.PluralRules(lang).select(allProducts.length)
  const productsLabel = t.webshop.products[pluralCategory] ?? t.webshop.products.other

  let content
  if (loading) {
    content = <p className={styles.status}>{t.webshop.loading}</p>
  } else if (error) {
    content = (
      <div className={styles.status}>
        <p>{t.webshop.error}</p>
        <button type="button" className={styles.retryBtn} onClick={() => setReloadKey((k) => k + 1)}>
          {t.webshop.retry}
        </button>
      </div>
    )
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
                {allProducts.length} {productsLabel}
              </span>
              <div className={styles.viewToggle}>
                <button
                  type="button"
                  className={`${styles.viewBtn} ${viewMode === 'categories' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('categories')}
                  aria-pressed={viewMode === 'categories'}
                >
                  {t.webshop.byCategory}
                </button>
                <button
                  type="button"
                  className={`${styles.viewBtn} ${viewMode === 'all' ? styles.viewActive : ''}`}
                  onClick={() => setViewMode('all')}
                  aria-pressed={viewMode === 'all'}
                >
                  {t.webshop.showAll}
                </button>
              </div>
            </div>

            {viewMode === 'categories' ? (
              sortedCollections.map((collection) => (
                <div key={collection.id} id={collection.handle} className={styles.collection}>
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
