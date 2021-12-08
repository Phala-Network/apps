/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const path = require('path')
const resolvePath = (pathString) => path.resolve(__dirname, pathString)
const rp = resolvePath

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@phala/app-analytics': rp('../app-analytics/src'),
          '@phala/app-data-analytics': rp('../app-data-analytics/src'),
          '@phala/app-assets': rp('../app-assets/src'),
          '@phala/app-bridge': rp('../app-bridge/src'),
          '@phala/app-config': rp('../app-config/src'),
          '@phala/app-mining': rp('../app-mining/src'),
          '@phala/app-store': rp('../app-store/src'),
          '@phala/app-types': rp('../app-types/src'),
          '@phala/react-cms': rp('../react-cms/src'),
          '@phala/react-components': rp('../react-components/src'),
          '@phala/react-graph-chainbridge': rp(
            '../react-graph-chainbridge/src'
          ),
          '@phala/react-hooks': rp('../react-hooks/src'),
          '@phala/react-libs': rp('../react-libs/src'),
          '@phala/utils': rp('../utils/src'),
        },
      },
    },
    `gatsby-plugin-pnpm`,
    'local-plugin-layout', // Move IntlProvider outside of the layout component
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-E0PDMEJQ0T'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /.svg$/,
        },
      },
    },
    process.env.NODE_ENV === 'production' && {
      resolve: '@sentry/gatsby',
      options: {
        dsn: 'https://ba6cd9ff61544ca6a96f3ca1d90445f2@o812739.ingest.sentry.io/5879132',
        sampleRate: 1,
      },
    },
  ].filter(Boolean),
}
