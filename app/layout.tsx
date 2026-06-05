import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taste Old Tappan | Best Food & Restaurants in Old Tappan, NJ",
    template: "%s | Taste Old Tappan"
  },
  description: "Discover the best restaurants, cafés, and bakeries in Old Tappan, New Jersey. Your ultimate food discovery guide for locals and tourists.",
  keywords: ["Old Tappan", "Restaurants", "New Jersey", "Food Guide", "Dining", "NJ Food"],
  authors: [{ name: "Taste Old Tappan Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tasteoldtappan.com",
    siteName: "Taste Old Tappan",
    title: "Taste Old Tappan | Best Food & Restaurants in Old Tappan, NJ",
    description: "Discover the best culinary experiences in Old Tappan, New Jersey.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taste Old Tappan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taste Old Tappan | Best Food & Restaurants in Old Tappan, NJ",
    description: "Discover the best culinary experiences in Old Tappan, New Jersey.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Taste Old Tappan",
    "url": "https://tasteoldtappan.com",
    "description": "Food discovery platform for Old Tappan, New Jersey",
    "publisher": {
      "@type": "Organization",
      "name": "Taste Old Tappan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tasteoldtappan.com/logo.png"
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-cream-light`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
