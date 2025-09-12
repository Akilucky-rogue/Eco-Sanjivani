"use client"

import * as React from "react"

export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || defaultTheme
    setTheme(savedTheme)
    document.documentElement.setAttribute(attribute, savedTheme)
  }, [attribute, defaultTheme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.setAttribute(attribute, newTheme)
      },
      themes: ["light", "dark", "system"],
    }),
    [theme, attribute],
  )

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const ThemeContext = React.createContext<{
  theme: string
  setTheme: (theme: string) => void
  themes: string[]
}>({
  theme: "light",
  setTheme: () => {},
  themes: ["light", "dark", "system"],
})

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
