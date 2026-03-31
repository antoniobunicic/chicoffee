import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import FloatingNav from './components/FloatingNav'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'
import WebshopPage from './pages/WebshopPage'
import NarPage from './pages/NarPage'
import ProductPage from './pages/ProductPage'
import Kontakt from './pages/Kontakt'
import styles from './App.module.css'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className={styles.pageTransition}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/webshop" element={<WebshopPage />} />
        <Route path="/webshop/:handle" element={<ProductPage />} />
        <Route path="/nar" element={<NarPage />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FloatingNav />
        <CartDrawer />
        <AnimatedRoutes />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}
