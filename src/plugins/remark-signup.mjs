/**
 * Remark plugin: :::signup fenced syntax → optional "get updates" form.
 *
 * Usage in the CMS markdown editor, below a download button:
 *
 *   :::signup
 *   :::
 *
 * The form posts to the MailerLite embedded form set by `action`. With no
 * action configured the block renders nothing, so a page never shows a form
 * that can't submit. Submission and loading reCAPTCHA are handled in
 * ProjectLayout.astro.
 */

// MailerLite's public reCAPTCHA key, from the form's embed code
const RECAPTCHA_SITE_KEY = '6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD';

export default function remarkSignup(options = {}) {
  const action = options.action || '';

  return (tree) => {
    const children = tree.children;
    let i = 0;

    while (i < children.length) {
      const text = nodeText(children[i]);

      if (!text || !text.includes(':::signup')) {
        i++;
        continue;
      }

      // The closer is either in the same paragraph or, because the CMS
      // inserts blank lines, in the next one
      let end = i;
      if (!text.split('\n').some((l) => l.trim() === ':::')) {
        if (nodeText(children[i + 1])?.trim() !== ':::') {
          i++;
          continue;
        }
        end = i + 1;
      }

      const replacement = action ? [{ type: 'html', value: formHtml(action) }] : [];
      children.splice(i, end - i + 1, ...replacement);
      i += replacement.length;
    }
  };
}

function formHtml(action) {
  return `<section class="md-signup" aria-label="Get plugin updates by email">
<p class="md-signup-title">Want to hear about updates?</p>
<p class="md-signup-intro">Sign up to hear about new plugins and updates to existing ones. It's optional: you don't need to sign up to download.</p>
<form action="${esc(action)}" method="post" target="_blank">
<label class="md-signup-email">Email<input type="email" name="fields[email]" autocomplete="email" required /></label>
<div class="g-recaptcha" data-sitekey="${RECAPTCHA_SITE_KEY}"></div>
<input type="hidden" name="ml-submit" value="1" />
<input type="hidden" name="anticsrf" value="true" />
<button type="submit" class="btn btn-outline">Subscribe</button>
<p class="md-signup-note">I'll email you a link to confirm first. Emails are sent through MailerLite, and each one has an unsubscribe link.</p>
<p class="md-signup-status" role="status" hidden></p>
</form>
</section>`;
}

/** Get all text from a paragraph node. */
function nodeText(node) {
  if (node?.type !== 'paragraph' || !node.children) return null;
  return node.children.map((c) => (c.type === 'text' ? c.value : '')).join('');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
