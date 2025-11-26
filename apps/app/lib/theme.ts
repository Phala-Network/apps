'use client'

import {createTheme} from '@mui/material/styles'

// Font family - Montserrat is loaded in layout.tsx
const fontFamily = 'Montserrat, Helvetica, Arial, sans-serif'

export const colors = {
  main: {
    100: '#dfff99',
    200: '#d2ff70',
    300: '#9ae000',
    400: '#c5ff46',
    500: '#70a300',
    700: '#395100',
    900: '#1c2800',
  },
  vault: {
    100: '#e1c2ff',
    200: '#ba70ff',
    300: '#7917d3',
    400: '#8625e7',
    500: '#5b189a',
    700: '#37105b',
    900: '#1f0a32',
  },
  cardBackground: '#191A24',
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {main: colors.main[400]},
    secondary: {main: colors.vault[400]},
    success: {main: '#34C53B'},
  },
  breakpoints: {
    values: {xs: 0, sm: 576, md: 768, lg: 992, xl: 1200},
  },
  shape: {borderRadius: 6},
  typography: {
    fontFamily,
    h1: {fontFamily},
    h2: {fontFamily},
    h3: {fontFamily, fontWeight: 600},
    h4: {
      fontFamily,
      fontWeight: 500,
      fontSize: '2rem',
    },
    subtitle2: {fontSize: '0.8rem', fontWeight: 400},
  },
  components: {
    MuiButtonBase: {defaultProps: {disableRipple: true}},
    MuiButtonGroup: {
      defaultProps: {disableRipple: true, disableElevation: true},
    },
    MuiPaper: {defaultProps: {variant: 'outlined'}},
    MuiButton: {
      defaultProps: {disableElevation: true, variant: 'outlined'},
      styleOverrides: {
        root: {textTransform: 'none', fontFamily},
      },
    },
    MuiTextField: {defaultProps: {variant: 'outlined'}},
    MuiInputLabel: {defaultProps: {shrink: true}},
    MuiOutlinedInput: {defaultProps: {notched: true}},
    MuiDialog: {defaultProps: {fullWidth: true, maxWidth: 'xs'}},
    MuiMenu: {styleOverrides: {list: {backgroundColor: colors.cardBackground}}},
    MuiSkeleton: {defaultProps: {animation: 'wave'}},
    MuiDialogContent: {styleOverrides: {root: {overflowY: 'initial'}}},
  },
})
