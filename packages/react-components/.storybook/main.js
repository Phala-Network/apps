const {resolve} = require('path')

const base = resolve(__dirname, '..', '..')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    require.resolve('@storybook/addon-links'),
    require.resolve('@storybook/addon-essentials'),
    require.resolve('@storybook/addon-postcss'),
  ],
  webpackFinal(config) {
    const alias = config.resolve.alias || {}

    alias['@phala/app-config'] = resolve(base, 'app-config', 'src')
    alias['@phala/app-store'] = resolve(base, 'app-store', 'src')
    alias['@phala/app-assets'] = resolve(base, 'app-assets', 'src')
    alias['@phala/app-bridge'] = resolve(base, 'app-bridge', 'src')
    alias['@phala/app-console'] = resolve(base, 'app-console', 'src')
    alias['@phala/app-types'] = resolve(base, 'app-types', 'src')
    alias['@phala/react-cms'] = resolve(base, 'react-cms', 'src')
    alias['@phala/react-hooks'] = resolve(base, 'react-hooks', 'src')
    alias['@phala/react-i18n'] = resolve(base, 'react-i18n', 'src')
    alias['@phala/react-libs'] = resolve(base, 'react-libs', 'src')
    alias['@phala/utils'] = resolve(base, 'utils', 'src')
    alias['@phala/react-graph-chainbridge'] = resolve(
      base,
      'react-graph-chainbridge',
      'src'
    )

    return config
  },
}
