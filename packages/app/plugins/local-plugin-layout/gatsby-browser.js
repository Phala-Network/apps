const React = require('react')
const WrapPage = require('../../src/WrapPage').default

exports.wrapPageElement = ({ props, element }) => (
  <WrapPage {...props}>{element}</WrapPage>
)
