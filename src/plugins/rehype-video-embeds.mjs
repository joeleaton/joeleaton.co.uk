/**
 * Rehype plugin that transforms bare media URLs in markdown:
 *
 * VIDEO — YouTube/Vimeo URLs become responsive iframe embeds.
 * AUDIO — Links to .mp3/.wav/.ogg/.m4a/.flac/.aac/.webm files
 *         become styled HTML5 <audio> players.
 *
 * Detects:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://vimeo.com/VIDEO_ID
 *  - https://player.vimeo.com/video/VIDEO_ID
 *  - /images/uploads/recording.mp3  (or any audio extension)
 *
 * Only converts bare auto-linked URLs (text matches href) or
 * plain text paths on their own line.
 */
import { visit } from 'unist-util-visit';

// ---- Video helpers ----

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;

const VIMEO_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;

function getYouTubeId(url) {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

function getVimeoId(url) {
  const match = url.match(VIMEO_REGEX);
  return match ? match[1] : null;
}

function createVideoNode(src, title) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['video-embed'] },
    children: [
      {
        type: 'element',
        tagName: 'iframe',
        properties: {
          src,
          title: title || 'Embedded video',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: true,
          loading: 'lazy',
          frameBorder: '0',
        },
        children: [],
      },
    ],
  };
}

// ---- Audio helpers ----

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|flac|aac|webm)(\?.*)?$/i;

function createAudioNode(src, label) {
  const displayLabel = label && label !== src ? label : decodeURIComponent(
    src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  );

  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['audio-player'] },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['audio-player-label'] },
        children: [{ type: 'text', value: displayLabel }],
      },
      {
        type: 'element',
        tagName: 'audio',
        properties: {
          controls: true,
          preload: 'metadata',
          src,
        },
        children: [
          { type: 'text', value: 'Your browser does not support the audio element.' },
        ],
      },
    ],
  };
}

// ---- Plugin ----

export default function rehypeMediaEmbeds() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === undefined) return;

      // --- <p> with a single <a> (bare auto-linked URL) ---
      if (
        node.tagName === 'p' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'a'
      ) {
        const link = node.children[0];
        const href = link.properties?.href || '';
        const textContent = link.children
          ?.filter((c) => c.type === 'text')
          .map((c) => c.value)
          .join('')
          .trim();

        const isBare = textContent === href || textContent === href.replace(/\/$/, '');

        // Audio file link
        if (AUDIO_EXT.test(href)) {
          const label = isBare ? '' : textContent;
          parent.children[index] = createAudioNode(href, label);
          return;
        }

        // Video embed (only bare URLs)
        if (isBare) {
          const ytId = getYouTubeId(href);
          if (ytId) {
            parent.children[index] = createVideoNode(
              `https://www.youtube-nocookie.com/embed/${ytId}`,
              textContent
            );
            return;
          }

          const vimeoId = getVimeoId(href);
          if (vimeoId) {
            parent.children[index] = createVideoNode(
              `https://player.vimeo.com/video/${vimeoId}`,
              textContent
            );
            return;
          }
        }
      }

      // --- <p> with a single <img> pointing to an audio file ---
      // (CMS file widget sometimes uses ![label](file.mp3) syntax)
      if (
        node.tagName === 'p' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'img'
      ) {
        const img = node.children[0];
        const src = img.properties?.src || '';

        if (AUDIO_EXT.test(src)) {
          const alt = img.properties?.alt || '';
          parent.children[index] = createAudioNode(src, alt);
          return;
        }
      }

      // --- <p> with plain text that is an audio file path ---
      // e.g. /images/uploads/recording.mp3 on its own line
      if (node.tagName === 'p') {
        const textParts = node.children
          ?.filter((c) => c.type === 'text')
          .map((c) => c.value)
          .join('')
          .trim();

        // Only match if entire paragraph is a file path to audio
        if (
          textParts &&
          node.children.length === 1 &&
          node.children[0].type === 'text' &&
          AUDIO_EXT.test(textParts)
        ) {
          parent.children[index] = createAudioNode(textParts, '');
          return;
        }
      }
    });
  };
}
