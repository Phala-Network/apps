import {createTheme} from '@mui/material'
import {Barlow, Montserrat, Roboto} from '@next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const barlow = Barlow({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {mode: 'dark', primary: {main: '#C5FF46'}},
  breakpoints: {
    values: {xs: 0, sm: 576, md: 768, lg: 992, xl: 1200},
  },
  shape: {borderRadius: 6},
  typography: {
    h1: {fontFamily: montserrat.style.fontFamily},
    h2: {fontFamily: montserrat.style.fontFamily},
    h3: {fontFamily: montserrat.style.fontFamily, fontWeight: 600},
    h4: {fontFamily: montserrat.style.fontFamily, fontWeight: 600},
    h5: {fontFamily: montserrat.style.fontFamily},
    h6: {fontFamily: montserrat.style.fontFamily},
    num1: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 700,
      fontSize: '2.75rem',
    },
    num2: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 700,
      fontSize: '2.125rem',
    },
    num3: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    num4: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    num5: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 500,
      fontSize: '2.75rem',
    },
    num6: {
      fontFamily: barlow.style.fontFamily,
      fontWeight: 600,
      fontSize: '1rem',
    },
    fontFamily: roboto.style.fontFamily,
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
        root: {textTransform: 'none', fontFamily: montserrat.style.fontFamily},
      },
    },
    MuiTextField: {defaultProps: {variant: 'outlined'}},
    MuiInputLabel: {defaultProps: {shrink: true}},
    MuiOutlinedInput: {defaultProps: {notched: true}},
    MuiLoadingButton: {defaultProps: {variant: 'outlined'}},
    MuiChip: {defaultProps: {variant: 'outlined'}},
    MuiDialog: {defaultProps: {fullWidth: true, maxWidth: 'xs'}},
  },
})