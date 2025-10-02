"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Loader2 } from "lucide-react"
import SkillCard from "./SkillCard"
import { createSkill, reorderSkills } from "@/lib/actions/skills"
import { toast } from "sonner"

interface Skill {
  id: string
  name: string
  category: string | null
  level: string | null
  order: number
}

interface SkillsManagerProps {
  initialSkills: Record<string, Skill[]>
}

const CATEGORIES = ["Frontend", "Backend", "Languages", "Tools", "Database", "DevOps", "Other"]
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const router = useRouter()
  const [skills, setSkills] = useState<Record<string, Skill[]>>(initialSkills)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend",
    level: "Intermediate",
  })

  // Fix hydration mismatch by only rendering DnD on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Get flat list of skills for selected category
  const getFilteredSkills = () => {
    if (selectedCategory === "All") {
      return Object.values(skills).flat()
    }
    return skills[selectedCategory] || []
  }

  const filteredSkills = getFilteredSkills()

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = filteredSkills.findIndex((s) => s.id === active.id)
    const newIndex = filteredSkills.findIndex((s) => s.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(filteredSkills, oldIndex, newIndex)
      
      // Update local state
      const category = selectedCategory === "All" ? null : selectedCategory
      if (category && skills[category]) {
        setSkills({
          ...skills,
          [category]: newOrder,
        })
      }

      // Update in database
      try {
        await reorderSkills({
          skills: newOrder.map((skill, index) => ({
            id: skill.id,
            order: index,
          })),
        })
        toast.success("Skills reordered successfully!")
        router.refresh()
      } catch (error) {
        console.error(error)
        toast.error("Failed to reorder skills. Please try again.")
        // Revert on error
        setSkills(initialSkills)
      }
    }
  }

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return

    setIsSubmitting(true)
    try {
      await createSkill(newSkill)
      setNewSkill({ name: "", category: "Frontend", level: "Intermediate" })
      setIsAdding(false)
      toast.success("Skill added successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to add skill. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Label>Category:</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setIsAdding(!isAdding)} size="sm" className="ml-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Add Skill Form */}
      {isAdding && (
        <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
          <h3 className="font-semibold">Add New Skill</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="e.g., React"
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddSkill} disabled={isSubmitting || !newSkill.name.trim()}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Skill
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Skills List */}
      <div className="space-y-2">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No skills found. Add your first skill!</p>
          </div>
        ) : !isMounted ? (
          // Render static list during SSR to prevent hydration mismatch
          <div className="space-y-2">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} categories={CATEGORIES} levels={LEVELS} />
            ))}
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={filteredSkills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} categories={CATEGORIES} levels={LEVELS} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-600 border-t pt-4">
        Total Skills: {Object.values(skills).flat().length} | 
        Showing: {filteredSkills.length}
      </div>
    </div>
  )
}
