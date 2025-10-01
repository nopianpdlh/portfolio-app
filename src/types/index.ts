// Enhanced types based on updated Prisma schema

export type User = {
  id: string
  email: string
  password?: string // Don't expose in frontend
  name?: string | null
  bio?: string | null
  photoUrl?: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  programmingLanguages: string[]
  category?: string | null
  images: string[]
  liveUrl?: string | null
  repoUrl?: string | null
  challenges?: string | null
  solutions?: string | null
  metrics?: string | null
  dateCompleted?: Date | null
  isFeatured: boolean
  isPublished: boolean
  slug: string
  order: number
  archived: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type Skill = {
  id: string
  name: string
  category?: string | null
  level?: string | null
  order: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type Experience = {
  id: string
  title: string
  company?: string | null
  description?: string | null
  startDate?: Date | null
  endDate?: Date | null
  isCurrent: boolean
  order: number
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type BlogPost = {
  id: string
  title: string
  content: string
  excerpt?: string | null
  tags: string[]
  coverImage?: string | null
  publishDate?: Date | null
  isPublished: boolean
  slug: string
  metaTitle?: string | null
  metaDescription?: string | null
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type Contact = {
  id: string
  name: string
  email: string
  subject?: string | null
  message: string
  replied: boolean
  createdAt: Date
  userId?: string | null
}

export type Settings = {
  id: string
  siteName: string
  siteTagline?: string | null
  siteDescription?: string | null
  resumeUrl?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  github?: string | null
  linkedin?: string | null
  twitter?: string | null
  instagram?: string | null
  createdAt: Date
  updatedAt: Date
}

// Form types for frontend
export type ProjectFormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'archived'>

export type ContactFormData = Pick<Contact, 'name' | 'email' | 'subject' | 'message'>

export type SkillFormData = Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

export type ExperienceFormData = Omit<Experience, 'id' | 'createdAt' | 'updatedAt' | 'userId'>

export type BlogPostFormData = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
