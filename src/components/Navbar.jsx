import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../assets/images/logo.svg'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'NAR Store', to: '/nar' },
  { label: 'Kontakt', to: '/kontakt' },
]

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logoLink}>
        <img src={logo} alt="CHI Coffee" className={styles.logo} />
      </NavLink>

      <div className={styles.links}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
