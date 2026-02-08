/**
 * Prepend the Astro base path to a URL.
 * Works in both dev (base = '/') and production (base = '/joeleaton.co.uk/').
 * When the custom domain is added, just remove `base` from astro.config.mjs
 * and all links will work at root automatically.
 */
const base = import.meta.env.BASE_URL;

export function url(path: string): string {
  // Ensure no double slashes
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
