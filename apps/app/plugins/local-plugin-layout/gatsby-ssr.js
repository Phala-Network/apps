import App from '../../src/WrapApp'
import WrapPage from '../../src/WrapPage'

export const wrapRootElement = ({element}) => {
  return <App>{element}</App>
}

export const wrapPageElement = ({props, element}) => (
  <WrapPage {...props}>{element}</WrapPage>
)

export const onRenderBody = ({setHtmlAttributes}) => {
  setHtmlAttributes({lang: 'en'})
}
