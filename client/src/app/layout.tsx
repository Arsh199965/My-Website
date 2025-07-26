import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arsh Ahmad - Creative Developer Portfolio",
  description:
    "Creative developer crafting innovative digital solutions and building impactful applications. Specializing in React, Next.js, Python, and modern web technologies.",
  keywords: [
    "developer",
    "portfolio",
    "web development",
    "react",
    "next.js",
    "typescript",
    "python",
    "machine learning",
    "Arsh Ahmad",
  ],
  authors: [{ name: "Arsh Ahmad" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "48x48" },
      { url: "/favicon-16x16.svg", type: "image/svg+xml", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  metadataBase: new URL("https://arsh-ahmad.dev"),
  openGraph: {
    title: "Arsh Ahmad - Creative Developer Portfolio",
    description:
      "Creative developer crafting innovative digital solutions and building impactful applications.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/apple-icon.svg",
        width: 180,
        height: 180,
        alt: "Arsh Ahmad Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Arsh Ahmad - Creative Developer Portfolio",
    description:
      "Creative developer crafting innovative digital solutions and building impactful applications.",
    images: ["/apple-icon.svg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <meta name="theme-color" content="#34d399" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        style={{ position: "relative" }}
      >
        {children}
      </body>
    </html>
  );
}
