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
  title: 'Hajer Fguir | Software Engineer',
  description:
    'Software Engineer specializing in Cybersecurity, APIs, CI/CD, and AI. Building secure, scalable, and impactful technology.',
  keywords: [
    'Software Engineer',
    'Cybersecurity',
    'API Development',
    'CI/CD',
    'AI',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Hajer Fguir' }],

  icons: {
    icon: '/hf-icon.png',
    apple: '/hf-icon.png',
  },

  openGraph: {
    title: 'Hajer Fguir | Software Engineer',
    description:
      'Software Engineer specializing in Cybersecurity, APIs, CI/CD, and AI.',
    type: 'website',
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
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}