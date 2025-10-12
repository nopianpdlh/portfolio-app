import { notFound } from "next/navigation"
import { getProjectBySlug, getPublishedProjects } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import ProjectDetailClient from "@/components/projects/ProjectDetailClient"
import { Metadata } from "next"
import { generateSEO, generateProjectSchema, siteConfig } from "@/lib/seo"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProjectBySlug(slug)
  
  if (!result.success || !result.data) {
    return {
      title: "Project Not Found",
    }
  }

  const project = result.data
  const firstImage = project.images[0] || '/placeholder.jpg'

  return generateSEO({
    title: project.title,
    description: project.description,
    image: firstImage,
    url: `/projects/${project.slug}`,
    keywords: [...project.techStack, ...project.programmingLanguages, project.category || ''],
    type: 'article',
  })
}

export async function generateStaticParams() {
  const result = await getPublishedProjects()
  
  if (!result.success || !result.data) {
    return []
  }

  return result.data.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const result = await getProjectBySlug(slug)

  if (!result.success || !result.data) {
    notFound()
  }

  const project = result.data
  
  // Generate JSON-LD structured data
  const projectSchema = generateProjectSchema({
    name: project.title,
    description: project.description,
    image: project.images[0] || '/placeholder.jpg',
    url: `${siteConfig.url}/projects/${project.slug}`,
    datePublished: project.createdAt.toISOString(),
    dateModified: project.updatedAt.toISOString(),
    author: siteConfig.author,
    keywords: [...project.techStack, ...project.programmingLanguages],
  })

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ProjectDetailClient project={result.data} />
    </PublicLayout>
  )
}
