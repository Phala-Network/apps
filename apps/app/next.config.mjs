import withBundleAnalyzer from '@next/bundle-analyzer'
import {withSentryConfig} from '@sentry/nextjs'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'jotai-devtools',
    '@polkadot/api',
    '@polkadot/types-codec',
  ],
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'lib', 'hooks', 'store', 'types'],
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.coinmarketcap.com',
        pathname: '/static/img/coins/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{loader: '@svgr/webpack', options: {dimensions: false}}],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/khala',
        permanent: false,
      },
      {
        source: '/delegate',
        destination: '/khala/delegate/vault',
        permanent: false,
      },
      {
        source: '/farm',
        destination: '/khala/farm/stake-pool',
        permanent: false,
      },
      {
        source: '/:root(delegate|farm|vault|stake-pool)/:path*',
        destination: '/khala/:root/:path*',
        permanent: false,
      },
    ]
  },
  experimental: {
    swcPlugins: [
      ['@swc-jotai/debug-label', {}],
      ['@swc-jotai/react-refresh', {}],
    ],
  },
}

export default withSentryConfig(
  bundleAnalyzer(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'phala-network',
    project: 'phala-app',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
)
