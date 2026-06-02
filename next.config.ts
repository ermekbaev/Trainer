import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in the
  // user's home dir, which otherwise gets picked as the inferred root).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
