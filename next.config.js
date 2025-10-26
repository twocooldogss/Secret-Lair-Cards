/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  reactStrictMode: false,
  compiler: {
    removeConsole: false,
  },
  images: {
    domains: ["cards.scryfall.io", "api.scryfall.com", "www.secretlaircards.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cards.scryfall.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.scryfall.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // 重定向非www到www，确保canonical URL一致性
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'secretlaircards.com',
          },
        ],
        destination: 'https://www.secretlaircards.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
