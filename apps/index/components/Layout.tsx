import {useEthereumProviderInitialization} from '@/hooks/useEthereumProviderInitialization'
import {useIndexClientInitialization} from '@/hooks/useIndexClientInitialization'
import {useValidation} from '@/hooks/useValidation'
import {useConnectPolkadotWallet} from '@phala/utils'
import {type FC, type ReactNode} from 'react'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useEthereumProviderInitialization()
  useConnectPolkadotWallet('inDEX')
  useValidation()
  useIndexClientInitialization()

  return (
    <>
      <TopBar />
      {children}
    </>
  )
}

export default Layout
