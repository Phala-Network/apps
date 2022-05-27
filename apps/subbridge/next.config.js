/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withTM = require('next-transpile-modules')(
  ['@phala/store', '@phala/utils'],
  {
    // make peerDependencies work
    resolveSymlinks: false,
  }
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CONTEXT: process.env.CONTEXT,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: {not: /react/},
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    })
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

module.exports = withBundleAnalyzer(withTM(nextConfig))
