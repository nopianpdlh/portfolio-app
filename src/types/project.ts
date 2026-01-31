/**
 * Shared Project type definitions
 * Based on Prisma schema with selected fields for public display
 */

/**
 * Base project interface for list views (ProjectsGrid, ProjectCard)
 */
export interface ProjectListItem {
  id: string
  title: string
  description: string
  images: string[]
  liveUrl: string | null
  repoUrl: string | null
  techStack: string[]
  programmingLanguages: string[]
  category: string | null
  isFeatured: boolean
  slug: string
  order: number
}

/**
 * Extended project interface for detail views (ProjectDetailClient)
 */
export interface ProjectDetail extends ProjectListItem {
  challenges: string | null
  solutions: string | null
  metrics: string | null
  dateCompleted: Date | null
  createdAt?: Date
  updatedAt?: Date
}
