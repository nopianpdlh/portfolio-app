"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { createCertificate } from "@/lib/actions/certificates"
import { createCertificateSchema } from "@/lib/validations/certificate"
import type { z } from "zod"

type FormData = z.infer<typeof createCertificateSchema>

export default function NewCertificatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createCertificateSchema),
    defaultValues: {
      isPublished: true,
    },
  })

  const isPublished = watch("isPublished")

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const result = await createCertificate(data)
      if (result.success) {
        toast.success("Certificate created successfully")
        router.push("/admin/certificates")
      } else {
        toast.error("Failed to create certificate")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Certificate</h1>
          <p className="text-muted-foreground mt-1">
            Add a professional certification or achievement
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Certificate Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., AWS Certified Solutions Architect"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">
                Issuing Organization <span className="text-destructive">*</span>
              </Label>
              <Input
                id="issuer"
                {...register("issuer")}
                placeholder="e.g., Amazon Web Services"
                className={errors.issuer ? "border-destructive" : ""}
              />
              {errors.issuer && (
                <p className="text-sm text-destructive">{errors.issuer.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  {...register("issueDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  {...register("expiryDate")}
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank if certificate doesn't expire
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of the certification and what it covers..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credential Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="credentialId">Credential ID (Optional)</Label>
              <Input
                id="credentialId"
                {...register("credentialId")}
                placeholder="e.g., ABC123XYZ456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Verification URL (Optional)</Label>
              <Input
                id="credentialUrl"
                type="url"
                {...register("credentialUrl")}
                placeholder="https://verify.example.com/certificates/..."
                className={errors.credentialUrl ? "border-destructive" : ""}
              />
              {errors.credentialUrl && (
                <p className="text-sm text-destructive">{errors.credentialUrl.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Link where visitors can verify the certificate
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Certificate Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                {...register("imageUrl")}
                placeholder="https://example.com/certificates/image.jpg"
                className={errors.imageUrl ? "border-destructive" : ""}
              />
              {errors.imageUrl && (
                <p className="text-sm text-destructive">{errors.imageUrl.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                URL to certificate image/scan (upload to Supabase Storage first)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isPublished">Publish Certificate</Label>
                <p className="text-sm text-muted-foreground">
                  Make this certificate visible on your portfolio
                </p>
              </div>
              <Switch
                id="isPublished"
                checked={isPublished}
                onCheckedChange={(checked) => setValue("isPublished", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Certificate
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
