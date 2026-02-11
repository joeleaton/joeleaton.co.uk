import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Helper: Sveltia CMS outputs `null` for empty optional fields.
// .nullable() lets Zod accept null alongside undefined.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    draft: z.boolean().nullable().optional().default(false),
    description: z.string(),
    categories: z.array(z.enum(['bcmi', 'running', 'music', 'education'])),
    tags: z.array(z.string()).nullable().optional().default([]),
    year: z.number(),
    location: z.string().nullable().optional(),
    featured: z.boolean().default(false),
    featuredImage: z.string().nullable().optional().default(''),
    videoUrl: z.string().nullable().optional().default(''),
    technologies: z.array(z.string()).nullable().optional().default([]),
    links: z.object({
      paper: z.string().nullable().optional().default(''),
      video: z.string().nullable().optional().default(''),
      github: z.string().nullable().optional().default(''),
    }).nullable().optional(),
    relatedProjects: z.array(z.string()).nullable().optional().default([]),
    publishedDate: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    draft: z.boolean().nullable().optional().default(false),
    description: z.string(),
    category: z.enum(['bcmi', 'running', 'music', 'education', 'general']),
    tags: z.array(z.string()).nullable().optional().default([]),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().nullable().optional(),
    featured: z.boolean().default(false),
    featuredImage: z.string().nullable().optional().default(''),
    author: z.string().default('Joel Eaton'),
    readTime: z.number().nullable().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional().default(''),
    menuOrder: z.number().optional().default(99),
    showInMenu: z.boolean().optional().default(true),
  }),
});

export const collections = {
  projects,
  blog,
  pages,
};
