import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pyrolysis Suitability Analyzer (PSA)",
  description: "Advanced pyrolysis analysis services for sustainable waste management",
  icons: {
    icon: "https://i.postimg.cc/Zq3KxYqX/Favicon.png",
  },
  generator: "v0.dev"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main>{children}</main>

          {/* ✅ Small native ad just before footer */}
          <div className="w-full flex justify-center items-center my-4">
            <div id="native-ad-wrapper" className="max-w-xs">
              <Script
                strategy="afterInteractive"
                src="//pl26766194.profitableratecpm.com/43/e8/20/43e820e24bda4c34e6b1387ccf0e229f.js"
              />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
