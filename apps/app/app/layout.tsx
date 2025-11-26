import type {Metadata} from 'next'
import {Montserrat} from 'next/font/google'
import {headers} from 'next/headers'
import type {ReactNode} from 'react'

import Providers from './providers'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Phala Network App',
    template: '%s | Phala Network App',
  },
  description: 'Phala Network App - Staking, GPU Mining',
}

export default async function RootLayout({children}: {children: ReactNode}) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#c5ff46" />
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={montserrat.className}>
        <Providers cookies={cookies}>{children}</Providers>
      </body>
    </html>
  )
}
