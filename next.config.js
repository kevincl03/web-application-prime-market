/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js configuration options here, for example:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if there are type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
