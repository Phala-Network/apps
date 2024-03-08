import useListenBlockHeight from '@/hooks/useListenBlockHeight'
import useResetVault from '@/hooks/useResetVault'
import useSyncPath from '@/hooks/useSyncPath'
import {Container, useMediaQuery, useTheme} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import {SnackbarProvider} from 'notistack'
import type {FC, ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'
import WalletDialog from './WalletDialog'
import WikiDialog from './Wiki/Dialog'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  useConnectPolkadotWallet('Phala App', 30)
  useListenBlockHeight()
  useResetVault()
  useSyncPath()

  return (
    <SnackbarProvider
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
      <TopBar />
      <Container maxWidth="xl" sx={{pb: 4, px: {xs: 1, sm: 2, lg: 3}}}>
        {children}
      </Container>
      <WalletDialog />
      <WikiDialog />
      <ScrollTop />
    </SnackbarProvider>
  )
}

export default Layout
