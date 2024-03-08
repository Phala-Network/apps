import {useEthereumProviderInitialization} from '@/hooks/useEthereumProviderInitialization'
import {useValidation} from '@/hooks/useValidation'
import {useConnectPolkadotWallet} from '@phala/lib'
import type {FC, ReactNode} from 'react'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useEthereumProviderInitialization()
  useConnectPolkadotWallet('SubBridge')
  useValidation()

  return (
    <>
      <TopBar />
      {children}
    </>
  )
}

export default Layout
