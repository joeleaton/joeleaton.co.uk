import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    categories: z.array(z.enum(['bcmi', 'running', 'music', 'education'])),
    tags: z.array(z.string()).optional().default([]),
    year: z.number(),
    location: z.string().optional(),
    featured: z.boolean().default(false),
    featuredImage: z.string().optional().default(''),
    videoUrl: z.string().optional().default(''),
    technologies: z.array(z.string()).optional().default([]),
    links: z.object({
      paper: z.string().optional().default(''),
      video: z.string().optional().default(''),
      github: z.string().optional().default(''),
    }).optional(),
    relatedProjects: z.array(z.string()).optional().default([]),
    publishedDate: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.enum(['bcmi', 'running', 'music', 'education', 'general']),
    tags: z.array(z.string()).optional().default([]),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    featuredImage: z.string().optional().default(''),
    author: z.string().default('Joel Eaton'),
    readTime: z.number().optional(),
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
