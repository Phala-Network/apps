import {useAtomsDevtools} from 'jotai/devtools'
import {ReactNode, StrictMode} from 'react'
import BaseLayout from './components/BaseLayout'
import GlobalStyle from './GlobalStyle'
import {useAutoConnectWallet} from './hooks/useAutoConnectWallet'
import {useSubscribeWalletAccounts} from './hooks/useSubscribeWalletAccounts'
import {useTestnetGuard} from './hooks/useTestnetGuard'
import useZendesk from './hooks/useZendesk'

const WrapPage: React.FC<{children: ReactNode}> = ({children}) => {
  useTestnetGuard()
  useZendesk()
  useAutoConnectWallet()
  useSubscribeWalletAccounts()
  useAtomsDevtools('Phala App')

  return (
    <StrictMode>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <GlobalStyle />
      <BaseLayout>{children}</BaseLayout>
    </StrictMode>
  )
}

export default WrapPage
