"use client"

import { useState } from "react"
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
import ExperienceCard from "./ExperienceCard"
import { reorderExperiences } from "@/lib/actions/experiences"

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

interface ExperiencesListProps {
  experiences: Experience[]
}

export default function ExperiencesList({ experiences: initialExperiences }: ExperiencesListProps) {
  const router = useRouter()
  const [experiences, setExperiences] = useState(initialExperiences)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = experiences.findIndex((exp) => exp.id === active.id)
    const newIndex = experiences.findIndex((exp) => exp.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(experiences, oldIndex, newIndex)
      setExperiences(newOrder)

      // Update in database
      try {
        await reorderExperiences(
          newOrder.map((exp, index) => ({
            id: exp.id,
            order: index,
          }))
        )
        router.refresh()
      } catch (error) {
        console.error(error)
        // Revert on error
        setExperiences(initialExperiences)
      }
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={experiences.map((exp) => exp.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
