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

// Calculate years of experience from Experience records
function calculateYearsExperience(experiences: Array<{ startDate: Date | null; endDate?: Date | null }>) {
  if (experiences.length === 0) return 0

  // Filter out experiences without start dates
  const validExperiences = experiences.filter(exp => exp.startDate !== null) as Array<{ startDate: Date; endDate?: Date | null }>
  
  if (validExperiences.length === 0) return 0

  // Get the earliest start date
  const earliestStart = validExperiences.reduce((earliest, exp) => {
    return exp.startDate < earliest ? exp.startDate : earliest
  }, validExperiences[0].startDate)

  // Calculate years from earliest start to now
  const now = new Date()
  const years = (now.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  
  return Math.floor(years)
}

// Get Status & Quick Stats with auto-calculations (Admin only)
export async function getStatusStats() {
  await requireAdmin()
  
  // Get settings
  let settings = await prisma.settings.findFirst()
  
  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        siteName: "My Portfolio",
      },
    })
  }

  // Calculate stats from database
  const [projectsCount, technologiesCount, experiences] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
    }),
  ])

  // Calculate or use manual years of experience
  const yearsExperience = settings.yearsOfExperience ?? calculateYearsExperience(experiences)

  // Build custom stats array
  const customStats = []
  if (settings.customStatLabel1 && settings.customStatValue1) {
    customStats.push({
      label: settings.customStatLabel1,
      value: settings.customStatValue1,
    })
  }
  if (settings.customStatLabel2 && settings.customStatValue2) {
    customStats.push({
      label: settings.customStatLabel2,
      value: settings.customStatValue2,
    })
  }
  if (settings.customStatLabel3 && settings.customStatValue3) {
    customStats.push({
      label: settings.customStatLabel3,
      value: settings.customStatValue3,
    })
  }

  return {
    availabilityStatus: settings.availabilityStatus,
    currentActivity: settings.currentActivity,
    openToOpportunities: settings.openToOpportunities,
    stats: {
      projectsCount,
      yearsExperience,
      technologiesCount,
      customStats: customStats.length > 0 ? customStats : undefined,
    },
  }
}

// Get Public Status & Quick Stats (no auth required)
export async function getPublicStatusStats() {
  // Get settings
  let settings = await prisma.settings.findFirst()
  
  if (!settings) {
    return {
      availabilityStatus: "available",
      currentActivity: "Building cool stuff",
      openToOpportunities: true,
      stats: {
        projectsCount: 0,
        yearsExperience: 0,
        technologiesCount: 0,
        customStats: undefined,
      },
    }
  }

  // Calculate stats from database (only published items)
  const [projectsCount, technologiesCount, experiences] = await Promise.all([
    prisma.project.count({ where: { isPublished: true } }),
    prisma.skill.count(),
    prisma.experience.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
    }),
  ])

  // Calculate or use manual years of experience
  const yearsExperience = settings.yearsOfExperience ?? calculateYearsExperience(experiences)

  // Build custom stats array
  const customStats = []
  if (settings.customStatLabel1 && settings.customStatValue1) {
    customStats.push({
      label: settings.customStatLabel1,
      value: settings.customStatValue1,
    })
  }
  if (settings.customStatLabel2 && settings.customStatValue2) {
    customStats.push({
      label: settings.customStatLabel2,
      value: settings.customStatValue2,
    })
  }
  if (settings.customStatLabel3 && settings.customStatValue3) {
    customStats.push({
      label: settings.customStatLabel3,
      value: settings.customStatValue3,
    })
  }

  return {
    availabilityStatus: settings.availabilityStatus,
    currentActivity: settings.currentActivity,
    openToOpportunities: settings.openToOpportunities,
    stats: {
      projectsCount,
      yearsExperience,
      technologiesCount,
      customStats: customStats.length > 0 ? customStats : undefined,
    },
  }
}

// Update Status & Stats settings
export async function updateStatusSettings(data: {
  availabilityStatus?: string
  currentActivity?: string
  openToOpportunities?: boolean
  yearsOfExperience?: number | null
  customStatLabel1?: string | null
  customStatValue1?: string | null
  customStatLabel2?: string | null
  customStatValue2?: string | null
  customStatLabel3?: string | null
  customStatValue3?: string | null
}) {
  const user = await requireAdmin()

  // Get existing settings
  let settings = await prisma.settings.findFirst()

  if (settings) {
    // Update existing settings
    settings = await prisma.settings.update({
      where: { id: settings.id },
      data,
    })
  } else {
    // Create new settings if none exist
    settings = await prisma.settings.create({
      data: {
        siteName: "My Portfolio",
        ...data,
      },
    })
  }

  revalidatePath("/about")
  revalidatePath("/admin/settings")
  
  return { success: true, settings }
}
