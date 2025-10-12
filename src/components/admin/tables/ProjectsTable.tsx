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
  Star,
  Archive,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react"
import { deleteProject, toggleFeaturedProject, togglePublishedProject, toggleArchiveProject } from "@/lib/actions/projects"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  programmingLanguages: string[]
  category: string | null
  liveUrl: string | null
  repoUrl: string | null
  images: string[]
  challenges: string | null
  solutions: string | null
  metrics: string | null
  dateCompleted: Date | null
  isFeatured: boolean
  isPublished: boolean
  archived: boolean
  order: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

interface ProjectsTableProps {
  projects: Project[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function ProjectsTable({ projects, pagination }: ProjectsTableProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null)

  const handleSearch = (value: string) => {
    setSearch(value)
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    params.set("page", "1")
    router.push(`/admin/projects?${params.toString()}`)
  }

  const handleDeleteClick = (id: string, title: string) => {
    setProjectToDelete({ id, title })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return

    setLoading(projectToDelete.id)
    try {
      await deleteProject(projectToDelete.id)
      toast.success("Project deleted successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete project. Please try again.")
    } finally {
      setLoading(null)
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  const handleToggleFeatured = async (id: string) => {
    setLoading(id)
    try {
      await toggleFeaturedProject(id)
      toast.success("Featured status updated!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update project. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleTogglePublished = async (id: string) => {
    setLoading(id)
    try {
      await togglePublishedProject(id)
      toast.success("Publish status updated!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update project. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleToggleArchive = async (id: string) => {
    setLoading(id)
    try {
      await toggleArchiveProject(id)
      toast.success("Archive status updated!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update project. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  No projects found. Create your first project!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span>{project.title}</span>
                        {project.archived && (
                          <Badge variant="secondary" className="text-xs">
                            Archived
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.category && (
                      <Badge variant="secondary">{project.category}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.isPublished ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="w-3 h-3 mr-1" />
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.isFeatured ? (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <Star className="w-4 h-4 text-gray-300" />
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(project.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={loading === project.id}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/${project.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleFeatured(project.id)}>
                          <Star className="w-4 h-4 mr-2" />
                          {project.isFeatured ? "Unfeature" : "Feature"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTogglePublished(project.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {project.isPublished ? "Unpublish" : "Publish"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleArchive(project.id)}>
                          <Archive className="w-4 h-4 mr-2" />
                          {project.archived ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(project.id, project.title)}
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
              This will permanently delete the project <strong>&quot;{projectToDelete?.title}&quot;</strong>.
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
            projects
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => router.push(`/admin/projects?page=${pagination.page - 1}`)}
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
              onClick={() => router.push(`/admin/projects?page=${pagination.page + 1}`)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
