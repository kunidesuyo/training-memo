import type { NextConfig } from "next";

const vsCodeDevTunnellsHost = process.env.VS_CODE_DEV_TUNNELS_HOST || "";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", vsCodeDevTunnellsHost],
    },
  },
};

export default nextConfig;
