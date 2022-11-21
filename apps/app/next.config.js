/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(
  ['@phala/store', '@phala/utils', '@phala/lib', '@phala/react-hooks'],
  {
    // make peerDependencies work
    resolveSymlinks: false,
  }
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/delegate',
        destination: '/delegate/vaults',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(withTM(nextConfig))
