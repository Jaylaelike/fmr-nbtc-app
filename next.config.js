/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwind-generator.b-cdn.net",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  crossOrigin: "anonymous",
};

export default config;
