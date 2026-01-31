"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { LinkSquare01Icon, GithubIcon, StarIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProjectListItem } from "@/types/project"


interface FeaturedProjectCardProps {
  project: ProjectListItem
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <Card 
      onClick={handleCardClick}
      className="group relative overflow-hidden cursor-pointer h-full min-h-[400px] border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500 bg-card"
    >
      {/* Gradient Border Glow Effect */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 h-56 lg:h-auto overflow-hidden">
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/5">
              <span className="text-8xl font-bold text-muted-foreground/20">
                {project.title[0]}
              </span>
            </div>
          )}

          {/* Featured Badge with Glow */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-shadow">
              <HugeiconsIcon icon={StarIcon} size={14} className="mr-1" />
              Featured
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Category */}
            {project.category && (
              <Badge variant="outline" className="mb-3 capitalize text-xs">
                {project.category}
              </Badge>
            )}

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 line-clamp-3 lg:line-clamp-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[...project.techStack, ...project.programmingLanguages]
                .slice(0, 6)
                .map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs bg-primary/10 rounded-full text-primary font-medium"
                  >
                    {tech}
                  </span>
                ))}
              {project.techStack.length + project.programmingLanguages.length > 6 && (
                <span className="px-3 py-1.5 text-xs bg-muted rounded-full text-muted-foreground">
                  +{project.techStack.length + project.programmingLanguages.length - 6}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              size="sm" 
              className="group/btn"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/projects/${project.slug}`)
              }}
            >
              View Details
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex gap-2">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                >
                  <HugeiconsIcon icon={LinkSquare01Icon} size={18} className="text-muted-foreground" />
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                >
                  <HugeiconsIcon icon={GithubIcon} size={18} className="text-muted-foreground" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
