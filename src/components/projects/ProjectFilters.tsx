"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ProjectFiltersProps {
  categories: string[]
  technologies: string[]
  selectedCategory: string
  selectedTech: string
  searchQuery: string
  onCategoryChange: (category: string) => void
  onTechChange: (tech: string) => void
  onSearchChange: (query: string) => void
}

export default function ProjectFilters({
  categories,
  technologies,
  selectedCategory,
  selectedTech,
  searchQuery,
  onCategoryChange,
  onTechChange,
  onSearchChange,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== "all" || selectedTech !== "all" || searchQuery !== ""

  const clearFilters = () => {
    onCategoryChange("all")
    onTechChange("all")
    onSearchChange("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg"
    >
      <div className="space-y-5">
        {/* Search with glassmorphism */}
        <div className="relative max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg blur-sm -z-10" />
          <HugeiconsIcon 
            icon={Search01Icon} 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 pr-11 h-12 bg-background/80 border-border/50 rounded-lg focus:ring-2 focus:ring-primary/30 transition-all"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </motion.button>
          )}
        </div>

        {/* Filter sections */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Category filters */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Category</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7 text-muted-foreground hover:text-primary"
                >
                  Clear all
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-1.5 text-sm rounded-full capitalize transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "bg-muted/80 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-20 bg-border/50" />

          {/* Technology filters */}
          <div className="space-y-3 flex-1">
            <h3 className="text-sm font-semibold text-foreground">Technology</h3>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 10).map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTechChange(tech)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                      : "bg-muted/80 text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
              {technologies.length > 10 && (
                <span className="px-3 py-1.5 text-sm rounded-full bg-muted/50 text-muted-foreground/60">
                  +{technologies.length - 10} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
