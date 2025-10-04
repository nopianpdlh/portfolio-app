"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  getEducations,
  deleteEducation,
  toggleEducationPublish,
} from "@/lib/actions/educations"
import type { Education } from "@/types"

export default function EducationsPage() {
  const router = useRouter()
  const [educations, setEducations] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEducations()
  }, [])

  const loadEducations = async () => {
    try {
      const data = await getEducations()
      setEducations(data)
    } catch (error) {
      toast.error("Failed to load educations")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return

    try {
      await deleteEducation(id)
      toast.success("Education deleted")
      loadEducations()
    } catch (error) {
      toast.error("Failed to delete education")
    }
  }

  const handleTogglePublish = async (id: string) => {
    try {
      await toggleEducationPublish(id)
      toast.success("Education visibility updated")
      loadEducations()
    } catch (error) {
      toast.error("Failed to update education")
    }
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Education</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-muted-foreground mt-1">
            Manage your educational background and qualifications
          </p>
        </div>
        <Button onClick={() => router.push("/admin/educations/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {educations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <svg
                className="h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">No education entries yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-4">
              Start by adding your educational background
            </p>
            <Button onClick={() => router.push("/admin/educations/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {educations.map((edu) => (
            <Card key={edu.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="cursor-move">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        {edu.field && (
                          <p className="text-sm text-muted-foreground">Field: {edu.field}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!edu.isPublished && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Draft
                          </span>
                        )}
                        {edu.isCurrent && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        {formatDate(edu.startDate)} - {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                      </div>
                      {edu.grade && (
                        <div>
                          <span className="font-medium">Grade:</span> {edu.grade}
                        </div>
                      )}
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTogglePublish(edu.id)}
                      title={edu.isPublished ? "Unpublish" : "Publish"}
                    >
                      {edu.isPublished ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/educations/${edu.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(edu.id)}
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
