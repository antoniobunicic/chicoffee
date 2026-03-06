import { NavLink } from 'react-router-dom'
import styles from './FloatingNav.module.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'NAR Store', to: '/nar' },
  { label: 'Kontakt', to: '/kontakt' },
]

export default function FloatingNav() {
  return (
    <nav className={styles.nav}>
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
    </nav>
  )
}
