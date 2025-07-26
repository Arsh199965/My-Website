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
      <body
        className={`${inter.variable} antialiased`}
        style={{ position: "relative" }}
      >
        {children}
      </body>
    </html>
  );
}
