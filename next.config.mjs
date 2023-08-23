/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }],
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

export default nextConfig;

