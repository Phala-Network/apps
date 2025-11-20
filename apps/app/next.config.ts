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
  async redirects() {
    return [
      {
        source: '/',
        destination: '/staking',
        permanent: false,
      },
      {
        source: '/khala/:path*',
        destination: '/khala-assets',
        permanent: true,
      },
      {
        source: '/phala/:path*',
        destination: '/khala-assets',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/phala-assets',
        destination: '/khala-assets',
      },
    ]
  },
  experimental: {
    swcPlugins: [
      // ['@swc-jotai/debug-label', {}],
      // ['@swc-jotai/react-refresh', {}],
    ],
  },
}

export default bundleAnalyzer(nextConfig)
