"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react"
import { deleteBlogPost, togglePublishBlogPost } from "@/lib/actions/blog"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  isPublished: boolean
  publishDate: Date | null
  createdAt: Date
  tags: string[]
  user: {
    name: string | null
    email: string
  }
}

interface BlogPostsTableProps {
  posts: BlogPost[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function BlogPostsTable({ posts, pagination }: BlogPostsTableProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [loading, setLoading] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<{ id: string; title: string } | null>(null)

  const handleSearch = (value: string) => {
    setSearch(value)
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    params.set("page", "1")
    router.push(`/admin/blog?${params.toString()}`)
  }

  const handleStatusFilter = (value: string) => {
    setStatus(value)
    const params = new URLSearchParams(window.location.search)
    if (value !== "all") {
      params.set("status", value)
    } else {
      params.delete("status")
    }
    params.set("page", "1")
    router.push(`/admin/blog?${params.toString()}`)
  }

  const handleDeleteClick = (id: string, title: string) => {
    setPostToDelete({ id, title })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    setLoading(postToDelete.id)
    try {
      await deleteBlogPost(postToDelete.id)
      toast.success("Post deleted successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete post. Please try again.")
    } finally {
      setLoading(null)
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const handleTogglePublish = async (id: string) => {
    setLoading(id)
    try {
      await togglePublishBlogPost(id)
      toast.success("Publish status updated!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update post. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={status} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No blog posts found. Create your first post!
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="font-medium hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {post.isPublished ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {post.user.name || post.user.email}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(post.publishDate || post.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={loading === post.id}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            View Post
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${post.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleTogglePublish(post.id)}>
                          {post.isPublished ? (
                            <>
                              <XCircle className="w-4 h-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(post.id, post.title)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post <strong>&quot;{postToDelete?.title}&quot;</strong>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{" "}
            posts
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => router.push(`/admin/blog?page=${pagination.page - 1}`)}
            >
              Previous
            </Button>
            <div className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => router.push(`/admin/blog?page=${pagination.page + 1}`)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
