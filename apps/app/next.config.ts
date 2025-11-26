import withBundleAnalyzer from '@next/bundle-analyzer'
import type {NextConfig} from 'next'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  transpilePackages: ['jotai-devtools'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
    }
    return config
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/staking',
      //   permanent: false,
      // },
      {
        source: '/khala/:path*',
        destination: '/khala-assets',
        permanent: true,
      },
      {
        source: '/phala/:path*',
        destination: '/phala-assets',
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
