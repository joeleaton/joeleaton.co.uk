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

/**
 * Convert a regular YouTube or Vimeo URL into its embeddable form.
 * Accepts any common format — page URLs, short URLs, or already-embed URLs.
 *
 * Examples:
 *   https://vimeo.com/123456789           → https://player.vimeo.com/video/123456789
 *   https://www.youtube.com/watch?v=abc   → https://www.youtube-nocookie.com/embed/abc
 *   https://youtu.be/abc                  → https://www.youtube-nocookie.com/embed/abc
 *   https://player.vimeo.com/video/123    → unchanged (already embed)
 *   https://www.youtube.com/embed/abc     → unchanged (already embed)
 */
export function toEmbedUrl(input: string): string {
  if (!input) return input;
  const trimmed = input.trim();

  // YouTube: already embed
  if (/youtube(-nocookie)?\.com\/embed\//.test(trimmed)) return trimmed;

  // Vimeo: already embed
  if (/player\.vimeo\.com\/video\//.test(trimmed)) return trimmed;

  // YouTube watch URL
  const ytWatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/
  );
  if (ytWatch) return `https://www.youtube-nocookie.com/embed/${ytWatch[1]}`;

  // YouTube short URL
  const ytShort = trimmed.match(
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/
  );
  if (ytShort) return `https://www.youtube-nocookie.com/embed/${ytShort[1]}`;

  // Vimeo page URL  (vimeo.com/123456789 or vimeo.com/channels/xxx/123456789)
  const vimeo = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/[^\/]+\/)?(\d+)/
  );
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Not recognised — return as-is
  return trimmed;
}
