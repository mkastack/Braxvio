import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/system/ClientShell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

export const viewport: Viewport = {
  themeColor: "#002F5B",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://braxvio.com"),
  title: {
    default: "Braxvio — Global Technology Company & Product Ecosystem",
    template: "%s | Braxvio"
  },
  description: "Braxvio builds digital products, platforms, and infrastructure designed to solve meaningful problems and improve how people interact with technology.",
  keywords: [
    "Braxvio",
    "Parent Technology Company",
    "Kampus",
    "Pharmora",
    "Ecolift",
    "DevPay Africa",
    "African Technology Ecosystem",
    "Software Infrastructure",
    "Digital Products"
  ],
  authors: [{ name: "Braxvio Technologies" }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/braxvio-mark.png', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxvio.com",
    siteName: "Braxvio",
    title: "Braxvio — Global Technology Company & Product Ecosystem",
    description: "Building the digital products and systems behind everyday life.",
    images: [
      {
        url: "/og-braxvio.png",
        width: 1200,
        height: 630,
        alt: "Braxvio — Technology for Real Life"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Braxvio — Global Technology Company & Product Ecosystem",
    description: "Technology with purpose, designed for real life.",
    creator: "@braxvio",
    images: ["/og-braxvio.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  );
}
