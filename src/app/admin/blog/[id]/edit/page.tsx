import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBlogPostById } from "@/lib/actions/blog"
import BlogPostForm from "@/components/admin/forms/BlogPostForm"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <p className="text-gray-600 mt-1">{post.title}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border p-6">
        <BlogPostForm
          initialData={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            tags: post.tags,
            isPublished: post.isPublished,
            publishDate: post.publishDate,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
          }}
        />
      </div>
    </div>
  )
}
