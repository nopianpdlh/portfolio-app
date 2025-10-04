"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  getCertificates,
  deleteCertificate,
  toggleCertificatePublish,
  reorderCertificates,
} from "@/lib/actions/certificates"
import type { Certificate } from "@/types"

export default function CertificatesPage() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      const data = await getCertificates()
      setCertificates(data)
    } catch (error) {
      toast.error("Failed to load certificates")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return

    try {
      await deleteCertificate(id)
      toast.success("Certificate deleted")
      loadCertificates()
    } catch (error) {
      toast.error("Failed to delete certificate")
    }
  }

  const handleTogglePublish = async (id: string) => {
    try {
      await toggleCertificatePublish(id)
      toast.success("Certificate visibility updated")
      loadCertificates()
    } catch (error) {
      toast.error("Failed to update certificate")
    }
  }

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const isExpired = (date: Date | null | undefined) => {
    if (!date) return false
    return new Date(date) < new Date()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Certificates</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Manage your professional certifications and achievements
          </p>
        </div>
        <Button onClick={() => router.push("/admin/certificates/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6 mb-4">
              <svg
                className="h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">No certificates yet</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-4">
              Start by adding your first professional certification or achievement
            </p>
            <Button onClick={() => router.push("/admin/certificates/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Certificate
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="cursor-move">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <p className="text-muted-foreground">{cert.issuer}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!cert.isPublished && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                            Draft
                          </span>
                        )}
                        {cert.expiryDate && isExpired(cert.expiryDate) && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded-full">
                            Expired
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Issued:</span> {formatDate(cert.issueDate)}
                      </div>
                      {cert.expiryDate && (
                        <div>
                          <span className="font-medium">Expires:</span> {formatDate(cert.expiryDate)}
                        </div>
                      )}
                      {cert.credentialId && (
                        <div>
                          <span className="font-medium">ID:</span> {cert.credentialId}
                        </div>
                      )}
                    </div>

                    {cert.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {cert.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      {cert.credentialUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(cert.credentialUrl!, "_blank")}
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Verify
                        </Button>
                      )}
                      {cert.imageUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(cert.imageUrl!, "_blank")}
                        >
                          View Certificate
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTogglePublish(cert.id)}
                      title={cert.isPublished ? "Unpublish" : "Publish"}
                    >
                      {cert.isPublished ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/admin/certificates/${cert.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cert.id)}
                      className="hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
