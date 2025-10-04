import * as z from "zod"

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required").max(200, "Name too long"),
  degree: z.string().min(1, "Degree is required").max(200, "Degree name too long"),
  field: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  grade: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export type EducationFormData = z.infer<typeof educationSchema>

// For creating education (order will be auto-generated)
export const createEducationSchema = z.object({
  institution: z.string().min(1, "Institution is required").max(200, "Name too long"),
  degree: z.string().min(1, "Degree is required").max(200, "Degree name too long"),
  field: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean(),
  grade: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  isPublished: z.boolean(),
})

// For updating education
export const updateEducationSchema = educationSchema.partial()
