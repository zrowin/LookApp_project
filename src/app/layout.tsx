import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/ui/TopNav'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LookApp - Virtual Wardrobe & Outfit Builder',
    template: '%s | LookApp',
  },
  description:
    'LookApp is your personal virtual wardrobe manager. Upload clothing photos, organize your closet, create outfits, and get style recommendations.',
  keywords: [
    'virtual wardrobe',
    'outfit builder',
    'fashion',
    'style',
    'closet',
    'clothing',
    'fashion app',
  ],
  authors: [{ name: 'LookApp Team' }],
  creator: 'LookApp',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'LookApp',
    title: 'LookApp - Virtual Wardrobe & Outfit Builder',
    description:
      'LookApp is your personal virtual wardrobe manager. Upload clothing photos, organize your closet, create outfits, and get style recommendations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookApp - Virtual Wardrobe & Outfit Builder',
    description:
      'LookApp is your personal virtual wardrobe manager. Upload clothing photos, organize your closet, create outfits, and get style recommendations.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <TopNav />
        <div className="pt-0">{children}</div>
      </body>
    </html>
  )
}
