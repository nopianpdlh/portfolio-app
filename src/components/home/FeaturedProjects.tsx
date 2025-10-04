"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { getPublishedProjects } from "@/lib/actions/public"
import { staggerContainer, staggerItem, hoverLift } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  description: string
  images: string[]
  liveUrl: string | null
  repoUrl: string | null
  techStack: string[]
  category: string | null
  isFeatured: boolean
  slug: string
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const result = await getPublishedProjects()
      if (result.success && result.data) {
        // Show only featured projects, limit to 3
        const featured = result.data.filter((p) => p.isFeatured).slice(0, 3)
        setProjects(featured)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for development
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <motion.div whileHover="hover">
                <Card className="overflow-hidden h-full flex flex-col group cursor-pointer">
                  {/* Project Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    {project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <span className="text-4xl font-bold text-muted-foreground/20">
                          {project.title[0]}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    {project.category && (
                      <Badge variant="secondary" className="w-fit mb-3">
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-auto">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
