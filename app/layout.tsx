import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMT Club Guadalajara | Day N Night Experience",
  description:
    "Where consciousness expands and reality bends. Guadalajara's premier destination for transcendent electronic music experiences. Melodic techno, immersive visuals, and sensory transcendence.",
  keywords: [
    "DMT Club",
    "Guadalajara",
    "nightclub",
    "electronic music",
    "melodic techno",
    "Afterlife",
    "immersive experience",
    "VIP reservations",
  ],
  authors: [{ name: "DMT Club Guadalajara" }],
  creator: "DMT Club",
  openGraph: {
    title: "DMT Club Guadalajara | Day N Night Experience",
    description:
      "Where consciousness expands and reality bends. An immersive sanctuary for those who seek the extraordinary.",
    url: "https://dmtclub.mx",
    siteName: "DMT Club Guadalajara",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMT Club Guadalajara",
    description: "Where consciousness expands and reality bends.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#F4F4F4" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${syne.variable} ${inter.variable} night`}>
      <body className="font-sans antialiased bg-dmt-black">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
