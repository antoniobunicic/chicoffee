import styles from './CoffeeTiles.module.css'
import img1 from '../assets/images/specialty-coffee/speacialty1.webp'
import img2 from '../assets/images/specialty-coffee/speacialty2.webp'
import img3 from '../assets/images/specialty-coffee/speacialty3.webp'
import img4 from '../assets/images/specialty-coffee/speacialty4.webp'

const TILES = [
  { img: img1, label: 'Espresso' },
  { img: img2, label: 'Filter' },
  { img: img4, label: 'Matcha' },
  { img: img3, label: 'Cold Brew' },
]

export default function CoffeeTiles() {
  return (
    <div className={styles.tiles}>
      {TILES.map(({ img, label }) => (
        <div key={label} className={styles.tile}>
          <img src={img} alt={label} className={styles.img} />
        </div>
      ))}
    </div>
  )
}
