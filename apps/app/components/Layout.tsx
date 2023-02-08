import useBlockHeightListener from '@/hooks/useBlockHeightListener'
import useChainGuard from '@/hooks/useChainGuard'
import useVaultReset from '@/hooks/useVaultReset'
import {Container, useMediaQuery, useTheme} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import {useAtomsDevtools} from 'jotai-devtools'
import {SnackbarProvider} from 'notistack'
import {type FC, type ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'
import WalletDialog from './WalletDialog'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  useAtomsDevtools('Phala App')
  useConnectPolkadotWallet('Phala App', 30)
  useBlockHeightListener()
  useVaultReset()
  useChainGuard()

  return (
    <SnackbarProvider
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
      <ScrollTop />
    </SnackbarProvider>
  )
}

export default Layout
