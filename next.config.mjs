/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

export default nextConfig;

