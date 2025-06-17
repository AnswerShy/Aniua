import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  allowedDevOrigins: ['honest-octopus-driving.ngrok-free.app', '*.ngrok-free.app'],
};

export default nextConfig;
