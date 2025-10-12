import * as z from "zod"

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required").max(50, "Name too long"),
  category: z.string().optional().nullable(),
  level: z.string().optional().nullable(),
  order: z.number().int().min(0).default(0),
})

export type SkillFormData = z.infer<typeof skillSchema>

// For creating skill (order will be auto-generated)
export const createSkillSchema = skillSchema.omit({
  order: true,
})

// For updating skill
export const updateSkillSchema = skillSchema.partial()

// For bulk reorder
export const reorderSkillsSchema = z.object({
  skills: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
    })
  ),
})
