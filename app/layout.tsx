import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { OfflineBanner } from "@/components/offline/offline-banner"
import { I18nProvider } from "@/lib/i18n/context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Eco-Sanjivani - Marine Conservation Platform",
  description:
    "Join the movement to protect India's marine ecosystems through gamified community action and environmental conservation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <I18nProvider>
              <OfflineBanner />
              {children}
            </I18nProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
