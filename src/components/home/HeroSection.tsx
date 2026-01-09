"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, GithubIcon, Linkedin02Icon, Mail02Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { staggerContainer, staggerItem } from "@/lib/animations"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  settings: {
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
  } | null | undefined
}

export default function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1] mask-image-gradient" />
      
      {/* Gradient Mesh behind text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-50 dark:opacity-20 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center md:text-left"
        >
          {/* Main Heading */}
          <motion.h1
            variants={staggerItem}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-foreground"
          >
            {settings?.siteName ? settings.siteName.toLowerCase() : "nopian"}.
          </motion.h1>

          {/* Tagline / Description */}
          <motion.div variants={staggerItem} className="relative mb-12 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-muted-foreground">
              a <span className="text-highlight text-foreground">happy full-stack developer</span>{" "}
              who strives to help others grow in{" "}
              <span className="wavy-underline decoration-primary text-foreground">web development</span>
            </h2>
            
            {/* Playful Annotation */}
            <motion.div
              initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -5, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="hidden md:block absolute -bottom-16 right-20 text-sm font-mono text-primary rotate-[-6deg]"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">↖</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  specializing in Next.js & React
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats / Tech Stack Info */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col md:flex-row items-center gap-6 mt-16 md:mt-24"
          >
            <div className="flex items-center gap-4 text-lg text-muted-foreground p-6 bg-secondary/50 rounded-2xl border border-border/50 backdrop-blur-sm">
              <span className="font-bold text-4xl text-foreground">5+</span>
              <div className="flex flex-col leading-tight">
                <span>Years of</span>
                <span>Experience</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-sm md:text-left text-center">
              Building scalable applications with modern technologies like{" "}
              <strong className="text-foreground">Next.js</strong>,{" "}
              <strong className="text-foreground">TypeScript</strong>, and{" "}
              <strong className="text-foreground">Tailwind CSS</strong>.
            </p>
          </motion.div>

          {/* CTA & Socials */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-6 mt-12 items-center md:justify-start justify-center"
          >
            {/* Social Links */}
            <div className="flex gap-4">
              {settings?.github && (
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label="GitHub"
                >
                  <HugeiconsIcon icon={GithubIcon} size={24} />
                </a>
              )}
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <HugeiconsIcon icon={Linkedin02Icon} size={24} />
                </a>
              )}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label="Email"
                >
                  <HugeiconsIcon icon={Mail02Icon} size={24} />
                </a>
              )}
            </div>
            
            <div className="h-8 w-[1px] bg-border hidden sm:block" />

            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
              <Link href="/projects">
                View My Work
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <HugeiconsIcon icon={ArrowDown01Icon} size={32} />
      </motion.div>
    </section>
  )
}
