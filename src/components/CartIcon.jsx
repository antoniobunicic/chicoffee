import { Tote } from '@phosphor-icons/react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import styles from './CartIcon.module.css'

export default function CartIcon() {
  const { itemCount, toggleCart } = useCart()
  const { t } = useLanguage()

  return (
    <button className={styles.cartButton} onClick={toggleCart} aria-label={t.cart.title}>
      <Tote size={20} weight="light" />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  )
}
