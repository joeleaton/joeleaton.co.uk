/**
 * Rehype plugin: ^superscript^ and ~subscript~ syntax.
 *
 * In the CMS markdown editor:
 *   H~2~O      → H<sub>2</sub>O
 *   E = mc^2^  → E = mc<sup>2</sup>
 *
 * Works on text nodes in the HTML AST after markdown is converted.
 */
import { visit } from 'unist-util-visit';

const SUP_RE = /\^([^^]+)\^/g;
const SUB_RE = /~([^~]+)~/g;

export default function rehypeSubSuper() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const val = node.value;
      if (!SUP_RE.test(val) && !SUB_RE.test(val)) return;

      // Reset lastIndex after test()
      SUP_RE.lastIndex = 0;
      SUB_RE.lastIndex = 0;

      const newChildren = parseSubSup(val);
      if (newChildren.length === 1 && newChildren[0].type === 'text') return;

      parent.children.splice(index, 1, ...newChildren);
    });
  };
}

function parseSubSup(text) {
  // Combined regex: match ^sup^ or ~sub~
  const combined = /(\^([^^]+)\^)|(~([^~]+)~)/g;
  const nodes = [];
  let last = 0;
  let match;

  while ((match = combined.exec(text)) !== null) {
    // Text before the match
    if (match.index > last) {
      nodes.push({ type: 'text', value: text.slice(last, match.index) });
    }

    if (match[2]) {
      // Superscript: ^text^
      nodes.push({
        type: 'element',
        tagName: 'sup',
        properties: {},
        children: [{ type: 'text', value: match[2] }],
      });
    } else if (match[4]) {
      // Subscript: ~text~
      nodes.push({
        type: 'element',
        tagName: 'sub',
        properties: {},
        children: [{ type: 'text', value: match[4] }],
      });
    }

    last = match.index + match[0].length;
  }

  // Remaining text
  if (last < text.length) {
    nodes.push({ type: 'text', value: text.slice(last) });
  }

  return nodes.length ? nodes : [{ type: 'text', value: text }];
}
