import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
      // ✅ Set basePath for GitHub Pages
      basePath: "/next-portfolio",

      // ✅ Ensure asset paths are prefixed correctly
      assetPrefix: "/next-portfolio",
  trailingSlash: true,
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // ✅ Adding Redirects
  async redirects() {
    return [
      {
        source: '/work/:slug',
        destination: '/pt/work/:slug',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/pt/blog/:slug',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/pt/about',
        permanent: true,
      },
    ];
  },
};

// ✅ Apply Next.js plugins AFTER adding redirects
export default withNextIntl(withMDX(nextConfig));
