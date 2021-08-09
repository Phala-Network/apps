const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }

  actions.setWebpackConfig({
    plugins: [
      new NodePolyfillPlugin({
        excludeAliases: [
          'assert',
          'console',
          'constants',
          'domain',
          'events',
          'http',
          'https',
          'os',
          'path',
          'punycode',
          'process',
          'querystring',
          '_stream_duplex',
          '_stream_passthrough',
          '_stream_readable',
          '_stream_transform',
          '_stream_writable',
          'string_decoder',
          'sys',
          'timers',
          'tty',
          'url',
          'util',
          'vm',
          'zlib',
        ],
      }),
    ],
  })
}
