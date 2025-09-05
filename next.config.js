/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tonemagik-backend.fly.dev'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
