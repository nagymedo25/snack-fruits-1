import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Exclude server-only packages from bundling (fixes Turbopack compilation freeze)
  serverExternalPackages: ["nodemailer"],
};

export default nextConfig;

