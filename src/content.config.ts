import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";


const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  published: z.date(),
  snippet: z.string()
});


const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string()
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: postSchema
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: "./src/data/projects" }),
  schema: projectSchema
});



export type PostSchema = z.infer<typeof postSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;


export const collections = { blog, projects };
