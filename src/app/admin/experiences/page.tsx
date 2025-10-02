import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getExperiences } from "@/lib/actions/experiences"
import ExperiencesList from "@/components/admin/ExperiencesList"
import Link from "next/link"

export default async function ExperiencesPage() {
  const experiences = await getExperiences()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Work Experience</h1>
          <p className="text-gray-600 mt-1">Manage your professional experience timeline</p>
        </div>
        <Link href="/admin/experiences/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {experiences.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No experience added yet. Add your first work experience!</p>
            </div>
          ) : (
            <ExperiencesList experiences={experiences} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
