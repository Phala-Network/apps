import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import {PaletteMode} from '@mui/material'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import {FC, ReactNode} from 'react'
import RootLayout from './RootLayout'

export const metadata: Metadata = {
  title: 'inDEX - Cross-Chain Intent Infrastructure',
  description: 'Leading the Intent-Centric Revolution in Cross-Chain Trading',
}

const Layout: FC<{children: ReactNode}> = ({children}) => {
  let colorScheme = cookies().get('color-scheme')?.value as PaletteMode
  if (colorScheme !== 'dark') {
    colorScheme = 'light'
  }

  return (
    <html lang="en">
      <body>
        <ThemeRegistry colorScheme={colorScheme}>
          <RootLayout>{children}</RootLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}

export default Layout
