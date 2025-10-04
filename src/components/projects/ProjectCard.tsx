"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ExternalLink, Github, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`)
  }

  return (
    <Card 
      onClick={handleCardClick}
      className="overflow-hidden h-full flex flex-col group cursor-pointer hover:shadow-xl transition-all duration-300"
    >
        {/* Project Image */}
        <div className="relative h-56 bg-muted overflow-hidden">
          {project.images[0] ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-6xl font-bold text-muted-foreground/20">
                {project.title[0]}
              </span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="flex gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-white" />
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
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Featured badge */}
          {project.isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          {project.category && (
            <Badge variant="secondary" className="w-fit mb-3 capitalize">
              {project.category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {[...project.techStack, ...project.programmingLanguages]
              .slice(0, 4)
              .map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            {project.techStack.length + project.programmingLanguages.length > 4 && (
              <span className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground">
                +
                {project.techStack.length +
                  project.programmingLanguages.length -
                  4}
              </span>
            )}
          </div>
        </div>
      </Card>
  )
}
