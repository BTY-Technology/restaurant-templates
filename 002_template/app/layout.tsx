import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Watermark } from '@/components/Watermark';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Smash & Stack - Smashed to Perfection | BTY Technology',
    template: '%s | Smash & Stack | BTY Technology',
  },
  description: 'Experience the ultimate smash burger. Fresh, locally-sourced ingredients, perfectly seasoned patties, and unforgettable flavors.',
  keywords: ['burger', 'smash burger', 'restaurant', 'food', 'fast food', 'delivery'],
  authors: [{ name: 'Smash & Stack' }],
  creator: 'Smash & Stack',
  publisher: 'Smash & Stack',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smashstack.com',
    title: 'Smash & Stack - Smashed to Perfection',
    description: 'Experience the ultimate smash burger. Fresh, locally-sourced ingredients, perfectly seasoned patties, and unforgettable flavors.',
    siteName: 'Smash & Stack',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smash & Stack Burger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smash & Stack - Smashed to Perfection',
    description: 'Experience the ultimate smash burger. Fresh, locally-sourced ingredients, perfectly seasoned patties, and unforgettable flavors.',
    images: ['/og-image.jpg'],
    creator: '@smashstack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/btyfavi.svg',
    shortcut: '/btyfavi.svg',
    apple: '/btyfavi.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <OrderProvider>
            <Header />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <Watermark />
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
