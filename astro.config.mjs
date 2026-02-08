// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeVideoEmbeds from './src/plugins/rehype-video-embeds.mjs';

export default defineConfig({
  site: 'https://joeleaton.github.io',
  base: '/joeleaton.co.uk',
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeVideoEmbeds],
  },
});
