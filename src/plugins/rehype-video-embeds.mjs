/**
 * Rehype plugin that transforms bare YouTube/Vimeo URLs in markdown
 * into responsive iframe embeds.
 *
 * Detects:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://vimeo.com/VIDEO_ID
 *  - https://player.vimeo.com/video/VIDEO_ID
 *
 * Only converts <a> links whose text content matches the href exactly
 * (i.e. bare auto-linked URLs in markdown, not [labelled](links)).
 */
import { visit } from 'unist-util-visit';

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

function createEmbedNode(src, title) {
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

export default function rehypeVideoEmbeds() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // Case 1: <p> containing only a single <a> whose text matches its href
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

        // Only transform if the link text IS the URL (bare URL, not labelled)
        if (textContent === href || textContent === href.replace(/\/$/, '')) {
          const ytId = getYouTubeId(href);
          if (ytId) {
            parent.children[index] = createEmbedNode(
              `https://www.youtube-nocookie.com/embed/${ytId}`,
              textContent
            );
            return;
          }

          const vimeoId = getVimeoId(href);
          if (vimeoId) {
            parent.children[index] = createEmbedNode(
              `https://player.vimeo.com/video/${vimeoId}`,
              textContent
            );
            return;
          }
        }
      }
    });
  };
}
