import * as z from "zod"

export const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteTagline: z.string().optional().nullable(),
  siteDescription: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
})

export type SettingsFormData = z.infer<typeof settingsSchema>

// For updating settings (partial)
export const updateSettingsSchema = settingsSchema.partial()
