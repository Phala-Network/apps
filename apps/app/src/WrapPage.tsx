import {Helmet} from 'react-helmet'
import {ComponentsGlobalStyle} from '@phala/react-components'
import BaseLayout from './components/BaseLayout'
import GlobalStyle from './GlobalStyle'
import {ReactNode, StrictMode} from 'react'
import {useTestnetGuard} from './hooks/useTestnetGuard'
import useZendesk from './hooks/useZendesk'
import {useAutoConnectWallet} from './hooks/useAutoConnectWallet'
import {useSubscribeWalletAccounts} from './hooks/useSubscribeWalletAccounts'
import {useAtomsDevtools} from 'jotai/devtools'

const WrapPage: React.FC<{children: ReactNode}> = ({children}) => {
  useTestnetGuard()
  useZendesk()
  useAutoConnectWallet()
  useSubscribeWalletAccounts()
  useAtomsDevtools('Phala App')

  return (
    <StrictMode>
      <Helmet titleTemplate="%s | Phala App">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <GlobalStyle />
      <ComponentsGlobalStyle />
      <BaseLayout>{children}</BaseLayout>
    </StrictMode>
  )
}

export default WrapPage
