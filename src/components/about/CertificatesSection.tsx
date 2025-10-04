"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, CalendarCheck, CalendarX, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { staggerContainer, staggerItem } from "@/lib/animations"
import Image from "next/image"

interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: Date | null
  expiryDate: Date | null
  credentialId: string | null
  credentialUrl: string | null
  description: string | null
  imageUrl: string | null
  order: number
}

interface CertificatesSectionProps {
  certificates: Certificate[]
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return null
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  const isExpired = (expiryDate: Date | null) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  const isExpiringSoon = (expiryDate: Date | null) => {
    if (!expiryDate) return false
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    const expiry = new Date(expiryDate)
    return expiry > new Date() && expiry < threeMonthsFromNow
  }

  if (certificates.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials I've earned throughout my career
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => {
            const expired = isExpired(cert.expiryDate)
            const expiringSoon = isExpiringSoon(cert.expiryDate)

            return (
              <motion.div key={cert.id} variants={staggerItem}>
                <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  {/* Certificate Image */}
                  {cert.imageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Award className="w-20 h-20 text-primary/40" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Header with Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {cert.name}
                      </h3>
                      {expired ? (
                        <Badge variant="destructive" className="shrink-0">
                          <CalendarX className="w-3 h-3 mr-1" />
                          Expired
                        </Badge>
                      ) : expiringSoon ? (
                        <Badge variant="outline" className="shrink-0 border-yellow-500 text-yellow-600">
                          <CalendarCheck className="w-3 h-3 mr-1" />
                          Expiring
                        </Badge>
                      ) : cert.expiryDate ? (
                        <Badge variant="outline" className="shrink-0 border-green-500 text-green-600">
                          <Shield className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      ) : null}
                    </div>

                    {/* Issuer */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">{cert.issuer}</span>
                    </div>

                    {/* Dates */}
                    <div className="space-y-1 text-sm mb-4">
                      {cert.issueDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarCheck className="w-4 h-4" />
                          <span>Issued: {formatDate(cert.issueDate)}</span>
                        </div>
                      )}
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarX className="w-4 h-4" />
                          <span className={expired ? "text-red-500" : ""}>
                            Expires: {formatDate(cert.expiryDate)}
                          </span>
                        </div>
                      )}
                      {!cert.expiryDate && cert.issueDate && (
                        <p className="text-xs text-muted-foreground italic">No expiration</p>
                      )}
                    </div>

                    {/* Description */}
                    {cert.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <div className="text-xs text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">
                        <span className="font-semibold">ID:</span> {cert.credentialId}
                      </div>
                    )}

                    {/* Action Button */}
                    {cert.credentialUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Shield className="w-4 h-4" />
                          Verify Certificate
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats */}
        {certificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{certificates.length}</div>
              <div className="text-sm text-muted-foreground">Total Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {certificates.filter((c) => !isExpired(c.expiryDate)).length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            {certificates.some((c) => !c.expiryDate) && (
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {certificates.filter((c) => !c.expiryDate).length}
                </div>
                <div className="text-sm text-muted-foreground">No Expiration</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
