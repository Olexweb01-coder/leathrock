/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: builds to /out and deploys anywhere (Vercel, Netlify, S3...).
  // Remove this line if you later add API routes or server actions.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
