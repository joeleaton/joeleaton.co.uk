# Columns — how to use
In any CMS markdown body (blog posts, projects, pages), write:

:::columns

**Research Focus**

Brain-computer music interfacing and neurotechnology for creative expression.

---

**Teaching**

Workshops on Pure Data, synthesis, and creative coding.

---

**Coaching**

Ultra-distance running programs for athletes of all levels.

:::

This creates a 3-column responsive grid. The --- dividers split the content into columns. It supports:

2 columns — one --- divider

3 columns — two --- dividers

4 columns — three --- dividers

On mobile, columns stack vertically. On tablet, 3-4 columns collapse to a 2-column grid.

You can put anything inside columns — text, lists, bold, links, images. Just keep each column's content between the --- dividers.

# Video embeds — how to use
In blog posts / project body content:
Just paste a YouTube or Vimeo URL on its own line in the markdown editor:

Here's my latest BCMI performance:

https://www.youtube.com/watch?v=dQw4w9WgXcQ

The piece explores real-time brainwave sonification.

It automatically becomes a responsive 16:9 embedded player. Works with:

youtube.com/watch?v=...
youtu.be/...
vimeo.com/...
For project hero videos (the big video at the top of a project page): use the Video URL field in the project editor. Paste the embed URL there (e.g. https://www.youtube.com/embed/VIDEO_ID).

# Images — how to use
Upload images through the CMS Featured Image field or drag them into the markdown body. They're automatically:

Lazy-loaded (below the fold)
Eagerly loaded with high priority (hero/featured images)
Wrapped in aspect-ratio containers to prevent layout shift
For best results, upload images at reasonable sizes (1200-1600px wide is plenty). The site doesn't do server-side compression, but the loading optimisations keep things fast.

