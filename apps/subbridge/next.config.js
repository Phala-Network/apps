/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(
  ['@phala/store', '@phala/utils', '@phala/react-libs'],
  {
    // make peerDependencies work
    resolveSymlinks: false,
  }
)
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  env: {
    CONTEXT: process.env.CONTEXT,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    })

    return config
  },
}

module.exports = withBundleAnalyzer(withTM(withImages(nextConfig)))
