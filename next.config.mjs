import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/next-portfolio',
  assetPrefix: '/next-portfolio',
  images: {
    loader: 'default',
    path: '/next-portfolio/',
  }
}


export default withNextIntl(withMDX(nextConfig));