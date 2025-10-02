import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExperienceForm from "@/components/admin/forms/ExperienceForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Experience</h1>
          <p className="text-gray-600 mt-1">Add a new work experience</p>
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
          <ExperienceForm />
        </CardContent>
      </Card>
    </div>
  )
}
