import {Helmet} from 'react-helmet'
import {ComponentsGlobalStyle} from '@phala/react-components'
import BaseLayout from './components/BaseLayout'
import GlobalStyle from './GlobalStyle'
import {StrictMode} from 'react'

const WrapPage: React.FC = ({children}) => (
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

export default WrapPage
