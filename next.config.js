/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:"disabled",
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
