"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { createExperienceSchema } from "@/lib/validations/experience"

// Get all experiences
export async function getExperiences() {
  await requireAdmin()

  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  })

  return experiences
}

// Get single experience
export async function getExperienceById(id: string) {
  await requireAdmin()

  const experience = await prisma.experience.findUnique({
    where: { id },
  })

  return experience
}

// Create new experience
export async function createExperience(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = createExperienceSchema.parse(data)

  // Get max order for new experience
  const maxOrder = await prisma.experience.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const experience = await prisma.experience.create({
    data: {
      ...validatedData,
      startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      order: (maxOrder?.order || 0) + 1,
      userId: user.id,
    },
  })

  revalidatePath("/admin/experiences")
  return { success: true, experience }
}

// Update experience
export async function updateExperience(id: string, data: any) {
  await requireAdmin()

  const experience = await prisma.experience.update({
    where: { id },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  })

  revalidatePath("/admin/experiences")
  return { success: true, experience }
}

// Delete experience
export async function deleteExperience(id: string) {
  await requireAdmin()

  await prisma.experience.delete({
    where: { id },
  })

  revalidatePath("/admin/experiences")
  return { success: true }
}

// Reorder experiences
export async function reorderExperiences(experiences: { id: string; order: number }[]) {
  await requireAdmin()

  // Update all experiences in a transaction
  await prisma.$transaction(
    experiences.map((exp) =>
      prisma.experience.update({
        where: { id: exp.id },
        data: { order: exp.order },
      })
    )
  )

  revalidatePath("/admin/experiences")
  return { success: true }
}
