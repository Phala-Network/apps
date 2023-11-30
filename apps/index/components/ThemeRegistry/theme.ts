import type {} from '@mui/lab/themeAugmentation'
import {createTheme, type PaletteMode, type Theme} from '@mui/material'

export const createCustomTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: {mode, primary: {main: mode === 'dark' ? '#fff' : '#000'}},
    breakpoints: {values: {xs: 0, sm: 576, md: 768, lg: 992, xl: 1200}},
    shape: {borderRadius: 12},
    typography: {
      h1: {fontWeight: 700},
      h2: {fontWeight: 700},
      h3: {fontWeight: 700},
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'sans-serif',
      ].join(', '),
    },
    components: {
      MuiButtonBase: {defaultProps: {disableRipple: true}},
      MuiButtonGroup: {
        defaultProps: {disableRipple: true, disableElevation: true},
      },
      MuiPaper: {defaultProps: {variant: 'outlined'}},
      MuiButton: {
        defaultProps: {disableElevation: true, variant: 'outlined'},
        styleOverrides: {root: {textTransform: 'none'}},
      },
      MuiTextField: {defaultProps: {variant: 'outlined'}},
      MuiInputLabel: {defaultProps: {shrink: true}},
      MuiOutlinedInput: {defaultProps: {notched: true}},
      MuiLoadingButton: {defaultProps: {variant: 'outlined'}},
      MuiChip: {defaultProps: {variant: 'outlined'}},
      MuiInput: {defaultProps: {disableUnderline: true}},
    },
  })
