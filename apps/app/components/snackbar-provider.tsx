'use client'

import {useMediaQuery, useTheme} from '@mui/material'
import {SnackbarProvider as NotistackSnackbarProvider} from 'notistack'

const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <NotistackSnackbarProvider
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
