import { z } from "zod"

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().optional(),
  excerpt: z.string().max(500, "Excerpt too long").optional(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  publishDate: z.string().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
})

export type BlogPostFormData = z.infer<typeof createBlogPostSchema>
