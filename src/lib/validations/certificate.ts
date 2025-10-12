import * as z from "zod"

export const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required").max(200, "Name too long"),
  issuer: z.string().min(1, "Issuer is required").max(200, "Issuer name too long"),
  issueDate: z.string().optional().nullable(),
  expiryDate: z.string().optional().nullable(),
  credentialId: z.string().optional().nullable(),
  credentialUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPublished: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export type CertificateFormData = z.infer<typeof certificateSchema>

// For creating certificate (order will be auto-generated)
export const createCertificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required").max(200, "Name too long"),
  issuer: z.string().min(1, "Issuer is required").max(200, "Issuer name too long"),
  issueDate: z.string().optional().nullable(),
  expiryDate: z.string().optional().nullable(),
  credentialId: z.string().optional().nullable(),
  credentialUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isPublished: z.boolean(),
})

// For updating certificate
export const updateCertificateSchema = certificateSchema.partial()
