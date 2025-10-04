"use client"

import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
      className="space-y-6"
    >
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Category</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs h-8"
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer capitalize hover:bg-primary/20 transition-colors"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Technology filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Technology</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 10).map((tech) => (
            <Badge
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => onTechChange(tech)}
            >
              {tech}
            </Badge>
          ))}
          {technologies.length > 10 && (
            <Badge variant="secondary" className="cursor-default">
              +{technologies.length - 10} more
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  )
}
