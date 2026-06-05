import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { fetchProductByHandle } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import styles from './ProductDetail.module.css'

function formatPrice(price, lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

export default function ProductDetail() {
  const { handle } = useParams()
  const { t, lang } = useLanguage()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem, loading: cartLoading } = useCart()

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setActiveImage(0)
      try {
        const p = await fetchProductByHandle(handle, lang)
        if (!cancelled) {
          setProduct(p)
          if (p?.variants.length) setSelectedVariant(p.variants[0])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [handle, lang])

  async function handleAddToCart() {
    if (!selectedVariant) return
    await addItem(selectedVariant.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <>
        <div className={styles.darkHeader} />
        <div className={styles.statusPage}><p className={styles.status}>{t.product.loading}</p></div>
      </>
    )
  }

  if (!product) {
    return (
      <>
        <div className={styles.darkHeader} />
        <div className={styles.statusPage}><p className={styles.status}>{t.product.notFound}</p></div>
      </>
    )
  }

  const country = product.metafields?.country
  const coffeeRoast = product.metafields?.coffee_roast

  return (
    <>
      <div className={styles.darkHeader} />

      <div className={styles.page}>
        <nav className={styles.breadcrumb}>
          <Link to="/webshop" className={styles.breadcrumbLink}>{t.product.breadcrumb}</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.title}</span>
        </nav>
        <div className={styles.layout}>

          {/* Gallery */}
          <div className={styles.gallery}>
            {product.images.length > 0 && (
              <div className={styles.mainImgWrap}>
                <img
                  src={product.images[activeImage].url}
                  alt={product.images[activeImage].altText || product.title}
                  className={styles.mainImg}
                />
              </div>
            )}
            {product.images.length > 1 && (
              <div className={styles.thumbs}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img.url} alt={img.altText || ''} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            {product.productType && (
              <span className={styles.eyebrow}>{product.productType}</span>
            )}

            <h1 className={styles.title}>{product.title}</h1>

            {product.vendor && (
              <p className={styles.vendor}>{product.vendor}</p>
            )}

            <p className={styles.price}>
              {formatPrice(selectedVariant?.price || product.price, lang)}
            </p>

            {(country || coffeeRoast) && (
              <div className={styles.attrs}>
                {country && (
                  <div className={styles.attr}>
                    <span className={styles.attrLabel}>{t.product.origin}</span>
                    <span className={styles.attrValue}>{country}</span>
                  </div>
                )}
                {coffeeRoast && (
                  <div className={styles.attr}>
                    <span className={styles.attrLabel}>{t.product.roast}</span>
                    <span className={styles.attrValue}>{coffeeRoast}</span>
                  </div>
                )}
              </div>
            )}

            {product.variants.length > 1 || (product.variants.length === 1 && product.variants[0].title.toLowerCase() !== 'default title') ? (
              <div className={styles.variants}>
                <span className={styles.variantsLabel}>{t.product.packaging}</span>
                <div className={styles.variantBtns}>
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      className={`${styles.variantBtn} ${selectedVariant?.id === v.id ? styles.variantActive : ''}`}
                      onClick={() => setSelectedVariant(v)}
                      disabled={!v.availableForSale}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant?.availableForSale}
            >
              {!selectedVariant?.availableForSale ? t.product.soldOut : added ? t.product.added : t.product.addToCart}
            </button>

            {product.descriptionHtml && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descriptionHtml) }}
              />
            )}

            {product.tags?.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}

            <a href="mailto:chi_coffee@yahoo.com" className={styles.wholesaleLink}>
              {t.product.wholesale}
            </a>

          </div>
        </div>
      </div>
    </>
  )
}
