/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disabling compression helps prevent extension interference
  compress: false,
  
  experimental: {
    serverActions: true,
    // Improved logging configuration
    logging: {
      level: 'error',
      fullUrl: true,
    },
    // Modern package handling
    esmExternals: true,
    // Remove problematic experimental flag
    // removeHydrationWarningForFdprocessedid: true // ← This isn't a valid Next.js option
  },

  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'q-xx.bstatic.com',
        // Add pathname restrictions if needed
        // pathname: '/xdata/**',
      },
    ],
  },

  // Optional: Handle known hydration warning sources
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
  },

  // For modern package handling (alternative to esmExternals)
  transpilePackages: [
    // List problematic packages here if needed
  ],
};

module.exports = nextConfig;