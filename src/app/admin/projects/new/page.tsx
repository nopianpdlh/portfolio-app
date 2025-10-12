import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectForm from "@/components/admin/forms/ProjectForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Project</h1>
          <p className="text-gray-600 mt-1">Create a new project for your portfolio</p>
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
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}
