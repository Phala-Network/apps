import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import Providers from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Phala Network App',
    template: '%s - Phala Network App',
  },
  description: 'Phala Network App - Staking, GPU Mining',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#c5ff46" />
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
