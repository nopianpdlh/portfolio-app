"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateStatusSettings } from "@/lib/actions/settings"
import { Loader2, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Validation schema
const statusStatsSchema = z.object({
  availabilityStatus: z.enum(["available", "busy", "unavailable"]),
  currentActivity: z.string().min(1, "Current activity is required"),
  openToOpportunities: z.boolean(),
  yearsOfExperience: z.number().int().positive().optional().or(z.literal(null)).optional(),
  customStatLabel1: z.string().optional().or(z.literal(null)).optional(),
  customStatValue1: z.string().optional().or(z.literal(null)).optional(),
  customStatLabel2: z.string().optional().or(z.literal(null)).optional(),
  customStatValue2: z.string().optional().or(z.literal(null)).optional(),
  customStatLabel3: z.string().optional().or(z.literal(null)).optional(),
  customStatValue3: z.string().optional().or(z.literal(null)).optional(),
})

type StatusStatsFormData = z.infer<typeof statusStatsSchema>

interface StatusStatsFormProps {
  settings: any
}

export default function StatusStatsForm({ settings }: StatusStatsFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StatusStatsFormData>({
    resolver: zodResolver(statusStatsSchema),
    defaultValues: {
      availabilityStatus: settings.availabilityStatus || "available",
      currentActivity: settings.currentActivity || "Building cool stuff",
      openToOpportunities: settings.openToOpportunities ?? true,
      yearsOfExperience: settings.yearsOfExperience,
      customStatLabel1: settings.customStatLabel1,
      customStatValue1: settings.customStatValue1,
      customStatLabel2: settings.customStatLabel2,
      customStatValue2: settings.customStatValue2,
      customStatLabel3: settings.customStatLabel3,
      customStatValue3: settings.customStatValue3,
    },
  })

  const availabilityStatus = watch("availabilityStatus")
  const openToOpportunities = watch("openToOpportunities")

  const onSubmit = async (data: StatusStatsFormData) => {
    setIsSubmitting(true)
    try {
      // Convert empty strings to null
      const cleanedData = {
        ...data,
        yearsOfExperience: data.yearsOfExperience || null,
        customStatLabel1: data.customStatLabel1 || null,
        customStatValue1: data.customStatValue1 || null,
        customStatLabel2: data.customStatLabel2 || null,
        customStatValue2: data.customStatValue2 || null,
        customStatLabel3: data.customStatLabel3 || null,
        customStatValue3: data.customStatValue3 || null,
      }

      await updateStatusSettings(cleanedData)
      toast.success("Status & Stats updated successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status & stats. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Status Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Status</h3>
          <p className="text-sm text-muted-foreground">
            Manage your availability status and current activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="availabilityStatus">
              Availability Status <span className="text-red-500">*</span>
            </Label>
            <Select
              value={availabilityStatus}
              onValueChange={(value) =>
                setValue("availabilityStatus", value as "available" | "busy" | "unavailable")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Available for Work
                  </div>
                </SelectItem>
                <SelectItem value="busy">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    Currently Busy
                  </div>
                </SelectItem>
                <SelectItem value="unavailable">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    Not Available
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.availabilityStatus && (
              <p className="text-sm text-red-500">{String(errors.availabilityStatus.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentActivity">
              Current Activity <span className="text-red-500">*</span>
            </Label>
            <Input
              id="currentActivity"
              {...register("currentActivity")}
              placeholder="Building cool stuff"
            />
            {errors.currentActivity && (
              <p className="text-sm text-red-500">{String(errors.currentActivity.message)}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="space-y-0.5">
            <Label htmlFor="openToOpportunities">Open to Opportunities</Label>
            <p className="text-sm text-muted-foreground">
              Show that you're open to new job opportunities
            </p>
          </div>
          <Switch
            id="openToOpportunities"
            checked={openToOpportunities}
            onCheckedChange={(checked) => setValue("openToOpportunities", checked)}
          />
        </div>
      </div>

      <Separator />

      {/* Quick Stats Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <p className="text-sm text-muted-foreground">
            Stats are auto-calculated from your projects, skills, and experience. You can override years of
            experience or add custom statistics.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience (Override)</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            {...register("yearsOfExperience")}
            placeholder="Leave empty for auto-calculation"
          />
          {errors.yearsOfExperience && (
            <p className="text-sm text-red-500">{String(errors.yearsOfExperience.message)}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Leave empty to auto-calculate from your earliest experience start date
          </p>
        </div>
      </div>

      <Separator />

      {/* Custom Stats */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Custom Statistics (Optional)</h3>
          <p className="text-sm text-muted-foreground">
            Add up to 3 custom statistics to display on your About page
          </p>
        </div>

        {/* Custom Stat 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="customStatLabel1">Custom Stat 1 - Label</Label>
            <Input
              id="customStatLabel1"
              {...register("customStatLabel1")}
              placeholder="e.g., Awards Won"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customStatValue1">Custom Stat 1 - Value</Label>
            <Input
              id="customStatValue1"
              {...register("customStatValue1")}
              placeholder="e.g., 5"
            />
          </div>
        </div>

        {/* Custom Stat 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="customStatLabel2">Custom Stat 2 - Label</Label>
            <Input
              id="customStatLabel2"
              {...register("customStatLabel2")}
              placeholder="e.g., Happy Clients"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customStatValue2">Custom Stat 2 - Value</Label>
            <Input
              id="customStatValue2"
              {...register("customStatValue2")}
              placeholder="e.g., 50+"
            />
          </div>
        </div>

        {/* Custom Stat 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="customStatLabel3">Custom Stat 3 - Label</Label>
            <Input
              id="customStatLabel3"
              {...register("customStatLabel3")}
              placeholder="e.g., Lines of Code"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customStatValue3">Custom Stat 3 - Value</Label>
            <Input
              id="customStatValue3"
              {...register("customStatValue3")}
              placeholder="e.g., 100K+"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {!isSubmitting && <Save className="w-4 h-4 mr-2" />}
          Save Status & Stats
        </Button>
      </div>
    </form>
  )
}
