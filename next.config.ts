import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  allowedDevOrigins: [
    'honest-octopus-driving.ngrok-free.app',
    '*.ngrok-free.app',
    '0.0.0.0:3000',
    'localhost:3000',
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
