import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shopify/queries'
import { useCart } from '../context/CartContext'
import shelfImg from '../assets/images/shelf.jpg'
import styles from './Webshop.module.css'

function formatPrice(price) {
  const amount = parseFloat(price.amount)
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(amount)
}

export default function Webshop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem, loading: cartLoading } = useCart()

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
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
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Webshop</h1>
        </div>
      </div>
      <section className={styles.webshop}>
        {content || (
        <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <Link to={`/webshop/${product.handle}`} className={styles.cardLink}>
              {product.image && (
                <div className={styles.imgWrap}>
                  <img
                    src={product.image.url}
                    alt={product.image.altText || product.title}
                    className={styles.img}
                  />
                </div>
              )}
            </Link>
            <div className={styles.cardBody}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.cardFooter}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <button
                  className={styles.addBtn}
                  onClick={() => addItem(product.variantId)}
                  disabled={cartLoading}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        )}
      </section>
    </>
  )
}
