const React = require('react')
const App = require('./src/WrapApp').default

exports.wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
