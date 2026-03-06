import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import FloatingNav from './components/FloatingNav'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import NarPage from './pages/NarPage'
import Kontakt from './pages/Kontakt'
import styles from './App.module.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className={styles.pageTransition}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/nar" element={<NarPage />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <FloatingNav />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
