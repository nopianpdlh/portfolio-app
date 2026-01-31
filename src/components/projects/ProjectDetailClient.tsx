"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, LinkSquare01Icon, GithubIcon, Calendar03Icon, CodeIcon, Idea01Icon, Target01Icon, AnalyticsUpIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProjectDetail } from "@/types/project"


interface ProjectDetailClientProps {
  project: ProjectDetail
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-2" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {project.category && (
            <Badge variant="secondary" className="mb-4 capitalize">
              {project.category}
            </Badge>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={LinkSquare01Icon} size={16} className="mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={GithubIcon} size={16} className="mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Main image gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {project.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main image */}
              <div className="md:col-span-2 relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} - Main screenshot`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Additional images */}
              {project.images.slice(1, 3).map((image, index) => (
                <div key={index} className="relative h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} - Screenshot ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[400px] rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-9xl font-bold text-muted-foreground/20">
                {project.title[0]}
              </span>
            </div>
          )}
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.dateCompleted && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <HugeiconsIcon icon={Calendar03Icon} size={16} />
                      <span>
                        Completed: {new Date(project.dateCompleted).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="challenges" className="mt-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <HugeiconsIcon icon={Idea01Icon} size={20} className="text-primary" />
                      <h2 className="text-2xl font-bold">Challenges</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.challenges || "No challenges documented for this project."}
                    </p>
                  </div>

                  <Separator />

                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <HugeiconsIcon icon={Target01Icon} size={20} className="text-primary" />
                      <h2 className="text-2xl font-bold">Solutions</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.solutions || "No solutions documented for this project."}
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="results" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <HugeiconsIcon icon={AnalyticsUpIcon} size={20} className="text-primary" />
                    <h2 className="text-2xl font-bold">Metrics & Results</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.metrics || "No metrics documented for this project."}
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HugeiconsIcon icon={CodeIcon} size={20} className="text-primary" />
                <h3 className="font-bold">Tech Stack</h3>
              </div>
              <div className="space-y-4">
                {project.techStack.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {project.programmingLanguages.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {project.programmingLanguages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <HugeiconsIcon icon={LinkSquare01Icon} size={16} />
                    <span>Live Website</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <HugeiconsIcon icon={GithubIcon} size={16} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold mb-2">Interested in this project?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let's discuss how I can help with your next project.
              </p>
              <Button asChild className="w-full">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
