import useBlockHeightListener from '@/hooks/useBlockHeightListener'
import useVaultReset from '@/hooks/useVaultReset'
import {chainAtom} from '@/store/common'
import {Container, useMediaQuery, useTheme} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import {useAtom} from 'jotai'
import {useRouter} from 'next/router'
import {SnackbarProvider} from 'notistack'
import {useEffect, type FC, type ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'
import WalletDialog from './WalletDialog'
import WikiDialog from './Wiki/Dialog'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const router = useRouter()
  const [chain] = useAtom(chainAtom)
  useConnectPolkadotWallet('Phala App', 30)
  useBlockHeightListener()
  useVaultReset()

  useEffect(() => {
    if (router.query.chain !== chain && router.isReady) {
      void router.replace(
        router.asPath.replace(/^\/(phala|khala)/, `/${chain}`),
        undefined,
        {shallow: true}
      )
    }
  }, [chain, router, router.isReady, router.query.chain, router.asPath])

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
