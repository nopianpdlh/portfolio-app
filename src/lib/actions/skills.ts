"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { createSkillSchema, reorderSkillsSchema } from "@/lib/validations/skill"

// Get all skills with optional filtering
export async function getSkills(category?: string) {
  await requireAdmin()

  const skills = await prisma.skill.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: "asc" },
  })

  return skills
}

// Get skills grouped by category
export async function getSkillsByCategory() {
  await requireAdmin()

  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  })

  // Group by category
  type SkillType = typeof skills[number]
  const grouped = skills.reduce((acc: Record<string, SkillType[]>, skill: SkillType) => {
    const cat = skill.category || "Other"
    if (!acc[cat]) {
      acc[cat] = []
    }
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, SkillType[]>)

  return grouped
}

// Get single skill
export async function getSkillById(id: string) {
  await requireAdmin()

  const skill = await prisma.skill.findUnique({
    where: { id },
  })

  return skill
}

// Create new skill
export async function createSkill(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = createSkillSchema.parse(data)

  // Get max order for new skill
  const maxOrder = await prisma.skill.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const skill = await prisma.skill.create({
    data: {
      ...validatedData,
      order: (maxOrder?.order || 0) + 1,
      userId: user.id,
    },
  })

  revalidatePath("/admin/skills")
  return { success: true, skill }
}

// Update skill
export async function updateSkill(id: string, data: any) {
  await requireAdmin()

  const skill = await prisma.skill.update({
    where: { id },
    data,
  })

  revalidatePath("/admin/skills")
  return { success: true, skill }
}

// Delete skill
export async function deleteSkill(id: string) {
  await requireAdmin()

  await prisma.skill.delete({
    where: { id },
  })

  revalidatePath("/admin/skills")
  return { success: true }
}

// Bulk delete skills
export async function bulkDeleteSkills(ids: string[]) {
  await requireAdmin()

  await prisma.skill.deleteMany({
    where: {
      id: { in: ids },
    },
  })

  revalidatePath("/admin/skills")
  return { success: true }
}

// Reorder skills (for drag-and-drop)
export async function reorderSkills(data: any) {
  await requireAdmin()

  const validatedData = reorderSkillsSchema.parse(data)

  // Update all skills in a transaction
  await prisma.$transaction(
    validatedData.skills.map((skill) =>
      prisma.skill.update({
        where: { id: skill.id },
        data: { order: skill.order },
      })
    )
  )

  revalidatePath("/admin/skills")
  return { success: true }
}
