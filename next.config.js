/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure this is enabled if you’re using the app directory
  },
};

module.exports = nextConfig;
