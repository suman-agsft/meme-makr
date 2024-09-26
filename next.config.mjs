/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.add.app" },
      { hostname: "dev-cdn.add.app" },
      { hostname: "cdn.leonardo.ai" },
      { hostname: "d2e4n1tcihf17q.cloudfront.net" },
    ],
    formats: ["image/avif", "image/webp"],
    // Conditionally include loader and loaderFile
    // ...(process.env.NEXT_PUBLIC_CURRENT_ENV !== "local" && {
    // loader: "custom",
    // loaderFile: "./imageLoader.js",
    // }),
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
