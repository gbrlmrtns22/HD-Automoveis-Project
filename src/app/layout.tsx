import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "HD Automóveis",
  description: "Modern dealership platform for inventory, leads, and admin analytics.",
  metadataBase: new URL("https://hd-automoveis.example.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
