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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createProjectSchema } from "@/lib/validations/project"
import { createProject, updateProject } from "@/lib/actions/projects"
import TagsInput from "@/components/admin/TagsInput"
import { Loader2 } from "lucide-react"

type ProjectFormData = z.infer<typeof createProjectSchema>

interface ProjectFormProps {
  initialData?: {
    id: string
    title: string
    description: string
    techStack: string[]
    programmingLanguages: string[]
    category: string | null
    liveUrl: string | null
    repoUrl: string | null
    images: string[]
    dateCompleted: Date | null
    isFeatured: boolean
    isPublished: boolean
  }
}

const PROJECT_CATEGORIES = [
  "Web Application",
  "Mobile App",
  "Desktop App",
  "CLI Tool",
  "API/Backend",
  "Library/Package",
  "Game",
  "Other",
]

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack || [])
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(
    initialData?.programmingLanguages || []
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          techStack: initialData.techStack,
          programmingLanguages: initialData.programmingLanguages,
          category: initialData.category || undefined,
          liveUrl: initialData.liveUrl || "",
          repoUrl: initialData.repoUrl || "",
          images: initialData.images || [],
          dateCompleted: initialData.dateCompleted
            ? new Date(initialData.dateCompleted).toISOString().split("T")[0]
            : undefined,
          isFeatured: initialData.isFeatured,
          isPublished: initialData.isPublished,
        }
      : {
          images: [],
          isFeatured: false,
          isPublished: false,
        },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        techStack,
        programmingLanguages,
      }

      if (initialData?.id) {
        await updateProject(initialData.id, formData)
      } else {
        await createProject(formData)
      }

      router.push("/admin/projects")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to save project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input id="title" {...register("title")} placeholder="My Awesome Project" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          defaultValue={initialData?.category || undefined}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe your project..."
          rows={5}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label>
          Tech Stack <span className="text-red-500">*</span>
        </Label>
        <TagsInput
          tags={techStack}
          onChange={(tags: string[]) => {
            setTechStack(tags)
            setValue("techStack", tags)
          }}
          placeholder="Add technologies (e.g., React, Node.js)"
        />
        {errors.techStack && <p className="text-sm text-red-500">{errors.techStack.message}</p>}
      </div>

      {/* Programming Languages */}
      <div className="space-y-2">
        <Label>
          Programming Languages <span className="text-red-500">*</span>
        </Label>
        <TagsInput
          tags={programmingLanguages}
          onChange={(tags: string[]) => {
            setProgrammingLanguages(tags)
            setValue("programmingLanguages", tags)
          }}
          placeholder="Add languages (e.g., TypeScript, Python)"
        />
        {errors.programmingLanguages && (
          <p className="text-sm text-red-500">{errors.programmingLanguages.message}</p>
        )}
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live Demo URL</Label>
          <Input
            id="liveUrl"
            {...register("liveUrl")}
            placeholder="https://example.com"
            type="url"
          />
          {errors.liveUrl && <p className="text-sm text-red-500">{errors.liveUrl.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repository URL</Label>
          <Input
            id="repoUrl"
            {...register("repoUrl")}
            placeholder="https://github.com/username/repo"
            type="url"
          />
          {errors.repoUrl && <p className="text-sm text-red-500">{errors.repoUrl.message}</p>}
        </div>
      </div>

      {/* Date Completed */}
      <div className="space-y-2">
        <Label htmlFor="dateCompleted">Date Completed</Label>
        <Input id="dateCompleted" {...register("dateCompleted")} type="date" />
        {errors.dateCompleted && (
          <p className="text-sm text-red-500">{errors.dateCompleted.message}</p>
        )}
      </div>

      {/* Status Toggles */}
      <div className="flex items-center space-x-6 pt-4 border-t">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">Featured Project</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("isPublished")}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">Published</span>
        </label>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  )
}
