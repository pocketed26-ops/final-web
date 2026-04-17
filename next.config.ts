import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['192.168.2.120', '10.120.96.181'],
};

export default nextConfig;
