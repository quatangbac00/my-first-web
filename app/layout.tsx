import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import Header from "@/app/components/layout/header";
import { CartProvider } from "@/app/components/cart/CartProvider";
import FloatingContact from "@/app/components/ui/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ga-cham-chi.vercel.app"),
verification: {
  google: "JxDeibjSoMHyCQ8iAPVVwuxDqGvFIgEJZXuU7anPzIQ",
},
  title: {
    default: "Gà Chăm Chỉ | Đồ hóa trang, phụ kiện & quà tặng",
    template: "%s | Gà Chăm Chỉ",
  },

  description:
    "Gà Chăm Chỉ cung cấp đồ hóa trang, phụ kiện, vật phẩm sưu tầm và quà tặng độc đáo tại Đông Anh, Hà Nội.",

  keywords: [
    "Gà Chăm Chỉ",
    "đồ hóa trang",
    "phụ kiện hóa trang",
    "đồ sưu tầm",
    "quà tặng",
    "đồ lưu niệm",
    "Đông Anh",
    "Hà Nội",
  ],

  authors: [
    {
      name: "Gà Chăm Chỉ",
    },
  ],

  creator: "Gà Chăm Chỉ",
  publisher: "Gà Chăm Chỉ",
  applicationName: "Gà Chăm Chỉ",
  category: "shopping",

  openGraph: {
    title: "Gà Chăm Chỉ | Đồ hóa trang, phụ kiện & quà tặng",
    description:
      "Khám phá đồ hóa trang, phụ kiện, vật phẩm sưu tầm và những món quà độc đáo tại Gà Chăm Chỉ.",
    type: "website",
    locale: "vi_VN",
    siteName: "Gà Chăm Chỉ",

    images: [
      {
        url: "/images/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Gà Chăm Chỉ - Đồ hóa trang, phụ kiện và quà tặng",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gà Chăm Chỉ | Đồ hóa trang, phụ kiện & quà tặng",
    description:
      "Khám phá đồ hóa trang, phụ kiện, vật phẩm sưu tầm và những món quà độc đáo tại Gà Chăm Chỉ.",
    images: ["/images/hero-banner.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/images/logo.jpg",
        type: "image/jpeg",
      },
    ],
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />

          <main className="flex-1 pt-16">{children}</main>

          <FloatingContact />
        </CartProvider>

        <Analytics />
      </body>
    </html>
  );
}