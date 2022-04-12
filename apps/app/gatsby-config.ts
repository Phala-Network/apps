import type {GatsbyConfig} from 'gatsby'

const config: GatsbyConfig = {
  jsxRuntime: 'automatic',
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    'local-plugin-layout', // This plugin's place decides providers order, which is highly important
    'local-plugin-styletron',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {trackingIds: ['G-E0PDMEJQ0T']},
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        // https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
        allowList: ['CONTEXT'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        // don't load Montserrat:400 because it's too light
        fonts: ['Lato', 'Montserrat:500,600,700', 'PT Mono'],
        display: 'swap',
      },
    },
    process.env.NODE_ENV === 'production' && {
      resolve: '@sentry/gatsby',
      options: {
        dsn: 'https://ba6cd9ff61544ca6a96f3ca1d90445f2@o812739.ingest.sentry.io/5879132',
        sampleRate: 1,
      },
    },
  ].filter(<T>(x: T): x is T extends false ? never : T => Boolean(x)),
}

export default config
