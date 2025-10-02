"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { settingsSchema, type SettingsFormData } from "@/lib/validations/settings"
import { updateSettings } from "@/lib/actions/settings"
import { Loader2, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface SettingsFormProps {
  settings: {
    id: string
    siteName: string
    siteTagline: string | null
    siteDescription: string | null
    resumeUrl: string | null
    email: string | null
    phone: string | null
    address: string | null
    github: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
  }
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: settings.siteName || "",
      siteTagline: settings.siteTagline || "",
      siteDescription: settings.siteDescription || "",
      resumeUrl: settings.resumeUrl || "",
      email: settings.email || "",
      phone: settings.phone || "",
      address: settings.address || "",
      github: settings.github || "",
      linkedin: settings.linkedin || "",
      twitter: settings.twitter || "",
      instagram: settings.instagram || "",
    },
  })

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true)
    try {
      await updateSettings(data)
      toast.success("Settings updated successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update settings. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Site Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Site Information</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteName">
            Site Name <span className="text-red-500">*</span>
          </Label>
          <Input id="siteName" {...register("siteName")} placeholder="My Portfolio" />
          {errors.siteName && <p className="text-sm text-red-500">{String(errors.siteName.message)}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteTagline">Site Tagline</Label>
          <Input id="siteTagline" {...register("siteTagline")} placeholder="Full Stack Developer" />
          {errors.siteTagline && <p className="text-sm text-red-500">{String(errors.siteTagline.message)}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            {...register("siteDescription")}
            placeholder="A brief description of your portfolio..."
            rows={4}
          />
          {errors.siteDescription && (
            <p className="text-sm text-red-500">{String(errors.siteDescription.message)}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Contact Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} type="email" placeholder="your@email.com" />
            {errors.email && <p className="text-sm text-red-500">{String(errors.email.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} placeholder="+62 123 4567 890" />
            {errors.phone && <p className="text-sm text-red-500">{String(errors.phone.message)}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Location/Address</Label>
          <Input id="address" {...register("address")} placeholder="City, Country" />
          {errors.address && <p className="text-sm text-red-500">{String(errors.address.message)}</p>}
        </div>
      </div>

      <Separator />

      {/* Social Links */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" {...register("github")} placeholder="https://github.com/username" />
            {errors.github && <p className="text-sm text-red-500">{String(errors.github.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/username" />
            {errors.linkedin && <p className="text-sm text-red-500">{String(errors.linkedin.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter/X</Label>
            <Input id="twitter" {...register("twitter")} placeholder="https://twitter.com/username" />
            {errors.twitter && <p className="text-sm text-red-500">{String(errors.twitter.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" {...register("instagram")} placeholder="https://instagram.com/username" />
            {errors.instagram && <p className="text-sm text-red-500">{String(errors.instagram.message)}</p>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Resume */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Resume/CV</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="resumeUrl">Resume URL</Label>
          <Input
            id="resumeUrl"
            {...register("resumeUrl")}
            placeholder="https://example.com/resume.pdf or /uploads/resume.pdf"
          />
          {errors.resumeUrl && <p className="text-sm text-red-500">{String(errors.resumeUrl.message)}</p>}
          <p className="text-sm text-gray-500">
            Provide a direct link to your resume PDF or upload file path
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {!isSubmitting && <Save className="w-4 h-4 mr-2" />}
          Save Settings
        </Button>
      </div>
    </form>
  )
}
