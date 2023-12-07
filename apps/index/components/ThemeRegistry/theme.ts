import type {} from '@mui/lab/themeAugmentation'
import {createTheme, type PaletteMode, type Theme} from '@mui/material'

export const createCustomTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#f1f1f1' : '#0e0e0e',
      },
      background: {
        default: mode === 'dark' ? '#17191b' : '#f7f9fb',
        paper: mode === 'dark' ? '#17191b' : '#fefefe',
      },
    },
    shape: {borderRadius: 12},
    typography: {
      fontFamily: [
        'Poppins',
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
