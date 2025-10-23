import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif-sc',
});

export const metadata: Metadata = {
  title: 'Golden Wok | Authentic Chinese Cuisine',
  description: 'Experience authentic Chinese cuisine with modern flair. Golden Wok offers the finest Sichuan and Cantonese dishes with online ordering and delivery.',
  keywords: ['Chinese restaurant', 'Sichuan cuisine', 'Cantonese food', 'online ordering', 'food delivery', 'dim sum', 'noodles', 'authentic Chinese'],
  authors: [{ name: 'Golden Wok' }],
  openGraph: {
    title: 'Golden Wok | Authentic Chinese Cuisine',
    description: 'Experience authentic Chinese cuisine with modern flair',
    url: 'https://goldenwok.com',
    siteName: 'Golden Wok',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Golden Wok Restaurant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golden Wok | Authentic Chinese Cuisine',
    description: 'Experience authentic Chinese cuisine with modern flair',
    images: ['https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&q=80'],
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSerifSC.variable}`}>
        <CartProvider>
          <OrderProvider>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
