import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [{ source: "/", destination: "/board", permanent: false }],
};

export default nextConfig;
