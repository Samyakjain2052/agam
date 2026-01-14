import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://velvet-directory.example.com'),
  title: {
    default: 'VelvetDirectory | Premium Escort & Companion Listings',
    template: '%s | VelvetDirectory',
  },
  description: 'The premier directory for finding high-quality companions, models, and escorts in your city. Verified profiles, real photos, and direct contact.',
  keywords: ['escorts', 'call girls', 'dating', 'companions', 'directory', 'models', 'vip'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://velvet-directory.example.com',
    siteName: 'VelvetDirectory',
    title: 'VelvetDirectory | Premium Exclusive Listings',
    description: 'Find your perfect companion on VelvetDirectory. Verified and premium listings.',
    images: [
      {
        url: '/og-image.jpg', // You would need to add this image
        width: 1200,
        height: 630,
        alt: 'VelvetDirectory Preview',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: './',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AgeGate from '@/components/AgeGate';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning>
        <AgeGate />
        <Header />
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
