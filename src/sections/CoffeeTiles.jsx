import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shopify/queries'
import styles from './CoffeeTiles.module.css'

export default function CoffeeTiles() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then((all) => setProducts(all.slice(0, 4)))
  }, [])

  if (products.length === 0) {
    return <div className={styles.tiles}>{[...Array(4)].map((_, i) => <div key={i} className={styles.tile} />)}</div>
  }

  return (
    <div className={styles.tiles}>
      {products.map((product) => (
        <Link key={product.id} to={`/webshop/${product.handle}`} className={styles.tile}>
          {product.image ? (
            <img src={product.image.url} alt={product.image.altText || product.title} className={styles.img} />
          ) : (
            <div className={styles.imgPlaceholder} />
          )}
        </Link>
      ))}
    </div>
  )
}
