// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeVideoEmbeds from './src/plugins/rehype-video-embeds.mjs';
import remarkColumns from './src/plugins/remark-columns.mjs';

export default defineConfig({
  site: 'https://joeleaton.github.io',
  base: '/joeleaton.co.uk',
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkColumns],
    rehypePlugins: [rehypeVideoEmbeds],
  },
});
