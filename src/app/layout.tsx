import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyURL.io - Your Open-Source URL Shortener",
  description: "TinyURL.io is an open-source URL shortener with real-time analytics. Easily create custom short links and track user engagement with click analytics.",
  icons: "vercel.svg",
  openGraph: {
    title: "TinyURL.io - Open-Source URL Shortener with Real-Time Analytics",
    description: "Create short, memorable links and track their performance with TinyURL.io's real-time analytics.",
    url: "https://tinyyurl.vercel.app",
    type: "website",
  },
  twitter: {
    title: "TinyURL.io - Open-Source URL Shortener",
    description: "Easily create custom short links and track their performance with real-time analytics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
