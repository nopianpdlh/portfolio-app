"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { fadeIn } from "@/lib/animations"

interface ContactInfoProps {
  settings: {
    email: string | null
    phone: string | null
    address: string | null
    github: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
  } | null | undefined
}

export default function ContactInfo({ settings }: ContactInfoProps) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Contact Details */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4">Contact Information</h3>
        <div className="space-y-4">
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-start gap-3 text-sm hover:text-primary transition-colors group"
            >
              <Mail className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{settings.email}</p>
              </div>
            </a>
          )}

          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-start gap-3 text-sm hover:text-primary transition-colors group"
            >
              <Phone className="w-5 h-5 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">{settings.phone}</p>
              </div>
            </a>
          )}

          {settings?.address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">{settings.address}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Social Links */}
      {(settings?.github || settings?.linkedin || settings?.twitter || settings?.instagram) && (
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Follow Me</h3>
          <div className="space-y-3">
            {settings.github && (
              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}

            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}

            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            )}

            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </Card>
      )}

      {/* Response Time */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold text-lg mb-2">Response Time</h3>
        <p className="text-sm text-muted-foreground">
          I typically respond within 24-48 hours during business days. For urgent inquiries, please
          email me directly.
        </p>
      </Card>
    </motion.div>
  )
}
