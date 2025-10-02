"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { projectSchema, createProjectSchema } from "@/lib/validations/project"

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim()
}

// Get all projects (with filtering and pagination)
export async function getProjects(params?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  published?: boolean
}) {
  await requireAdmin()

  const page = params?.page || 1
  const limit = params?.limit || 10
  const skip = (page - 1) * limit

  const where: any = {}

  if (params?.search) {
    where.OR = [
      { title: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
    ]
  }

  if (params?.category) {
    where.category = params.category
  }

  if (params?.published !== undefined) {
    where.isPublished = params.published
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      skip,
      take: limit,
    }),
    prisma.project.count({ where }),
  ])

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// Get single project by ID
export async function getProjectById(id: string) {
  await requireAdmin()

  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  return project
}

// Create new project
export async function createProject(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = createProjectSchema.parse(data)

  // Generate slug from title
  const baseSlug = generateSlug(validatedData.title)
  let slug = baseSlug
  let counter = 1

  // Ensure slug is unique
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  // Get max order for new project
  const maxOrder = await prisma.project.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const project = await prisma.project.create({
    data: {
      ...validatedData,
      dateCompleted: validatedData.dateCompleted ? new Date(validatedData.dateCompleted) : null,
      slug,
      order: (maxOrder?.order || 0) + 1,
      userId: user.id,
    },
  })

  revalidatePath("/admin/projects")
  return { success: true, project }
}

// Update project
export async function updateProject(id: string, data: any) {
  await requireAdmin()

  // Check if project exists
  const existingProject = await prisma.project.findUnique({
    where: { id },
  })

  if (!existingProject) {
    throw new Error("Project not found")
  }

  // If title changed, regenerate slug
  let slug = existingProject.slug
  if (data.title && data.title !== existingProject.title) {
    const baseSlug = generateSlug(data.title)
    slug = baseSlug
    let counter = 1

    // Ensure slug is unique (excluding current project)
    while (
      await prisma.project.findFirst({
        where: { slug, id: { not: id } },
      })
    ) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      dateCompleted: data.dateCompleted ? new Date(data.dateCompleted) : null,
      slug,
    },
  })

  revalidatePath("/admin/projects")
  revalidatePath(`/admin/projects/${id}`)
  return { success: true, project }
}

// Delete project
export async function deleteProject(id: string) {
  await requireAdmin()

  await prisma.project.delete({
    where: { id },
  })

  revalidatePath("/admin/projects")
  return { success: true }
}

// Archive/Unarchive project (soft delete)
export async function toggleArchiveProject(id: string) {
  await requireAdmin()

  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  const updated = await prisma.project.update({
    where: { id },
    data: { archived: !project.archived },
  })

  revalidatePath("/admin/projects")
  return { success: true, project: updated }
}

// Toggle featured
export async function toggleFeaturedProject(id: string) {
  await requireAdmin()

  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  const updated = await prisma.project.update({
    where: { id },
    data: { isFeatured: !project.isFeatured },
  })

  revalidatePath("/admin/projects")
  return { success: true, project: updated }
}

// Toggle published
export async function togglePublishedProject(id: string) {
  await requireAdmin()

  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    throw new Error("Project not found")
  }

  const updated = await prisma.project.update({
    where: { id },
    data: { isPublished: !project.isPublished },
  })

  revalidatePath("/admin/projects")
  return { success: true, project: updated }
}

// Bulk delete projects
export async function bulkDeleteProjects(ids: string[]) {
  await requireAdmin()

  await prisma.project.deleteMany({
    where: { id: { in: ids } },
  })

  revalidatePath("/admin/projects")
  return { success: true }
}

// Reorder projects
export async function reorderProjects(projects: { id: string; order: number }[]) {
  await requireAdmin()

  // Update all projects in a transaction
  await prisma.$transaction(
    projects.map((project) =>
      prisma.project.update({
        where: { id: project.id },
        data: { order: project.order },
      })
    )
  )

  revalidatePath("/admin/projects")
  return { success: true }
}
