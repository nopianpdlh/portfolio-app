import * as z from "zod"

export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  company: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
})

export type ExperienceFormData = z.infer<typeof experienceSchema>

// For creating experience (order will be auto-generated)
export const createExperienceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  company: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
})

// For updating experience
export const updateExperienceSchema = experienceSchema.partial()
