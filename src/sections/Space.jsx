import { Link } from 'react-router-dom'
import styles from './Space.module.css'
import spaceImg from '../assets/images/concept-store.webp'
import LogoCHI from '../components/LogoCHI'

const OFFERINGS = [
  {
    label: 'Specialty kava',
    text: 'Tjedna rotacija single-origin selekcija — espresso, filter, cold brew.',
  },
  {
    label: 'Matcha & Hojicha',
    text: 'Ceremonijalna matcha i hojicha japanskog podrijetla, pripremane s pažnjom.',
  },
  {
    label: 'Kakao',
    text: 'Single origin 100% kakao — El Salvador, Kostarika, Vijetnam, Filipini. Filter ili s mlijekom.',
  },
  {
    label: 'Pastry & zalogaji',
    text: 'Kroasani, cimetne rolice, baskijski cheesecake, focaccia sendviči i brunch.',
  },
]

export default function Space() {
  return (
    <section className={styles.space}>
      <LogoCHI className={styles.bgLogo} aria-hidden="true" />
      <div className={styles.inner}>
      <div className={styles.imageCol}>
        <img src={spaceImg} alt="CHI Coffee ponuda" className={styles.image} />
      </div>

      <div className={styles.textCol}>
        <span className={styles.eyebrow}>Ponuda</span>
        <h2 className={styles.heading}>
          More than coffee —<br />
          <em>a ritual of taste</em>
        </h2>
        <p className={styles.intro}>
          Uz specialty kavu, u CHI-u se susreću matcha, hojicha, ceremonijalni
          kakao i prirodni napitci.
        </p>

        <div className={styles.offerings}>
          {OFFERINGS.map(({ label, text }) => (
            <div key={label} className={styles.offering}>
              <h4 className={styles.offeringLabel}>{label}</h4>
              <p className={styles.offeringText}>{text}</p>
            </div>
          ))}
        </div>

        <Link to="/menu" className={styles.menuBtn}>
          Vidi cijeli menu
        </Link>
      </div>
      </div>
    </section>
  )
}
