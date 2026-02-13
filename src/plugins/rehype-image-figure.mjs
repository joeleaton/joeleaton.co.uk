/**
 * Rehype plugin that wraps <img> elements with a title attribute
 * in a <figure> with a <figcaption> displaying the title text.
 *
 * Markdown: ![alt text](image.jpg "Caption text here")
 * Produces:  <figure class="md-figure">
 *              <img src="image.jpg" alt="alt text" title="Caption text here" />
 *              <figcaption>Caption text here</figcaption>
 *            </figure>
 *
 * Images without a title attribute are left unchanged.
 */
import { visit } from 'unist-util-visit';

export default function rehypeImageFigure() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === undefined) return;

      // Match <img> with a non-empty title property
      if (
        node.tagName === 'img' &&
        node.properties?.title &&
        typeof node.properties.title === 'string' &&
        node.properties.title.trim()
      ) {
        const title = node.properties.title.trim();

        const figure = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['md-figure'] },
          children: [
            node,
            {
              type: 'element',
              tagName: 'figcaption',
              properties: {},
              children: [{ type: 'text', value: title }],
            },
          ],
        };

        // If the img is inside a <p>, replace the <p> with the figure
        // (markdown wraps images in a paragraph by default)
        if (parent.tagName === 'p' && parent.children.length === 1) {
          const grandparent = findParent(tree, parent);
          if (grandparent) {
            const pIndex = grandparent.children.indexOf(parent);
            if (pIndex !== -1) {
              grandparent.children[pIndex] = figure;
              return;
            }
          }
        }

        // Otherwise replace the img directly
        parent.children[index] = figure;
      }
    });
  };
}

/**
 * Find the parent of a given node in the tree.
 */
function findParent(tree, target) {
  let result = null;
  visit(tree, 'element', (node) => {
    if (node.children?.includes(target)) {
      result = node;
    }
  });
  // Also check root
  if (tree.children?.includes(target)) {
    result = tree;
  }
  return result;
}
