/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EXTERNAL_API_URL: process.env.EXTERNAL_API_URL,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
  },
};

module.exports = nextConfig;
