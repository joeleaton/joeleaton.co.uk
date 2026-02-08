/**
 * Rehype plugin that prepends the Astro base path to local asset URLs
 * in rendered markdown content (images, links).
 *
 * This is needed because the CMS writes absolute paths like
 * /images/uploads/photo.jpg but the site is deployed under a sub-path
 * (e.g. /joeleaton.co.uk/).
 *
 * Only rewrites paths that start with "/" and are NOT already prefixed
 * with the base path. External URLs (http/https) are left untouched.
 *
 * Usage in astro.config.mjs:
 *   rehypePlugins: [[rehypeBasePath, { base: '/joeleaton.co.uk' }]]
 */
import { visit } from 'unist-util-visit';

export default function rehypeBasePath(options = {}) {
  const base = (options.base || '').replace(/\/+$/, '');

  return (tree) => {
    if (!base) return; // no prefix needed

    visit(tree, 'element', (node) => {
      // Rewrite <img src="...">
      if (node.tagName === 'img' && node.properties?.src) {
        node.properties.src = prefixPath(node.properties.src, base);
      }

      // Rewrite <a href="..."> for local links
      if (node.tagName === 'a' && node.properties?.href) {
        node.properties.href = prefixPath(node.properties.href, base);
      }

      // Rewrite <source src="..."> / <video src="..."> / <audio src="...">
      if (
        (node.tagName === 'source' || node.tagName === 'video' || node.tagName === 'audio') &&
        node.properties?.src
      ) {
        node.properties.src = prefixPath(node.properties.src, base);
      }
    });
  };
}

function prefixPath(value, base) {
  if (typeof value !== 'string') return value;
  // Only rewrite absolute paths that aren't already prefixed or external
  if (
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.startsWith(base + '/')
  ) {
    return base + value;
  }
  return value;
}
