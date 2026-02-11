// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMediaEmbeds from './src/plugins/rehype-video-embeds.mjs';
import rehypeBasePath from './src/plugins/rehype-base-path.mjs';
import remarkColumns from './src/plugins/remark-columns.mjs';
import remarkAccordion from './src/plugins/remark-accordion.mjs';

const basePath = '/joeleaton.co.uk';

export default defineConfig({
  site: 'https://joeleaton.github.io',
  base: basePath,
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkColumns, remarkAccordion],
    rehypePlugins: [rehypeMediaEmbeds, [rehypeBasePath, { base: basePath }]],
  },
});
