import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admissions/apply',
        destination: '/admissions',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
