import withBundleAnalyzer from '@next/bundle-analyzer'
import type {NextConfig} from 'next'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
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
        source: '/khala/:path*',
        destination: '/khala-assets',
        permanent: false,
      },
      {
        source: '/phala/:path*',
        destination: '/:path*',
        permanent: false,
      },
    ]
  },
  experimental: {
    swcPlugins: [
      // ['@swc-jotai/debug-label', {}],
      // ['@swc-jotai/react-refresh', {}],
    ],
    turbo: {
      rules: {
        loaders: {
          '*.svg': {
            loaders: [{loader: '@svgr/webpack', options: {dimensions: false}}],
            as: '*.js',
          },
        },
      },
    },
  },
}

export default bundleAnalyzer(nextConfig)
