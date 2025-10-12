"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { createEducationSchema } from "@/lib/validations/education"

// Get all educations
export async function getEducations() {
  await requireAdmin()

  const educations = await prisma.education.findMany({
    orderBy: { order: "asc" },
  })

  return educations
}

// Get single education
export async function getEducationById(id: string) {
  await requireAdmin()

  const education = await prisma.education.findUnique({
    where: { id },
  })

  return education
}

// Create new education
export async function createEducation(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = createEducationSchema.parse(data)

  // Get max order for new education
  const maxOrder = await prisma.education.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const education = await prisma.education.create({
    data: {
      ...validatedData,
      startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      order: (maxOrder?.order || 0) + 1,
      userId: user.id,
    },
  })

  revalidatePath("/admin/educations")
  revalidatePath("/about")
  return { success: true, education }
}

// Update education
export async function updateEducation(id: string, data: any) {
  await requireAdmin()

  const education = await prisma.education.update({
    where: { id },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  })

  revalidatePath("/admin/educations")
  revalidatePath("/about")
  return { success: true, education }
}

// Delete education
export async function deleteEducation(id: string) {
  await requireAdmin()

  await prisma.education.delete({
    where: { id },
  })

  revalidatePath("/admin/educations")
  revalidatePath("/about")
  return { success: true }
}

// Reorder educations
export async function reorderEducations(educations: { id: string; order: number }[]) {
  await requireAdmin()

  // Update all educations in a transaction
  await prisma.$transaction(
    educations.map((edu) =>
      prisma.education.update({
        where: { id: edu.id },
        data: { order: edu.order },
      })
    )
  )

  revalidatePath("/admin/educations")
  revalidatePath("/about")
  return { success: true }
}

// Toggle publish status
export async function toggleEducationPublish(id: string) {
  await requireAdmin()

  const education = await prisma.education.findUnique({
    where: { id },
    select: { isPublished: true },
  })

  if (!education) {
    throw new Error("Education not found")
  }

  const updated = await prisma.education.update({
    where: { id },
    data: { isPublished: !education.isPublished },
  })

  revalidatePath("/admin/educations")
  revalidatePath("/about")
  return { success: true, education: updated }
}
