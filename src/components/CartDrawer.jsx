import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './CartDrawer.module.css'

function formatPrice(price) {
  const amount = parseFloat(price.amount)
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(amount)
}

export default function CartDrawer() {
  const { isOpen, closeCart, lines, checkoutUrl, loading, updateItem, removeItem } = useCart()

  const total = lines.reduce(
    (sum, line) => sum + parseFloat(line.price.amount) * line.quantity,
    0
  )
  const currencyCode = lines[0]?.price.currencyCode || 'EUR'

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={closeCart}
      />
      <aside className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Košarica</h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Zatvori">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {lines.length === 0 ? (
            <p className={styles.empty}>Košarica je prazna.</p>
          ) : (
            <ul className={styles.list}>
              {lines.map((line) => (
                <li key={line.id} className={styles.item}>
                  <Link to={`/webshop/${line.handle}`} className={styles.itemLink} onClick={closeCart}>
                    {line.image && (
                      <img
                        src={line.image.url}
                        alt={line.image.altText || line.title}
                        className={styles.itemImg}
                      />
                    )}
                  </Link>
                  <div className={styles.itemInfo}>
                    <Link to={`/webshop/${line.handle}`} className={styles.itemTitleLink} onClick={closeCart}>
                      <span className={styles.itemTitle}>{line.title}</span>
                    </Link>
                    <span className={styles.itemPrice}>{formatPrice(line.price)}</span>
                    <div className={styles.qty}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          line.quantity === 1
                            ? removeItem(line.id)
                            : updateItem(line.id, line.quantity - 1)
                        }
                        disabled={loading}
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Ukupno</span>
              <span>
                {new Intl.NumberFormat('hr-HR', {
                  style: 'currency',
                  currency: currencyCode,
                }).format(total)}
              </span>
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.checkoutBtn}
            >
              Checkout
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
