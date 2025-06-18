import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  allowedDevOrigins: ['honest-octopus-driving.ngrok-free.app', '*.ngrok-free.app'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
