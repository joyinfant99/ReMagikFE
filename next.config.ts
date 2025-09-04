import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/ReMagik',
  assetPrefix: '/ReMagik',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tonemagik-backend.fly.dev'
  }
};

export default nextConfig;
