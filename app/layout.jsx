import { Playfair_Display, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'On Becoming with Katrina Thorpe',
  description: 'Honest conversations about healing, identity and building a beautiful life after divorce, with Katrina Thorpe.',
  openGraph: {
    title: 'On Becoming with Katrina Thorpe',
    description: 'Honest conversations about healing, identity and building a beautiful life after divorce, with Katrina Thorpe.',
    url: 'https://www.onbecoming.co.nz',
    type: 'website',
    images: [
      {
        url: 'https://www.onbecoming.co.nz/on-becoming-og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'On Becoming with Katrina Thorpe',
    description: 'Honest conversations about healing, identity and building a beautiful life after divorce, with Katrina Thorpe.',
    images: ['https://www.onbecoming.co.nz/on-becoming-og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
