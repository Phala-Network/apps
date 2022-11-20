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

module.exports = nextConfig
