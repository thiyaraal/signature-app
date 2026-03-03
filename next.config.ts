import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/kalcaf/:path*",
        destination: "http://172.16.25.21:8080/kalcaf/:path*",
      },
    ];
  },
};

export default nextConfig;
