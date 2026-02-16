import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const withVanillaExtract = createVanillaExtractPlugin()

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, {
      theme: 'github-dark', // 다크 모드 색상 조합을 모든 테마에서 사용
      keepBackground: false,
      defaultLang: 'plaintext',
    }]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@cooolpower/headless-ui", "@repo/ui"],
  experimental: {
    webpackBuildWorker: false, // Force webpack mode for vanilla-extract compatibility
  },
};

export default withVanillaExtract(withMDX(nextConfig));
