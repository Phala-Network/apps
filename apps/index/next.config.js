/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['jotai-devtools'],
  images: {disableStaticImages: true},
  env: {CONTEXT: process.env.CONTEXT},
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['pages', 'components', 'lib', 'hooks', 'store', 'types'],
  },
  experimental: {
    swcPlugins: [
      ['@swc-jotai/debug-label', {}],
      ['@swc-jotai/react-refresh', {}],
    ],
  },
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

module.exports = withBundleAnalyzer(withImages(nextConfig))
