'use client'

import {useMediaQuery} from '@mui/material'
import {useTheme} from '@mui/material'
import {SnackbarProvider as NotistackSnackbarProvider} from 'notistack'

const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <NotistackSnackbarProvider
      classes={{
        containerAnchorOriginTopRight:
          'notistack-containerAnchorOriginTopRight',
      }}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: matches ? 'top' : 'bottom',
        horizontal: matches ? 'right' : 'center',
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}

export default SnackbarProvider
