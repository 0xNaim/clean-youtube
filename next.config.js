const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: { NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY },
  images: {
    domains: ['i.ytimg.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withPWA(nextConfig);
