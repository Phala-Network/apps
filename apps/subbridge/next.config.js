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
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {ignoreDuringBuilds: true},
  images: {disableStaticImages: true},
  env: {
    CONTEXT: process.env.CONTEXT,
  },
  reactStrictMode: true,
  webpack(config) {
    for (const rule of config.module.rules) {
      if (rule.test instanceof RegExp && rule.test.test('.svg')) {
        rule.resourceQuery = {not: /react/}
      }
    }

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {dimensions: false},
        },
      ],
    })

    return config
  },
}

module.exports = withBundleAnalyzer(withTM(withImages(nextConfig)))
