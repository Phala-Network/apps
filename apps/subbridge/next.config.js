const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['jotai-devtools'],
  images: {disableStaticImages: true},
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
