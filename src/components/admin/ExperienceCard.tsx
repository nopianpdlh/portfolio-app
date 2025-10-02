"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Edit, Trash2, Briefcase, Calendar } from "lucide-react"
import { deleteExperience } from "@/lib/actions/experiences"
import { formatDate } from "@/lib/utils"

interface Experience {
  id: string
  title: string
  company: string | null
  description: string | null
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  order: number
}

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: experience.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${experience.title}" from ${experience.company}?`)) return

    setIsDeleting(true)
    try {
      await deleteExperience(experience.id)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete experience")
      setIsDeleting(false)
    }
  }

  const formatDateRange = () => {
    const start = experience.startDate ? formatDate(experience.startDate) : "Present"
    const end = experience.isCurrent ? "Present" : experience.endDate ? formatDate(experience.endDate) : "Present"
    return `${start} - ${end}`
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex gap-4 p-6 border rounded-lg bg-white hover:shadow-md transition-shadow ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 pt-1"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Timeline Icon */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-blue-600" />
        </div>
        <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold">{experience.title}</h3>
            {experience.company && (
              <p className="text-gray-600">{experience.company}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {experience.isCurrent && (
              <Badge className="bg-green-500">Current</Badge>
            )}
            <Button size="sm" variant="ghost" asChild>
              <Link href={`/admin/experiences/${experience.id}/edit`}>
                <Edit className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDateRange()}</span>
        </div>

        {experience.description && (
          <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
            {experience.description}
          </p>
        )}
      </div>
    </div>
  )
}
