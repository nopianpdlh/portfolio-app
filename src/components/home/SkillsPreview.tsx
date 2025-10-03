"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSkillsByCategory } from "@/lib/actions/public"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { Button } from "@/components/ui/button"

interface Skill {
  id: string
  name: string
  level: string | null
  category: string | null
  order: number
}

export default function SkillsPreview() {
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skill[]>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      const result = await getSkillsByCategory()
      if (result.success && result.data) {
        // Limit to first 3 categories and first 6 skills per category
        const limited: Record<string, Skill[]> = {}
        const categories = Object.keys(result.data).slice(0, 3)
        categories.forEach((cat) => {
          limited[cat] = result.data![cat].slice(0, 6)
        })
        setSkillsByCategory(limited)
      }
      setLoading(false)
    }
    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Skills & Technologies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (Object.keys(skillsByCategory).length === 0) {
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse set of tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={staggerItem}
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4 text-primary">{category}</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className="flex items-center justify-between"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    {skill.level && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {skill.level}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Skills Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/about">
              View All Skills
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
