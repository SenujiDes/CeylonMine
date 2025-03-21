import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Royalty Calculator',
  description: 'Calculate rock quarry royalties based on GSMB guidelines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
} 