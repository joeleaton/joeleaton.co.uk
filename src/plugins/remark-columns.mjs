/**
 * Remark plugin that converts a simple fenced syntax into responsive
 * CSS-grid column layouts in markdown content.
 *
 * Usage in the CMS markdown editor:
 *
 *   :::columns
 *   First column content here.
 *
 *   ---
 *
 *   Second column content here.
 *
 *   ---
 *
 *   Third column content here.
 *   :::
 *
 * Produces a responsive grid that stacks on mobile.
 * Supports 2, 3, or 4 columns.
 */
import { visit } from 'unist-util-visit';

export default function remarkColumns() {
  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // Look for a paragraph whose text starts with ":::columns"
      if (
        node.type === 'paragraph' &&
        node.children?.length === 1 &&
        node.children[0].type === 'text' &&
        node.children[0].value.trim().startsWith(':::columns')
      ) {
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

        // Split by thematic breaks (---) into columns
        const columns = [];
        let currentColumn = [];

        for (const inner of innerNodes) {
          if (inner.type === 'thematicBreak') {
            columns.push(currentColumn);
            currentColumn = [];
          } else {
            currentColumn.push(inner);
          }
        }
        columns.push(currentColumn); // push last column

        // Build the column wrapper as raw HTML nodes
        const colCount = Math.min(columns.length, 4);
        const columnNodes = [];

        // Opening wrapper div
        columnNodes.push({
          type: 'html',
          value: `<div class="md-columns md-columns-${colCount}">`,
        });

        for (const col of columns) {
          columnNodes.push({ type: 'html', value: '<div class="md-column">' });
          columnNodes.push(...col);
          columnNodes.push({ type: 'html', value: '</div>' });
        }

        columnNodes.push({ type: 'html', value: '</div>' });

        // Replace the range [i .. closeIndex] with our column nodes
        children.splice(i, closeIndex - i + 1, ...columnNodes);
        i += columnNodes.length;
      } else {
        i++;
      }
    }
  };
}
