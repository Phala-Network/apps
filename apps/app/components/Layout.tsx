import useBlockHeightListener from '@/hooks/useBlockHeightListener'
import {Container} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import {useAtomsDevtools} from 'jotai/devtools'
import dynamic from 'next/dynamic'
import {FC, ReactNode} from 'react'
import ScrollTop from './ScrollTop'
import TopBar from './TopBar'

const WalletDialog = dynamic(() => import('./WalletDialog'), {ssr: false})

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useAtomsDevtools('Phala App')
  useConnectPolkadotWallet('Phala App', 30)
  useBlockHeightListener()

  return (
    <>
      <TopBar />
      <Container maxWidth="xl" sx={{pb: 4, px: {xs: 1, sm: 2, lg: 3}}}>
        {children}
      </Container>
      <WalletDialog />
      <ScrollTop />
    </>
  )
}

export default Layout
