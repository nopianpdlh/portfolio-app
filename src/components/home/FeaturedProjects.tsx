"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Rocket01Icon, LinkSquare01Icon, GithubIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { getPublishedProjects } from "@/lib/actions/public"
import { staggerContainer, staggerItem } from "@/lib/animations"
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
        // Show only featured projects, limit to 4
        const featured = result.data.filter((p) => p.isFeatured).slice(0, 4)
        setProjects(featured)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
             <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
             <div className="h-10 w-64 bg-muted rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-[500px] bg-muted rounded-3xl animate-pulse" />
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
    <section className="py-24 bg-background relative overflow-hidden" id="projects">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-secondary/30 to-transparent opacity-50 blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <HugeiconsIcon icon={Rocket01Icon} size={32} className="text-primary animate-bounce" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Highlighted Projects
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                A selection of my favorite works, ranging from web applications to open source tools.
              </p>
            </div>

            <Button asChild variant="ghost" className="group hidden md:inline-flex">
              <Link href="/projects" className="text-lg">
                View All Projects
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={staggerItem}>
              <Card className="group relative overflow-hidden rounded-[2rem] border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                
                {/* Project Image Area */}
                <div className="relative aspect-[16/10] overflow-hidden m-4 mb-0 rounded-t-2xl rounded-b-lg shadow-sm group-hover:shadow-md transition-shadow">
                  {project.images[0] ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                      <span className="text-6xl font-bold text-muted-foreground/10 select-none">
                        {project.title[0]}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        {project.category && (
                           <span className="text-sm font-medium text-primary mb-2 block tracking-wide uppercase">
                            {project.category}
                          </span>
                        )}
                        <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-background border hover:border-primary hover:text-primary transition-colors"
                            aria-label="View Code"
                          >
                            <HugeiconsIcon icon={GithubIcon} size={20} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            aria-label="View Live Project"
                          >
                            <HugeiconsIcon icon={LinkSquare01Icon} size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="font-normal text-sm px-3 py-1 bg-background/50 backdrop-blur-sm border-border/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs px-2">
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center">
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/projects">
                View All Projects
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2" />
              </Link>
            </Button>
        </div>
      </div>
    </section>
  )
}
