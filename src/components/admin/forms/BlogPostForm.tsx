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
import { createBlogPostSchema } from "@/lib/validations/blog"
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog"
import TagsInput from "@/components/admin/TagsInput"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

type BlogPostFormData = z.infer<typeof createBlogPostSchema>

interface BlogPostFormProps {
  initialData?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    tags: string[]
    isPublished: boolean
    publishDate: Date | null
    metaTitle: string | null
    metaDescription: string | null
  }
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<any>({
    resolver: zodResolver(createBlogPostSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          excerpt: initialData.excerpt || "",
          content: initialData.content,
          coverImage: initialData.coverImage || "",
          tags: initialData.tags,
          isPublished: initialData.isPublished,
          publishDate: initialData.publishDate
            ? new Date(initialData.publishDate).toISOString().split("T")[0]
            : undefined,
          metaTitle: initialData.metaTitle || "",
          metaDescription: initialData.metaDescription || "",
        }
      : {
          tags: [],
          isPublished: false,
        },
  })

  const onSubmit = async (data: BlogPostFormData) => {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        tags,
      }

      if (initialData?.id) {
        await updateBlogPost(initialData.id, formData)
        toast.success("Post updated successfully!")
      } else {
        await createBlogPost(formData)
        toast.success("Post created successfully!")
      }

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to save post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPublished = watch("isPublished")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="How to Build a Portfolio with Next.js"
        />
        {errors.title && <p className="text-sm text-red-500">{String(errors.title.message)}</p>}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">
          Slug <span className="text-xs text-gray-500">(Optional - auto-generated from title)</span>
        </Label>
        <Input
          id="slug"
          {...register("slug")}
          placeholder="how-to-build-portfolio-nextjs"
        />
        {errors.slug && <p className="text-sm text-red-500">{String(errors.slug.message)}</p>}
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">
          Excerpt <span className="text-xs text-gray-500">(Short description, max 500 chars)</span>
        </Label>
        <Textarea
          id="excerpt"
          {...register("excerpt")}
          rows={3}
          placeholder="A brief introduction to your blog post..."
        />
        {errors.excerpt && (
          <p className="text-sm text-red-500">{String(errors.excerpt.message)}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Content <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="content"
          {...register("content")}
          rows={15}
          placeholder="Write your blog post content here... (Supports Markdown)"
          className="font-mono text-sm"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{String(errors.content.message)}</p>
        )}
        <p className="text-xs text-gray-500">
          Supports Markdown formatting. Use # for headings, ** for bold, * for italic, etc.
        </p>
      </div>

      {/* Cover Image */}
      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          {...register("coverImage")}
          type="url"
          placeholder="https://example.com/image.jpg"
        />
        {errors.coverImage && (
          <p className="text-sm text-red-500">{String(errors.coverImage.message)}</p>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <TagsInput tags={tags} onChange={setTags} placeholder="Add tags (press Enter)" />
        <p className="text-xs text-gray-500">
          Press Enter or comma to add tags. Click X to remove.
        </p>
      </div>

      {/* SEO Meta */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold">SEO Metadata (Optional)</h3>
        
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            {...register("metaTitle")}
            placeholder="SEO optimized title (max 100 chars)"
          />
          {errors.metaTitle && (
            <p className="text-sm text-red-500">{String(errors.metaTitle.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            {...register("metaDescription")}
            rows={2}
            placeholder="SEO optimized description (max 200 chars)"
          />
          {errors.metaDescription && (
            <p className="text-sm text-red-500">{String(errors.metaDescription.message)}</p>
          )}
        </div>
      </div>

      {/* Publish Settings */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold">Publish Settings</h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            {...register("isPublished")}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="isPublished" className="cursor-pointer">
            Publish this post immediately
          </Label>
        </div>

        {isPublished && (
          <div className="space-y-2">
            <Label htmlFor="publishDate">Publish Date (Optional)</Label>
            <Input
              id="publishDate"
              {...register("publishDate")}
              type="date"
            />
            <p className="text-xs text-gray-500">
              Leave empty to use current date/time
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          {initialData ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
