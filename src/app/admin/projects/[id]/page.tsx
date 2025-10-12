import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, ExternalLink, Github, Calendar, Star } from "lucide-react"
import { getProjectById } from "@/lib/actions/projects"
import { formatDate } from "@/lib/utils"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            {project.isPublished ? (
              <Badge className="bg-green-500">Published</Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}
            {project.isFeatured && (
              <Badge className="bg-yellow-500">
                <Star className="w-3 h-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            {project.archived && <Badge variant="destructive">Archived</Badge>}
            {project.category && <Badge variant="outline">{project.category}</Badge>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{project.description}</p>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, i: number) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Programming Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Programming Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.programmingLanguages.map((lang: string, i: number) => (
                <Badge key={i} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Links & Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.liveUrl && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Live Demo</p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {project.liveUrl}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {project.repoUrl && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Repository</p>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {project.repoUrl}
                  <Github className="w-4 h-4" />
                </a>
              </div>
            )}

            {project.dateCompleted && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.dateCompleted)}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Created</p>
              <p>{formatDate(project.createdAt)}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Last Updated</p>
              <p>{formatDate(project.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
