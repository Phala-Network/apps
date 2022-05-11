import {useEthersInitialization} from '@/hooks/useEthersInitialization'
import {usePolkadotAccountInitialization} from '@/hooks/usePolkadotAccountInitialization'
import {useValidation} from '@/hooks/useValidation'
import {FC, ReactNode} from 'react'
import TopBar from './TopBar'

const Layout: FC<{children: ReactNode}> = ({children}) => {
  useEthersInitialization()
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
