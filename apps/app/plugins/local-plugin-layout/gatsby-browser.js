const React = require('react')
const App = require('../../src/WrapApp').default
const WrapPage = require('../../src/WrapPage').default

exports.wrapRootElement = ({element}) => {
  return <App>{element}</App>
}

exports.wrapPageElement = ({props, element}) => (
  <WrapPage {...props}>{element}</WrapPage>
)
