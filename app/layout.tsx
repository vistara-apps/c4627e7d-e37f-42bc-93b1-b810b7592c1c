import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkGuard - Scan links for scams, instantly',
  description: 'A Base MiniApp that scans pasted links for phishing and scam patterns, providing real-time alerts and educational insights.',
  keywords: ['security', 'phishing', 'scam detection', 'link scanner', 'base miniapp'],
  authors: [{ name: 'LinkGuard Team' }],
  openGraph: {
    title: 'LinkGuard - Scan links for scams, instantly',
    description: 'A Base MiniApp that scans pasted links for phishing and scam patterns, providing real-time alerts and educational insights.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
