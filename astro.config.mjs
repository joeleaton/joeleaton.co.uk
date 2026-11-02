// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMediaEmbeds from './src/plugins/rehype-video-embeds.mjs';
import rehypeBasePath from './src/plugins/rehype-base-path.mjs';
import remarkColumns from './src/plugins/remark-columns.mjs';
import remarkAccordion from './src/plugins/remark-accordion.mjs';
import remarkButtons from './src/plugins/remark-buttons.mjs';
import remarkSignup from './src/plugins/remark-signup.mjs';
import rehypeImageFigure from './src/plugins/rehype-image-figure.mjs';
import rehypeSubSuper from './src/plugins/rehype-sub-super.mjs';

const basePath = '';
// MailerLite embedded form URL (public). The env var points local tests elsewhere.
const signupAction = process.env.SIGNUP_FORM_ACTION || 'https://assets.mailerlite.com/jsonp/2762654/forms/203039794243045229/subscribe';

export default defineConfig({
  site: 'https://joeleaton.co.uk',
  integrations: [sitemap()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkColumns, remarkAccordion, [remarkButtons, { base: basePath }], [remarkSignup, { action: signupAction }]],
    rehypePlugins: [rehypeMediaEmbeds, rehypeImageFigure, rehypeSubSuper, [rehypeBasePath, { base: basePath }]],
  },
});
