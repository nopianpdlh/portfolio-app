import * as z from "zod"

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  programmingLanguages: z.array(z.string()).min(1, "At least one language is required"),
  category: z.string().optional(),
  images: z.array(z.string()).default([]),
  liveUrl: z.string().optional().or(z.literal("")),
  repoUrl: z.string().optional().or(z.literal("")),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  metrics: z.string().optional(),
  dateCompleted: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  slug: z.string().min(1, "Slug is required"),
  order: z.number().int().min(0).default(0),
})

export type ProjectFormData = z.infer<typeof projectSchema>

// For creating project (without generated fields)
export const createProjectSchema = projectSchema.omit({
  slug: true, // Will be auto-generated
  order: true, // Will be auto-generated
})

// For updating project
export const updateProjectSchema = projectSchema.partial()
