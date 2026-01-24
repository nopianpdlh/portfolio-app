"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"

/**
 * Public Actions - For frontend pages (no authentication required)
 * These actions fetch published/visible content only
 */

// ===== Projects =====
export async function getPublishedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        images: true,
        liveUrl: true,
        repoUrl: true,
        techStack: true,
        programmingLanguages: true,
        category: true,
        isFeatured: true,
        slug: true,
        order: true,
      },
    })

    return { success: true, data: projects }
  } catch (error) {
    console.error("Error fetching published projects:", error)
    return { success: false, error: "Failed to fetch projects" }
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    // For now, using id as slug. You can add slug field to Project model later
    const project = await prisma.project.findFirst({
      where: {
        id: slug,
        isPublished: true,
      },
    })

    if (!project) {
      return { success: false, error: "Project not found" }
    }

    return { success: true, data: project }
  } catch (error) {
    console.error("Error fetching project:", error)
    return { success: false, error: "Failed to fetch project" }
  }
}

// ===== Skills =====
export async function getPublishedSkills() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        name: true,
        iconUrl: true,
        iconUrlDark: true,
        level: true,
        category: true,
        order: true,
      },
    })

    return { success: true, data: skills }
  } catch (error) {
    console.error("Error fetching skills:", error)
    return { success: false, error: "Failed to fetch skills" }
  }
}

export async function getSkillsByCategory() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        order: "asc",
      },
    })

    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
      const category = skill.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, {} as Record<string, typeof skills>)

    return { success: true, data: grouped }
  } catch (error) {
    console.error("Error fetching skills by category:", error)
    return { success: false, error: "Failed to fetch skills" }
  }
}

// ===== Experiences =====
export async function getPublishedExperiences() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        title: true,
        company: true,
        startDate: true,
        endDate: true,
        isCurrent: true,
        description: true,
        order: true,
      },
    })

    return { success: true, data: experiences }
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return { success: false, error: "Failed to fetch experiences" }
  }
}

// ===== Blog Posts =====
export async function getPublishedBlogPosts(limit?: number) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        publishDate: "desc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishDate: true,
        tags: true,
      },
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { success: false, error: "Failed to fetch blog posts" }
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        isPublished: true,
      },
    })

    if (!post) {
      return { success: false, error: "Blog post not found" }
    }

    return { success: true, data: post }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return { success: false, error: "Failed to fetch blog post" }
  }
}

export async function getRelatedBlogPosts(postId: string, tags: string[], limit = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        id: { not: postId },
        isPublished: true,
        tags: {
          hasSome: tags,
        },
      },
      orderBy: {
        publishDate: "desc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        publishDate: true,
        tags: true,
      },
    })

    return { success: true, data: posts }
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return { success: false, error: "Failed to fetch related posts" }
  }
}

// ===== Settings =====
export async function getSiteSettings() {
  try {
    const settings = await prisma.settings.findFirst({
      select: {
        siteName: true,
        siteTagline: true,
        siteDescription: true,
        email: true,
        phone: true,
        address: true,
        github: true,
        linkedin: true,
        twitter: true,
        instagram: true,
        resumeUrl: true,
      },
    })

    return { success: true, data: settings }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return { success: false, error: "Failed to fetch settings" }
  }
}

// ===== Certificates =====
export async function getPublishedCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        issueDate: "desc",
      },
      select: {
        id: true,
        name: true,
        issuer: true,
        issueDate: true,
        expiryDate: true,
        credentialId: true,
        credentialUrl: true,
        description: true,
        imageUrl: true,
        order: true,
      },
    })

    return { success: true, data: certificates }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return { success: false, error: "Failed to fetch certificates" }
  }
}

// ===== Education =====
export async function getPublishedEducations() {
  try {
    const educations = await prisma.education.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        startDate: "desc",
      },
      select: {
        id: true,
        institution: true,
        degree: true,
        field: true,
        startDate: true,
        endDate: true,
        isCurrent: true,
        grade: true,
        description: true,
        location: true,
        order: true,
      },
    })

    return { success: true, data: educations }
  } catch (error) {
    console.error("Error fetching educations:", error)
    return { success: false, error: "Failed to fetch educations" }
  }
}

// ===== Contact Form Submission =====
const contactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().max(200, "Subject maksimal 200 karakter").optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(5000, "Pesan maksimal 5000 karakter"),
})

export async function submitContactForm(data: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  try {
    // Validate input
    const validated = contactFormSchema.parse(data)

    const contact = await prisma.contact.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject || "Website Contact Form",
        message: validated.message,
      },
    })

    return { success: true, data: contact }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to submit contact form" }
  }
}
