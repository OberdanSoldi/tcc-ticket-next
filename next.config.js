/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  experimental: {
    // serverActions: true,
  },
  env: {
    EXTERNAL_API_URL: process.env.EXTERNAL_API_URL,
  },
};

module.exports = nextConfig;
