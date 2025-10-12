import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogPosts } from "@/lib/actions/blog"
import BlogPostsTable from "@/components/admin/tables/BlogPostsTable"

interface PageProps {
  searchParams: Promise<{
    page?: string
    search?: string
    status?: string
  }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""
  const status = params.status || "all"

  const { posts, pagination } = await getBlogPosts({
    page,
    search,
    status,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog articles and content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Total Posts</div>
          <div className="text-2xl font-bold">{pagination.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Published</div>
          <div className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.isPublished).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Drafts</div>
          <div className="text-2xl font-bold text-gray-600">
            {posts.filter(p => !p.isPublished).length}
          </div>
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostsTable posts={posts} pagination={pagination} />
      </Suspense>
    </div>
  )
}
