import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Type-safe schema for blog posts
const blog = defineCollection({
  loader: glob({ 
    pattern: "**/*.mdx", 
    base: "./src/content/blog"
  }),
  schema: z.object({
    title: z.string().min(1).max(120), // Validation: min/max length
    description: z.string().min(1).max(300), // Validation: min/max length
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().min(1).optional(), // Allow relative or absolute paths
    tags: z.array(z.string().min(1)).default([]), // Validation: non-empty tags
    draft: z.boolean().default(false), // Type-safe draft flag
    author: z.string().default('Admin'), // Type-safe author
    readingTime: z.number().positive().optional(), // Type-safe reading time
  }),
});

export const collections = { blog };
