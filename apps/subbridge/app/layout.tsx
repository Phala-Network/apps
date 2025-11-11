import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SubBridge - Service Discontinued',
  description:
    'SubBridge service has been discontinued. Please visit bridge.phala.network for the new L2 bridge.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
