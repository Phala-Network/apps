import {type ColorSchemeSetting, colorSchemeSettingAtom} from '@/store/common'
import type {} from '@mui/lab/themeAugmentation'
import {ThemeProvider, createTheme, useMediaQuery} from '@mui/material'
import {useAtom} from 'jotai'
import {type FC, type ReactNode, useEffect, useMemo, useState} from 'react'

const MuiThemeProvider: FC<{children: ReactNode}> = ({children}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [colorSchemeSetting] = useAtom(colorSchemeSettingAtom)
  const [colorSchemeState, setColorSchemeState] = useState<ColorSchemeSetting>()
  const mode =
    colorSchemeState == null || colorSchemeState === 'system'
      ? prefersDarkMode
        ? 'dark'
        : 'light'
      : colorSchemeState

  useEffect(() => {
    // Avoid hydrate mismatch
    setColorSchemeState(colorSchemeSetting)
  }, [colorSchemeSetting])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'sans-serif',
          ].join(', '),
        },
        components: {
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
          MuiButtonGroup: {
            defaultProps: {
              disableRipple: true,
              disableElevation: true,
            },
          },
          MuiPaper: {
            defaultProps: {
              variant: 'outlined',
            },
          },
          MuiButton: {
            defaultProps: {
              disableElevation: true,
              variant: 'outlined',
            },
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
            },
          },
          MuiInputLabel: {
            defaultProps: {shrink: true},
          },
          MuiOutlinedInput: {
            defaultProps: {notched: true},
          },
          MuiLoadingButton: {
            defaultProps: {variant: 'outlined'},
          },
          MuiChip: {
            defaultProps: {variant: 'outlined'},
          },
          MuiInput: {
            defaultProps: {disableUnderline: true},
          },
        },
      }),
    [mode],
  )

  return (
    <>
      {colorSchemeState == null && <style>{'body {visibility: hidden}'}</style>}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default MuiThemeProvider
