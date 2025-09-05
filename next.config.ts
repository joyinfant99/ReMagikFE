import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tonemagik-backend.fly.dev'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
