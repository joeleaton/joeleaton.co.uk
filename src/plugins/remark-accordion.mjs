/**
 * Remark plugin that converts a simple fenced syntax into native
 * <details>/<summary> accordion elements in markdown content.
 *
 * Usage in the CMS markdown editor:
 *
 *   :::accordion Title of the section
 *   Content that is hidden until the user clicks the title.
 *
 *   Can include **rich markdown**, lists, images, videos, etc.
 *   :::
 *
 * Multiple accordions in a row form a visual group automatically.
 *
 * To have an accordion open by default, add "open":
 *
 *   :::accordion open Title of the section
 *   Content shown by default (user can still collapse it).
 *   :::
 */
import { visit } from 'unist-util-visit';

export default function remarkAccordion() {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // Look for a paragraph whose text starts with ":::accordion"
      if (
        node.type === 'paragraph' &&
        node.children?.length === 1 &&
        node.children[0].type === 'text' &&
        node.children[0].value.trim().startsWith(':::accordion')
      ) {
        const openLine = node.children[0].value.trim();

        // Parse: :::accordion [open] Title text
        let title = openLine.replace(/^:::accordion\s*/, '');
        let isOpen = false;

        if (title.startsWith('open ')) {
          isOpen = true;
          title = title.replace(/^open\s+/, '');
        }

        title = title || 'Details';

        // Find the closing ":::"
        let closeIndex = -1;
        for (let j = i + 1; j < children.length; j++) {
          const candidate = children[j];
          if (
            candidate.type === 'paragraph' &&
            candidate.children?.length === 1 &&
            candidate.children[0].type === 'text' &&
            candidate.children[0].value.trim() === ':::'
          ) {
            closeIndex = j;
            break;
          }
        }

        if (closeIndex === -1) {
          i++;
          continue;
        }

        // Collect everything between open and close
        const innerNodes = children.slice(i + 1, closeIndex);

        // Build the accordion as raw HTML wrappers around the remark nodes
        const accordionNodes = [];

        accordionNodes.push({
          type: 'html',
          value: `<details class="md-accordion"${isOpen ? ' open' : ''}>`,
        });
        accordionNodes.push({
          type: 'html',
          value: `<summary>${escapeHtml(title)}</summary>`,
        });
        accordionNodes.push({
          type: 'html',
          value: '<div class="md-accordion-body">',
        });

        accordionNodes.push(...innerNodes);

        accordionNodes.push({ type: 'html', value: '</div>' });
        accordionNodes.push({ type: 'html', value: '</details>' });

        // Replace the range [i .. closeIndex] with our accordion nodes
        children.splice(i, closeIndex - i + 1, ...accordionNodes);
        i += accordionNodes.length;
      } else {
        i++;
      }
    }
  };
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
