import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hajerfguir.com'),

  title: 'Hajer Fguir | Software Developer',
  description:
    'Turning ideas into secure, scalable, and intelligent digital experiences.',

  keywords: [
    'Hajer Fguir',
    'Software Developer',
    'Cybersecurity',
    'API Development',
    'CI/CD',
    'AI',
    'Full Stack Developer',
    'Portfolio',
  ],

  authors: [{ name: 'Hajer Fguir' }],
  creator: 'Hajer Fguir',

  icons: {
    icon: '/hf-icon.png',
    apple: '/hf-icon.png',
  },

  openGraph: {
    title: 'Hajer Fguir | Software Developer',
    description:
      'Turning ideas into secure, scalable, and intelligent digital experiences.',
    url: 'https://www.hajerfguir.com',
    siteName: 'Hajer Fguir Portfolio',
    images: [
      {
        url: '/images/hero-1.png',
        width: 1200,
        height: 630,
        alt: 'Hajer Fguir Portfolio',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hajer Fguir | Software Developer',
    description:
      'Turning ideas into secure, scalable, and intelligent digital experiences.',
    images: ['/images/hero-1.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}