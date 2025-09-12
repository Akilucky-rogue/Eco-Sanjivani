"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, type Translations, translations } from "./translations"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  availableLanguages: { code: Language; name: string; nativeName: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export const availableLanguages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr" as Language, name: "Marathi", nativeName: "मराठी" },
  { code: "gu" as Language, name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn" as Language, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം" },
  { code: "bn" as Language, name: "Bengali", nativeName: "বাংলা" },
]

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("eco-sanjivani-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (translations[browserLang]) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("eco-sanjivani-language", lang)
  }

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
