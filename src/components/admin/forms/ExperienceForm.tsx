"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createExperienceSchema } from "@/lib/validations/experience"
import { createExperience, updateExperience } from "@/lib/actions/experiences"
import { Loader2 } from "lucide-react"

type ExperienceFormData = z.infer<typeof createExperienceSchema>

interface ExperienceFormProps {
  initialData?: {
    id: string
    title: string
    company: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean
  }
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          company: initialData.company || "",
          description: initialData.description || "",
          startDate: initialData.startDate
            ? new Date(initialData.startDate).toISOString().split("T")[0]
            : "",
          endDate: initialData.endDate
            ? new Date(initialData.endDate).toISOString().split("T")[0]
            : "",
          isCurrent: initialData.isCurrent,
        }
      : {
          isCurrent: false,
        },
  })

  const isCurrent = watch("isCurrent")

  const onSubmit = async (data: ExperienceFormData) => {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
      }

      if (initialData?.id) {
        await updateExperience(initialData.id, formData)
      } else {
        await createExperience(formData)
      }

      router.push("/admin/experiences")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to save experience")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Job Title <span className="text-red-500">*</span>
        </Label>
        <Input id="title" {...register("title")} placeholder="e.g., Software Engineer" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register("company")} placeholder="e.g., Tech Company Inc." />
        {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe your responsibilities and achievements..."
          rows={6}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" {...register("startDate")} type="date" />
          {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            {...register("endDate")}
            type="date"
            disabled={isCurrent}
            className={isCurrent ? "bg-gray-100 cursor-not-allowed" : ""}
          />
          {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* Current Position Toggle */}
      <div className="flex items-center space-x-2 pt-4 border-t">
        <input
          type="checkbox"
          id="isCurrent"
          {...register("isCurrent")}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isCurrent" className="text-sm font-medium cursor-pointer">
          I currently work here
        </label>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/experiences")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
    </form>
  )
}
