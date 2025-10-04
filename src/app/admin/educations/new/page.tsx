"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createEducation } from "@/lib/actions/educations"
import { createEducationSchema } from "@/lib/validations/education"
import type { z } from "zod"

type FormData = z.infer<typeof createEducationSchema>

export default function NewEducationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createEducationSchema),
    defaultValues: {
      isCurrent: false,
      isPublished: true,
    },
  })

  const isCurrent = watch("isCurrent")
  const isPublished = watch("isPublished")

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const result = await createEducation(data)
      if (result.success) {
        toast.success("Education created successfully")
        router.push("/admin/educations")
      } else {
        toast.error("Failed to create education")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Education</h1>
          <p className="text-muted-foreground mt-1">
            Add your educational background and qualifications
          </p>
        </div>
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
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Education
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
