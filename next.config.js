/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: "",
        pathname: "w7.pngwing.com**",
      },
    ],
  },
}

module.exports = nextConfig
