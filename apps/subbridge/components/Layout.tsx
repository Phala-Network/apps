import {useEthereumProviderInitialization} from '@/hooks/useEthereumProviderInitialization'
import {usePolkadotAccountInitialization} from '@/hooks/usePolkadotAccountInitialization'
import {useValidation} from '@/hooks/useValidation'
import {FC, ReactNode} from 'react'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useEthereumProviderInitialization()
  usePolkadotAccountInitialization()
  useValidation()

  return (
    <>
      <TopBar />
      {children}
    </>
  )
}

export default Layout
