import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import shelfImg from '../assets/images/shelf.jpg'
import styles from './Webshop.module.css'

function formatPrice(price) {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount))
}

function ProductCard({ product, onAdd, cartLoading }) {
  const [added, setAdded] = useState(false)

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
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>
        <button
          className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
          onClick={handleAdd}
          disabled={cartLoading || !product.availableForSale}
        >
          {!product.availableForSale ? 'Rasprodano' : added ? 'Dodano ✓' : 'Dodaj u košaricu'}
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

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => { console.error('Shopify error:', err); setError(err.message) })
      .finally(() => setLoading(false))
  }, [])

  let content
  if (loading) {
    content = <p className={styles.status}>Učitavanje...</p>
  } else if (error) {
    content = <p className={styles.status}>Greška pri učitavanju proizvoda.</p>
  } else if (products.length === 0) {
    content = <p className={styles.status}>Nema dostupnih proizvoda.</p>
  }

  return (
    <>
      <div className={styles.heroHeader}>
        <img src={shelfImg} alt="" className={styles.heroBg} />
      </div>
      <section className={styles.webshop}>
        {content || (
          <>
            <h2 className={styles.sectionTitle}>Trenutna rotacija</h2>
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
