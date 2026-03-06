import styles from './Menu.module.css'
import menuImg from '../assets/images/menu/strip.webp'
import imgKava from '../assets/images/menu/coffee.webp'
import imgMatcha from '../assets/images/menu/matcha.webp'
import imgPrirodno from '../assets/images/menu/ice-tea.webp'
import imgZalogaji from '../assets/images/concept-store.webp'

const CATEGORIES = [
  {
    title: 'Specialty kava',
    items: ['Espresso', 'Filter — single origin', 'Cold brew'],
    description: 'Tjedna rotacija single-origin selekcija, pažljivo sourced i prženo.',
    img: imgKava,
  },
  {
    title: 'Matcha, kakao i čajevi',
    items: ['Ceremonijalna matcha', 'Hojicha', 'Single origin kakao', 'Sezonski čajevi'],
    description: 'Ceremonijalna matcha i čajevi japanskog podrijetla, pripremane s pažnjom.',
    img: imgMatcha,
  },
  {
    title: 'Pića',
    items: ['Prirodna vina', 'Kombucha', 'Prirodni sokovi'],
    description: 'Rotacijska selekcija prirodnih vina i fermentiranih napitaka.',
    img: imgPrirodno,
  },
  {
    title: 'Zalogaji',
    items: ['Focaccia', 'Cimetne rolice', 'Sezonski kolači', 'Brunch'],
    description: 'Jednostavne, promišljene kombinacije koje prate ritam dana.',
    img: imgZalogaji,
  },
]

export default function Menu() {
  return (
    <section id="kava" className={styles.menu}>
      <div className={styles.imageStrip}>
        <img src={menuImg} alt="CHI Coffee bar" className={styles.stripImage} />
      </div>

      <div className={styles.header}>
        <span className={styles.eyebrow}>Ponuda</span>
        <h2 className={styles.heading}>Coffee & more</h2>
      </div>

      <div className={styles.grid}>
        {CATEGORIES.map(({ title, items, description, img }) => (
          <div key={title} className={styles.card}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{description}</p>
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item} className={styles.item}>{item}</li>
              ))}
            </ul>
            <div className={styles.cardImage}>
              <img src={img} alt={title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
