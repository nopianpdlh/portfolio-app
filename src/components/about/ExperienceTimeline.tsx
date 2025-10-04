"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface Experience {
  id: string
  title: string
  company: string | null
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  description: string | null
  order: number
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return null
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  if (experiences.length === 0) {
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the roles I've held
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div key={exp.id} variants={staggerItem}>
                  <Card className="p-6 md:ml-20 hover:shadow-lg transition-shadow">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block" />

                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          {exp.company && (
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{exp.company}</span>
                            </div>
                          )}
                        </div>
                        {exp.isCurrent && (
                          <Badge className="w-fit">Current</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
