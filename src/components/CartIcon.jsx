import { Tote } from '@phosphor-icons/react'
import { useCart } from '../context/CartContext'
import styles from './CartIcon.module.css'

export default function CartIcon() {
  const { itemCount, toggleCart } = useCart()

  return (
    <button className={styles.cartButton} onClick={toggleCart} aria-label="Košarica">
      <Tote size={20} weight="light" />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  )
}
