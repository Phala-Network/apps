'use client'
// import {colorSchemeSettingAtom} from '@/store/common'
import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  type PaletteMode,
} from '@mui/material'
// import {useAtom} from 'jotai'
import Cookies from 'js-cookie'
import {useEffect, useMemo, useState, type FC, type ReactNode} from 'react'
import GlobalStyles from '../GlobalStyles'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import {createCustomTheme} from './theme'

const ThemeRegistry: FC<{
  children: ReactNode
  colorScheme: PaletteMode
}> = ({children, colorScheme}) => {
  const [mode, setMode] = useState(colorScheme)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const [colorSchemeSetting] = useAtom(colorSchemeSettingAtom)
  const colorSchemeSetting = 'system'

  useEffect(() => {
    if (colorSchemeSetting != null) {
      let newColorScheme: PaletteMode
      if (colorSchemeSetting === 'system') {
        newColorScheme = prefersDarkMode ? 'dark' : 'light'
      } else {
        newColorScheme = colorSchemeSetting
      }
      setMode(newColorScheme)
      Cookies.set('color-scheme', newColorScheme)
    }
  }, [colorSchemeSetting, prefersDarkMode])

  const theme = useMemo(() => createCustomTheme(mode), [mode])

  return (
    <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

export default ThemeRegistry
