
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [], // Add image domains if needed
    },
    // Enable any experimental features as needed
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;