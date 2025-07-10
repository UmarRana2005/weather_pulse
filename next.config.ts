import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["openweathermap.org"], // ✅ Allow external image domain
  },
};

export default nextConfig;
