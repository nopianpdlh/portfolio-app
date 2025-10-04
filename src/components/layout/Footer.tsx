"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

interface FooterProps {
  settings?: {
    email: string | null
    github: string | null
    linkedin: string | null
    twitter: string | null
    instagram: string | null
  } | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              >
                Portfolio
              </motion.span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Crafting beautiful and functional web experiences with modern technologies.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {settings?.github && (
                <motion.a
                  href={settings.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {settings?.linkedin && (
                <motion.a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              )}
              {settings?.twitter && (
                <motion.a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              )}
              {settings?.instagram && (
                <motion.a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
              )}
              {settings?.email && (
                <motion.a
                  href={`mailto:${settings.email}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-md bg-background hover:bg-muted transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2">
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary hover:underline"
                >
                  Send me a message →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
