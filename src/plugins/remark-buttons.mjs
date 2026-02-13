/**
 * Remark plugin: :::buttons fenced syntax → styled button groups.
 *
 * Usage in the CMS markdown editor:
 *
 *   :::buttons
 *   Label | /url
 *   Another Label | https://example.com | outline
 *   :::
 *
 * Format per line:  Label | URL  or  Label | URL | outline
 *
 * The CMS inserts blank lines between each line, so the remark AST
 * will have separate paragraph nodes for the opener, each button
 * definition, and the closer. The plugin collects everything between
 * :::buttons and ::: and parses each paragraph as a button.
 */

export default function remarkButtons(options = {}) {
  const base = (options.base || '').replace(/\/+$/, '');

  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const text = nodeText(children[i]);

      // Match the opening fence — either just ":::buttons" or the
      // whole block crammed into one paragraph (no blank lines)
      if (!text || !text.includes(':::buttons')) {
        i++;
        continue;
      }

      // Collect all lines from this node onward until we find ":::"
      const lines = [];
      let end = i; // will point to the closing node (inclusive)
      let found = false;

      // Gather lines from the opener node itself
      for (const l of text.split('\n')) {
        const t = l.trim();
        if (t === ':::buttons' || t === '') continue;
        if (t === ':::') { found = true; break; }
        lines.push(t);
      }

      // If the closer wasn't in the same node, scan forward
      if (!found) {
        for (let j = i + 1; j < children.length; j++) {
          const jt = nodeText(children[j]);
          if (!jt) continue;
          end = j;
          for (const l of jt.split('\n')) {
            const t = l.trim();
            if (t === '') continue;
            if (t === ':::') { found = true; break; }
            lines.push(t);
          }
          if (found) break;
        }
      }

      if (!found) { i++; continue; }

      // Parse button definitions
      const buttons = [];
      for (const line of lines) {
        const parts = line.split('|').map((s) => s.trim());
        if (parts.length < 2 || !parts[0] || !parts[1]) continue;
        buttons.push({
          label: parts[0],
          url: parts[1],
          variant: parts[2]?.toLowerCase() === 'outline' ? 'outline' : 'primary',
        });
      }

      if (buttons.length === 0) { i++; continue; }

      const html = buttons
        .map(({ label, url, variant }) => {
          const cls = variant === 'outline' ? 'btn btn-outline' : 'btn btn-primary';
          const href = esc(prefixPath(url, base));
          return `<a href="${href}" class="${cls}">${esc(label)}</a>`;
        })
        .join('\n');

      children.splice(i, end - i + 1, {
        type: 'html',
        value: `<div class="md-buttons">\n${html}\n</div>`,
      });
      i++;
    }
  };
}

/** Get all text from a paragraph node, resolving auto-linked URLs. */
function nodeText(node) {
  if (node?.type !== 'paragraph' || !node.children) return null;
  return node.children
    .map((c) => (c.type === 'text' ? c.value : c.type === 'link' ? c.url : ''))
    .join('');
}

function prefixPath(v, base) {
  if (!base || typeof v !== 'string') return v;
  return v.startsWith('/') && !v.startsWith('//') && !v.startsWith(base + '/') ? base + v : v;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
