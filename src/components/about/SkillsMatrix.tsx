"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface Skill {
  id: string
  name: string
  level: string | null
  category: string | null
  order: number
}

interface SkillsMatrixProps {
  skills: Skill[]
}

export default function SkillsMatrix({ skills }: SkillsMatrixProps) {
  // Group skills by category
  const groupedSkills = useMemo(() => {
    const grouped: Record<string, Skill[]> = {}
    skills.forEach((skill) => {
      const category = skill.category || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(skill)
    })
    return grouped
  }, [skills])

  const getLevelColor = (level: string | null) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return "bg-green-500"
      case "advanced":
        return "bg-blue-500"
      case "intermediate":
        return "bg-yellow-500"
      case "beginner":
        return "bg-gray-500"
      default:
        return "bg-primary"
    }
  }

  const getLevelWidth = (level: string | null) => {
    switch (level?.toLowerCase()) {
      case "expert":
        return "w-full"
      case "advanced":
        return "w-4/5"
      case "intermediate":
        return "w-3/5"
      case "beginner":
        return "w-2/5"
      default:
        return "w-1/2"
    }
  }

  if (skills.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div key={category} variants={staggerItem}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-6 text-primary">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        {skill.level && (
                          <Badge variant="outline" className="text-xs">
                            {skill.level}
                          </Badge>
                        )}
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${getLevelColor(skill.level)} ${getLevelWidth(
                            skill.level
                          )}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-sm text-muted-foreground">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-sm text-muted-foreground">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-sm text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-500" />
            <span className="text-sm text-muted-foreground">Beginner</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
