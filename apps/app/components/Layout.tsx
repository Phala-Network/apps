import useBlockHeightListener from '@/hooks/useBlockHeightListener'
import {Container} from '@mui/material'
import {useConnectPolkadotWallet} from '@phala/lib'
import {useAtomsDevtools} from 'jotai/devtools'
import dynamic from 'next/dynamic'
import {FC, ReactNode} from 'react'
import TopBar from './TopBar'

const WalletDialog = dynamic(() => import('./WalletDialog'), {ssr: false})

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useAtomsDevtools('Phala App')
  useConnectPolkadotWallet('Phala App', 30)
  useBlockHeightListener()

  return (
    <>
      <TopBar />
      <Container maxWidth="xl" sx={{pb: 4}}>
        {children}
      </Container>
      <WalletDialog />
    </>
  )
}

export default Layout
