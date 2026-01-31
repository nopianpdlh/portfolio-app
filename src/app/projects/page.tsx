import { getPublishedProjects } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import ProjectsHeader from "@/components/projects/ProjectsHeader"
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
      <main className="relative min-h-screen py-20 overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 pointer-events-none bg-grid-black dark:bg-grid-white" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
        
        {/* Gradient Mesh Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 dark:opacity-20" />
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-primary/15 blur-[100px] rounded-full opacity-40 dark:opacity-15" />
          <div className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full opacity-30 dark:opacity-10" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsHeader />
          <ProjectsGrid initialProjects={projects} />
        </div>
      </main>
    </PublicLayout>
  )
}
