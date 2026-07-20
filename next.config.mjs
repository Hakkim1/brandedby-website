/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

// Temporary basePath for GitHub Pages subpath deployment (e.g., /brandedby-website).
// NOTE: When you connect your custom domain (e.g., brandedby.studio) later,
// simply change this line to: const basePath = '';
const basePath = isProd && isGithubActions ? '/brandedby-website' : '';

const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
