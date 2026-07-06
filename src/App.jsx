import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import { CartProvider } from './context/CartContext'
import FloatingNav from './components/FloatingNav'
import CartDrawer from './components/CartDrawer'
import CookieBanner from './components/CookieBanner'
import Footer from './components/Footer'
import Home from './pages/Home'
import PhilosophyPage from './pages/PhilosophyPage'
import WebshopPage from './pages/WebshopPage'
import NarPage from './pages/NarPage'
import ProductPage from './pages/ProductPage'
import Kontakt from './pages/Kontakt'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
import { LEGAL_PAGES } from './i18n/legal'
import styles from './App.module.css'

// The NEW page fades in ON TOP; the OLD one stays FULLY opaque underneath for
// the whole duration (it only unmounts after the new has covered it), so the
// page background never shows through — a true direct old → new dissolve.
const DURATION = 0.5
const pageVariants = {
  // New page "morphs" in — a subtle rotate + scale while fading — on top of the
  // old one, which stays fully opaque underneath (corners reveal it, not the bg).
  initial: { opacity: 0, scale: 0.97, rotate: -1.5, zIndex: 2 },
  enter: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    zIndex: 2,
    transition: { duration: DURATION, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    zIndex: 1,
    // hold the old page until the new one has covered it, then remove instantly.
    transition: { opacity: { delay: DURATION, duration: 0.001 } },
  },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        className={styles.page}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        onAnimationStart={(def) => {
          if (def === 'enter') window.scrollTo(0, 0)
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/webshop" element={<WebshopPage />} />
          <Route path="/webshop/:handle" element={<ProductPage />} />
          <Route path="/nar" element={<NarPage />} />
          <Route path="/lokacije" element={<Kontakt />} />
          {LEGAL_PAGES.map(({ key, slug }) => (
            <Route key={key} path={slug} element={<LegalPage docKey={key} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <FloatingNav />
          <CartDrawer />
          <AnimatedRoutes />
          <Footer />
          <CookieBanner />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}
