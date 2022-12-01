/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(
  ['@phala/store', '@phala/util', '@phala/lib'],
  {
    // make peerDependencies work
    resolveSymlinks: false,
  }
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {ignoreDuringBuilds: true},
  reactStrictMode: true,
  swcMinify: true,
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
        source: '/delegate',
        destination: '/delegate/vault',
        permanent: true,
      },
      {
        source: '/farm',
        destination: '/farm/stake-pool',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withTM(nextConfig))
