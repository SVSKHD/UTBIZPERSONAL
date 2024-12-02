import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "www.gstatic.com"], // Add allowed domains
  },
};

export default nextConfig;
