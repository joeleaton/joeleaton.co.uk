// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMediaEmbeds from './src/plugins/rehype-video-embeds.mjs';
import rehypeBasePath from './src/plugins/rehype-base-path.mjs';
import remarkColumns from './src/plugins/remark-columns.mjs';
import remarkAccordion from './src/plugins/remark-accordion.mjs';
import remarkButtons from './src/plugins/remark-buttons.mjs';
import rehypeImageFigure from './src/plugins/rehype-image-figure.mjs';

const basePath = '/joeleaton.co.uk';

export default defineConfig({
  site: 'https://joeleaton.github.io',
  base: basePath,
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkColumns, remarkAccordion, [remarkButtons, { base: basePath }]],
    rehypePlugins: [rehypeMediaEmbeds, rehypeImageFigure, [rehypeBasePath, { base: basePath }]],
  },
});
