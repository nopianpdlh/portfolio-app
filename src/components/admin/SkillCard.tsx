"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GripVertical, Edit, Trash2, Save, X } from "lucide-react"
import { updateSkill, deleteSkill } from "@/lib/actions/skills"

interface Skill {
  id: string
  name: string
  category: string | null
  level: string | null
  order: number
}

interface SkillCardProps {
  skill: Skill
  categories: string[]
  levels: string[]
}

export default function SkillCard({ skill, categories, levels }: SkillCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editData, setEditData] = useState({
    name: skill.name,
    category: skill.category || "Other",
    level: skill.level || "Intermediate",
  })

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: skill.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleSave = async () => {
    try {
      await updateSkill(skill.id, editData)
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update skill")
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${skill.name}"?`)) return

    setIsDeleting(true)
    try {
      await deleteSkill(skill.id)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to delete skill")
      setIsDeleting(false)
    }
  }

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case "Expert":
        return "bg-purple-500"
      case "Advanced":
        return "bg-blue-500"
      case "Intermediate":
        return "bg-green-500"
      case "Beginner":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 border rounded-lg bg-white ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Content */}
      {isEditing ? (
        <>
          <Input
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="flex-1 max-w-xs"
            placeholder="Skill name"
          />
          <Select
            value={editData.category}
            onValueChange={(value) => setEditData({ ...editData, category: value })}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={editData.level}
            onValueChange={(value) => setEditData({ ...editData, level: value })}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : (
        <>
          <div className="flex-1">
            <span className="font-medium">{skill.name}</span>
          </div>
          {skill.category && (
            <Badge variant="secondary" className="text-xs">
              {skill.category}
            </Badge>
          )}
          {skill.level && (
            <Badge className={`${getLevelColor(skill.level)} text-white text-xs`}>
              {skill.level}
            </Badge>
          )}
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="default" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setEditData({
                  name: skill.name,
                  category: skill.category || "Other",
                  level: skill.level || "Intermediate",
                })
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4" />
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
          </>
        )}
      </div>
    </div>
  )
}
