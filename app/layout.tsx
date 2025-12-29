import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { CustomCursor } from "@/components/custom-cursor"
import { TrafficTracker } from "@/components/traffic-tracker"
import "./globals.css"
import { PageLoader } from "@/components/page-loader"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Canada Ordnance Safety | Advanced Chemical Monitoring for Ordnance Safety",
  description:
    "Canada Ordnance Safety Inc. provides advanced vapour-phase chemical sensing using AACTS/IMS technology for ordnance stability assessment and accident prevention. Non-invasive ordnance condition monitoring.",
  keywords: [
    "Canada Ordnance Safety",
    "ordnance safety",
    "AACTS technology",
    "chemical monitoring",
    "ammunition safety",
    "explosive detection",
    "ordnance stability",
    "defence technology",
    "military safety",
    "Canadian defence",
    "IMS technology",
    "stabilizer detection",
    "non-invasive testing",
  ],
  authors: [{ name: "Canada Ordnance Safety Inc." }],
  creator: "Canada Ordnance Safety Inc.",
  publisher: "Canada Ordnance Safety Inc.",
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://canadaordnancesafety.com",
  },

  openGraph: {
    title: "Canada Ordnance Safety | Advanced Chemical Monitoring",
    description:
      "Advanced vapour-phase chemical sensing for ordnance safety assessment and accident prevention.",
    url: "https://canadaordnancesafety.com",
    siteName: "Canada Ordnance Safety",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/d9wt8plt0/cos-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "Canada Ordnance Safety",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Canada Ordnance Safety | Advanced Chemical Monitoring",
    description:
      "Advanced vapour-phase chemical sensing for ordnance safety assessment.",
    images: ["https://ik.imagekit.io/d9wt8plt0/cos-removebg-preview.png"],
  },

  generator: "ASPL Platform",


  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased cursor-none">
        <CustomCursor />
        <TrafficTracker />
          <PageLoader />
        {children}
      </body>
    </html>
  )
}
