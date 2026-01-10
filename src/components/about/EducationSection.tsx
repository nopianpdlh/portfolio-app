"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { GraduationScrollIcon, Calendar03Icon, Location01Icon, Award01Icon, BookOpen01Icon } from "@hugeicons/core-free-icons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface Education {
  id: string
  institution: string
  degree: string
  field: string | null
  startDate: Date | null
  endDate: Date | null
  isCurrent: boolean
  grade: string | null
  description: string | null
  location: string | null
  order: number
}

interface EducationSectionProps {
  educations: Education[]
}

export default function EducationSection({ educations }: EducationSectionProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return null
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  if (educations.length === 0) {
    return null
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black dark:bg-grid-small-white -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic background and educational journey
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-border hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-12">
              {educations.map((edu, index) => (
                <motion.div key={edu.id} variants={staggerItem}>
                  <Card className="group p-8 md:ml-20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50 hover:border-primary/20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 -translate-x-1.5 rounded-full bg-primary ring-4 ring-background hidden md:block group-hover:scale-110 transition-transform" />

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                              <HugeiconsIcon icon={GraduationScrollIcon} size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                                {edu.degree}
                              </h3>
                              {edu.field && (
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                  <HugeiconsIcon icon={BookOpen01Icon} size={16} />
                                  <span className="font-medium">{edu.field}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground ml-[3.25rem]">
                            <HugeiconsIcon icon={Award01Icon} size={16} />
                            <span className="font-semibold">{edu.institution}</span>
                          </div>
                        </div>

                        {edu.isCurrent && (
                          <Badge className="w-fit shrink-0 bg-green-500 hover:bg-green-600">
                            Currently Studying
                          </Badge>
                        )}
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground ml-[3.25rem] bg-secondary/50 p-3 rounded-xl w-fit">
                        {/* Date Range */}
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon icon={Calendar03Icon} size={16} />
                          <span>
                            {formatDate(edu.startDate)} -{" "}
                            {edu.isCurrent ? (
                              <span className="font-semibold text-green-600">Present</span>
                            ) : (
                              formatDate(edu.endDate)
                            )}
                          </span>
                        </div>

                        {/* Grade */}
                        {edu.grade && (
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={Award01Icon} size={16} />
                            <span className="font-medium">Grade: {edu.grade}</span>
                          </div>
                        )}

                        {/* Location */}
                        {edu.location && (
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={Location01Icon} size={16} />
                            <span>{edu.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {edu.description && (
                        <div className="ml-[3.25rem] pt-4 border-t border-border/50">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
                            {edu.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education Stats */}
        {educations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">{educations.length}</div>
              <div className="text-sm font-medium text-muted-foreground">
                {educations.length === 1 ? "Degree" : "Degrees"}
              </div>
            </div>
            {educations.some((e) => e.isCurrent) && (
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {educations.filter((e) => e.isCurrent).length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">Currently Pursuing</div>
              </div>
            )}
            {educations.some((e) => e.grade) && (
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {educations.filter((e) => e.grade).length}
                </div>
                <div className="text-sm font-medium text-muted-foreground">With Honors</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
