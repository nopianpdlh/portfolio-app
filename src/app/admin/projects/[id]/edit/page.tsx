import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectForm from "@/components/admin/forms/ProjectForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getProjectById } from "@/lib/actions/projects"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-gray-600 mt-1">Update project details</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            initialData={{
              id: project.id,
              title: project.title,
              description: project.description,
              techStack: project.techStack,
              programmingLanguages: project.programmingLanguages,
              category: project.category,
              liveUrl: project.liveUrl,
              repoUrl: project.repoUrl,
              images: project.images,
              dateCompleted: project.dateCompleted,
              isFeatured: project.isFeatured,
              isPublished: project.isPublished,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
