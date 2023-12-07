import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import {PaletteMode} from '@mui/material'
import {Metadata} from 'next'
import {cookies} from 'next/headers'
import {FC, ReactNode} from 'react'
import RootLayout from './RootLayout'

const GTM_ID = process.env.GTM_ID
const gtagScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`

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
      <head>
        {GTM_ID != null && (
          <script dangerouslySetInnerHTML={{__html: gtagScript}}></script>
        )}
      </head>
      <body>
        <ThemeRegistry colorScheme={colorScheme}>
          <RootLayout>{children}</RootLayout>
        </ThemeRegistry>
      </body>
    </html>
  )
}

export default Layout
