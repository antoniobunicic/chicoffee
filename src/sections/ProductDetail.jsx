import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductByHandle } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import styles from './ProductDetail.module.css'

function formatPrice(price) {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

export default function ProductDetail() {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem, loading: cartLoading } = useCart()

  useEffect(() => {
    setLoading(true)
    fetchProductByHandle(handle)
      .then((p) => {
        setProduct(p)
        if (p?.variants.length) setSelectedVariant(p.variants[0])
      })
      .finally(() => setLoading(false))
  }, [handle])

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.status}>Učitavanje...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.status}>Proizvod nije pronađen.</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.heroHeader}>
        <div className={styles.heroOverlay}>
          <Link to="/webshop" className={styles.back}>← Natrag na webshop</Link>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.layout}>
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

          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>
              {formatPrice(selectedVariant?.price || product.price)}
            </p>

            {product.variants.length > 1 && (
              <div className={styles.variants}>
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
            )}

            <button
              className={styles.addBtn}
              onClick={() => selectedVariant && addItem(selectedVariant.id)}
              disabled={cartLoading || !selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale ? 'Dodaj' : 'Rasprodano'}
            </button>

            {product.description && (
              <div className={styles.description}>
                <p>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
