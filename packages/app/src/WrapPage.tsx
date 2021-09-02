import {ComponentsGlobalStyle} from '@phala/react-components'
import {Slide, ToastContainer} from 'react-toastify'
import BaseLayout from './components/BaseLayout'
import GlobalStyle from './GlobalStyle'

const WrapPage: React.FC = ({children}) => (
  <>
    <GlobalStyle />
    <ComponentsGlobalStyle />
    <BaseLayout>{children}</BaseLayout>
    <ToastContainer transition={Slide} />
  </>
)

export default WrapPage
