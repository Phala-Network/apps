import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['jotai-devtools'],
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

export default bundleAnalyzer(nextConfig)
