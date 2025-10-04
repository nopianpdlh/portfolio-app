"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react"
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <motion.div key={edu.id} variants={staggerItem}>
                  <Card className="group p-6 md:ml-20 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-5 h-5 rounded-full bg-primary border-4 border-background hidden md:block group-hover:scale-125 transition-transform" />

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                              <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                {edu.degree}
                              </h3>
                              {edu.field && (
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span className="font-medium">{edu.field}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground ml-14">
                            <Award className="w-4 h-4" />
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
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground ml-14">
                        {/* Date Range */}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
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
                            <Award className="w-4 h-4" />
                            <span className="font-medium">Grade: {edu.grade}</span>
                          </div>
                        )}

                        {/* Location */}
                        {edu.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {edu.description && (
                        <div className="ml-14 pt-2 border-t border-border">
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
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
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{educations.length}</div>
              <div className="text-sm text-muted-foreground">
                {educations.length === 1 ? "Degree" : "Degrees"}
              </div>
            </div>
            {educations.some((e) => e.isCurrent) && (
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {educations.filter((e) => e.isCurrent).length}
                </div>
                <div className="text-sm text-muted-foreground">Currently Pursuing</div>
              </div>
            )}
            {educations.some((e) => e.grade) && (
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {educations.filter((e) => e.grade).length}
                </div>
                <div className="text-sm text-muted-foreground">With Honors</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
