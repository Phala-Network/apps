import useListenBlockHeight from '@/hooks/useListenBlockHeight'
import {useNotice} from '@/hooks/useNotice'
import useShowWalletDialog from '@/hooks/useShowWalletDialog'
import {Container} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import type {FC, ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'
import WalletDialog from './WalletDialog'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useConnectPolkadotWallet('Phala App', 30)
  useListenBlockHeight()
  useShowWalletDialog()
  useNotice()

  return (
    <>
      <TopBar />
      <Container maxWidth="lg" sx={{pb: 4, px: {xs: 1, sm: 2, lg: 3}}}>
        {children}
      </Container>
      <WalletDialog />
      <ScrollTop />
    </>
  )
}

export default Layout
