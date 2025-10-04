"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  getEducationById,
  updateEducation,
  deleteEducation,
} from "@/lib/actions/educations"
import { updateEducationSchema } from "@/lib/validations/education"
import type { z } from "zod"

type FormData = z.infer<typeof updateEducationSchema>

export default function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(updateEducationSchema),
  })

  const isCurrent = watch("isCurrent")
  const isPublished = watch("isPublished")

  useEffect(() => {
    loadEducation()
  }, [id])

  const loadEducation = async () => {
    try {
      const edu = await getEducationById(id)
      if (edu) {
        reset({
          institution: edu.institution,
          degree: edu.degree,
          field: edu.field || undefined,
          startDate: edu.startDate ? new Date(edu.startDate).toISOString().split("T")[0] : undefined,
          endDate: edu.endDate ? new Date(edu.endDate).toISOString().split("T")[0] : undefined,
          isCurrent: edu.isCurrent,
          grade: edu.grade || undefined,
          description: edu.description || undefined,
          location: edu.location || undefined,
          isPublished: edu.isPublished,
        })
      } else {
        toast.error("Education not found")
        router.push("/admin/educations")
      }
    } catch (error) {
      toast.error("Failed to load education")
    } finally {
      setInitialLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const result = await updateEducation(id, data)
      if (result.success) {
        toast.success("Education updated successfully")
        router.push("/admin/educations")
      } else {
        toast.error("Failed to update education")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this education entry?")) return

    try {
      await deleteEducation(id)
      toast.success("Education deleted")
      router.push("/admin/educations")
    } catch (error) {
      toast.error("Failed to delete education")
    }
  }

  if (initialLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-10 bg-muted animate-pulse rounded" />
              <div className="h-10 bg-muted animate-pulse rounded" />
              <div className="h-20 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Education</h1>
            <p className="text-muted-foreground mt-1">Update education details</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution">
                Institution Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="institution"
                {...register("institution")}
                placeholder="e.g., Massachusetts Institute of Technology"
                className={errors.institution ? "border-destructive" : ""}
              />
              {errors.institution && (
                <p className="text-sm text-destructive">{errors.institution.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="degree">
                Degree/Qualification <span className="text-destructive">*</span>
              </Label>
              <Input
                id="degree"
                {...register("degree")}
                placeholder="e.g., Bachelor of Computer Science"
                className={errors.degree ? "border-destructive" : ""}
              />
              {errors.degree && (
                <p className="text-sm text-destructive">{errors.degree.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">Field of Study (Optional)</Label>
              <Input
                id="field"
                {...register("field")}
                placeholder="e.g., Computer Science, Software Engineering"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  End Date {isCurrent && "(Optional - Currently studying)"}
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  {...register("endDate")}
                  disabled={isCurrent}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isCurrent"
                checked={isCurrent}
                onCheckedChange={(checked: boolean) => setValue("isCurrent", checked)}
              />
              <Label htmlFor="isCurrent" className="cursor-pointer">
                I am currently studying here
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade/GPA (Optional)</Label>
                <Input
                  id="grade"
                  {...register("grade")}
                  placeholder="e.g., 3.8 GPA, Cum Laude, First Class"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="e.g., Cambridge, MA, USA"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Key courses, achievements, activities, or relevant details..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isPublished">Publish Education</Label>
                <p className="text-sm text-muted-foreground">
                  Make this education entry visible on your portfolio
                </p>
              </div>
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={(checked: boolean) => setValue("isPublished", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
