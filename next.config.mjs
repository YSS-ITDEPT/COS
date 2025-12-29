/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cos',
  assetPrefix: '/cos',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable Vercel analytics for static export
  productionBrowserSourceMaps: false,
}

export default nextConfig