import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Force lucide-react to be compiled by Next.js bundler so it shares
  // the same React instance and never causes a duplicate-React / null useContext crash
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
