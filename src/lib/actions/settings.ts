"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { updateSettingsSchema } from "@/lib/validations/settings"

// Get settings
export async function getSettings() {
  await requireAdmin()

  // Get the first settings record (there should only be one)
  let settings = await prisma.settings.findFirst()

  // If no settings exist, create default settings
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        siteName: "My Portfolio",
      },
    })
  }

  return settings
}

// Update settings
export async function updateSettings(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = updateSettingsSchema.parse(data)

  // Get existing settings
  let settings = await prisma.settings.findFirst()

  if (settings) {
    // Update existing settings
    settings = await prisma.settings.update({
      where: { id: settings.id },
      data: validatedData,
    })
  } else {
    // Create new settings if none exist
    settings = await prisma.settings.create({
      data: {
        ...validatedData,
        siteName: validatedData.siteName || "My Portfolio",
      },
    })
  }

  revalidatePath("/admin/settings")
  return { success: true, settings }
}

// Upload file to Supabase Storage (placeholder for now)
export async function uploadFile(file: File, bucket: string = "uploads") {
  // This will be implemented when we add Supabase Storage
  // For now, return a placeholder
  throw new Error("File upload not implemented yet")
}
