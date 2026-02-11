/**
 * Rehype plugin that transforms links to audio files in markdown
 * into styled HTML5 <audio> players.
 *
 * Detects links ending in .mp3, .wav, .ogg, .m4a, .flac, .aac, .webm
 * that appear as a bare link on their own line (i.e. a <p> containing
 * only a single <a> whose text matches its href).
 *
 * In the CMS editor, just paste an audio file path on its own line:
 *
 *   /images/uploads/my-recording.mp3
 *
 * Or use the image/file widget to insert a link to an uploaded file.
 *
 * Also handles markdown image syntax pointing to audio files:
 *   ![optional label](/images/uploads/my-recording.mp3)
 * since the CMS file widget sometimes uses image syntax.
 */
import { visit } from 'unist-util-visit';
import { writeFileSync, appendFileSync } from 'node:fs';

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

export default function rehypeAudioPlayer() {
  appendFileSync('/tmp/audio-debug.log', 'plugin factory called\n');
  return (tree) => {
    appendFileSync('/tmp/audio-debug.log', `tree children: ${tree.children?.length}\n`);
    // Debug: log all <p> elements to understand the tree structure
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p') {
        const childTypes = node.children?.map(c => `${c.type}${c.tagName ? ':'+c.tagName : ''}${c.value ? '="'+c.value.substring(0,60)+'"' : ''}`);
        if (childTypes?.some(t => t.includes('mp3') || t.includes('MP3') || t.includes('.mp3'))) {
          console.log('[audio-debug] Found <p> with audio ref:', JSON.stringify(childTypes));
        }
      }
    });

    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === undefined) return;

      // Case 1: <p> containing a single bare <a> link to an audio file
      if (
        node.tagName === 'p' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'a'
      ) {
        const link = node.children[0];
        const href = link.properties?.href || '';

        if (!AUDIO_EXT.test(href)) return;

        const textContent = link.children
          ?.filter((c) => c.type === 'text')
          .map((c) => c.value)
          .join('')
          .trim();

        // Only convert bare auto-linked URLs, not labelled links
        const isBare = textContent === href || textContent === href.replace(/\/$/, '');
        const label = isBare ? '' : textContent;

        parent.children[index] = createAudioNode(href, label);
        return;
      }

      // Case 2: <p> containing a single <img> whose src is an audio file
      // (CMS file widget sometimes uses ![label](file.mp3) syntax)
      if (
        node.tagName === 'p' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'img'
      ) {
        const img = node.children[0];
        const src = img.properties?.src || '';

        if (!AUDIO_EXT.test(src)) return;

        const alt = img.properties?.alt || '';
        parent.children[index] = createAudioNode(src, alt);
        return;
      }

      // Case 3: <p> containing plain text that is an audio file path
      // e.g. pasting /images/uploads/recording.mp3 on its own line
      if (node.tagName === 'p') {
        // Gather all text content from the paragraph
        const textParts = node.children
          ?.filter((c) => c.type === 'text')
          .map((c) => c.value)
          .join('')
          .trim();

        if (textParts && AUDIO_EXT.test(textParts) && /^[\/\w\-. %]+$/.test(textParts)) {
          parent.children[index] = createAudioNode(textParts, '');
          return;
        }
      }
    });
  };
}
