import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import TopBar from '@/components/TopBar'
import {Box, PaletteMode} from '@mui/material'
import {cookies} from 'next/headers'
import {FC, ReactNode} from 'react'
import RootLayout from './RootLayout'

export const metadata = {
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
          <TopBar />
          <Box component="main" sx={{mt: ['48px', '56px', '64px']}}>
            <RootLayout>{children}</RootLayout>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}

export default Layout
