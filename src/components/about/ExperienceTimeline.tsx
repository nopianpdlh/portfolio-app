"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Briefcase02Icon, Calendar03Icon } from "@hugeicons/core-free-icons"
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div key={exp.id} variants={staggerItem}>
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 -translate-x-1.5 rounded-full bg-primary ring-4 ring-background hidden md:block" />
                    
                    <Card className="p-8 md:ml-20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20 group">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            {exp.company && (
                              <div className="flex items-center gap-2 text-muted-foreground mt-2 font-medium">
                                <HugeiconsIcon icon={Briefcase02Icon} size={18} />
                                <span>{exp.company}</span>
                              </div>
                            )}
                          </div>
                          {exp.isCurrent && (
                            <Badge className="w-fit bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                              Current Role
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 w-fit px-3 py-1 rounded-full">
                          <HugeiconsIcon icon={Calendar03Icon} size={16} />
                          <span>
                            {formatDate(exp.startDate)} -{" "}
                            {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                          </span>
                        </div>

                        {exp.description && (
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base border-t border-border/50 pt-4 mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
