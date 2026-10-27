// GitHub Pages: https://<user>.github.io/<repo>/ 에 배포하려면 NEXT_PUBLIC_BASE_PATH=/<repo> 로 빌드
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
