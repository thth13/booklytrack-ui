import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
      },
      {
        protocol: 'https',
        hostname: 'dh5p0367pyzhh.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
