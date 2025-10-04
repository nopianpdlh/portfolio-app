import { Suspense } from "react"
import { getPublishedProjects } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import ProjectsHeader from "@/components/projects/ProjectsHeader"
import ProjectsLoading from "@/components/projects/ProjectsLoading"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Projects",
  description: "Explore my portfolio of web development projects, applications, and creative work. Built with modern technologies like React, Next.js, and TypeScript",
  url: "/projects",
  keywords: ["projects", "portfolio", "web development", "applications", "next.js", "react"],
})

export default async function ProjectsPage() {
  const result = await getPublishedProjects()
  const projects = result.success && result.data ? result.data : []

  return (
    <PublicLayout>
      <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader />
        
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsGrid initialProjects={projects} />
        </Suspense>
      </div>
    </main>
    </PublicLayout>
  )
}
