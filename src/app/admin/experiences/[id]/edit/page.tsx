import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExperienceForm from "@/components/admin/forms/ExperienceForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getExperienceById } from "@/lib/actions/experiences"

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const experience = await getExperienceById(id)

  if (!experience) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Experience</h1>
          <p className="text-gray-600 mt-1">Update experience details</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/experiences">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experiences
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            initialData={{
              id: experience.id,
              title: experience.title,
              company: experience.company,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.endDate,
              isCurrent: experience.isCurrent,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
