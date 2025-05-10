import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['books.google.com', 'localhost:8000'],
  },
};

export default nextConfig;
