/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  env: { NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY },
  images: {
    domains: ['i.ytimg.com'],
    formats: ['image/avif', 'image/webp'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
