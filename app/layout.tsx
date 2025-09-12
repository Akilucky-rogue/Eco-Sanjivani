import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { OfflineBanner } from "@/components/offline/offline-banner"
import { I18nProvider } from "@/lib/i18n/context"
import { Navigation } from "@/components/navigation"
import { MobileBottomNav } from "@/components/mobile/mobile-bottom-nav"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Eco-Sanjivani - India's Ecosystem Conservation Platform",
  description:
    "Join the movement to protect India's entire ecosystem through gamified community action and environmental conservation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <I18nProvider>
              <OfflineBanner />
              <Navigation />
              <main className="min-h-screen bg-background pb-16 md:pb-0">{children}</main>
              <MobileBottomNav />
            </I18nProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
