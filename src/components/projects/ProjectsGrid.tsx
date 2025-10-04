"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "./ProjectCard"
import ProjectFilters from "./ProjectFilters"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  liveUrl: string | null
  repoUrl: string | null
  techStack: string[]
  programmingLanguages: string[]
  category: string | null
  isFeatured: boolean
  slug: string
  order: number
}

interface ProjectsGridProps {
  initialProjects: Project[]
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedTech, setSelectedTech] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Get unique categories and technologies
  const categories = useMemo(() => {
    const cats = new Set<string>()
    initialProjects.forEach((p) => {
      if (p.category) cats.add(p.category)
    })
    return ["all", ...Array.from(cats)]
  }, [initialProjects])

  const technologies = useMemo(() => {
    const techs = new Set<string>()
    initialProjects.forEach((p) => {
      p.techStack.forEach((tech) => techs.add(tech))
      p.programmingLanguages.forEach((lang) => techs.add(lang))
    })
    return ["all", ...Array.from(techs)]
  }, [initialProjects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory
      
      const matchesTech =
        selectedTech === "all" ||
        project.techStack.includes(selectedTech) ||
        project.programmingLanguages.includes(selectedTech)
      
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesTech && matchesSearch
    })
  }, [initialProjects, selectedCategory, selectedTech, searchQuery])

  return (
    <div className="space-y-8">
      <ProjectFilters
        categories={categories}
        technologies={technologies}
        selectedCategory={selectedCategory}
        selectedTech={selectedTech}
        searchQuery={searchQuery}
        onCategoryChange={setSelectedCategory}
        onTechChange={setSelectedTech}
        onSearchChange={setSearchQuery}
      />

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {initialProjects.length} projects
      </div>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={staggerItem} layout>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSelectedTech("all")
                setSearchQuery("")
              }}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
