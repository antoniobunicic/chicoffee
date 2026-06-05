import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'chi-lang'
const SUPPORTED = ['hr', 'en']

function getInitialLang() {
  if (typeof window === 'undefined') return 'hr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored
  const browser = window.navigator.language?.slice(0, 2).toLowerCase()
  return browser === 'hr' ? 'hr' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = {
    lang,
    setLang,
    toggleLang: () => setLang((prev) => (prev === 'hr' ? 'en' : 'hr')),
    t: translations[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
