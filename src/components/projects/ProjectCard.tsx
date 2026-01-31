"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { LinkSquare01Icon, GithubIcon } from "@hugeicons/core-free-icons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ProjectListItem } from "@/types/project"


interface ProjectCardProps {
  project: ProjectListItem
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full perspective-1000"
    >
      <Card 
        onClick={handleCardClick}
        className="relative overflow-hidden h-full flex flex-col group cursor-pointer border border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-500 bg-card"
      >
        {/* Gradient Border Glow - appears on hover */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/40 via-primary/10 to-primary/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        {/* Project Image */}
        <div className="relative h-48 bg-muted overflow-hidden">
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-6xl font-bold text-muted-foreground/20">
                {project.title[0]}
              </span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <div className="flex gap-2">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                >
                  <HugeiconsIcon icon={LinkSquare01Icon} size={18} className="text-white" />
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                >
                  <HugeiconsIcon icon={GithubIcon} size={18} className="text-white" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Category */}
          {project.category && (
            <Badge variant="outline" className="w-fit mb-2.5 capitalize text-xs">
              {project.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack - styled as pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {[...project.techStack, ...project.programmingLanguages]
              .slice(0, 3)
              .map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-primary/10 rounded-full text-primary/80 font-medium"
                >
                  {tech}
                </span>
              ))}
            {project.techStack.length + project.programmingLanguages.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground">
                +{project.techStack.length + project.programmingLanguages.length - 3}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
