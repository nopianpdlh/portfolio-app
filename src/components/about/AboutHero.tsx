"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Download01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { fadeIn, slideUp } from "@/lib/animations"

interface AboutHeroProps {
  settings: {
    resumeUrl: string | null
  } | null | undefined
}

export default function AboutHero({ settings }: AboutHeroProps) {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.1] mask-image-gradient" />
      
      {/* Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-50 dark:opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter"
          >
            Crafting Digital <br/>
            <span className="text-primary">Experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            I'm a passionate full-stack developer with a love for creating beautiful, functional, and
            user-centered digital experiences. With expertise across the entire development stack, I
            bring ideas to life through clean code and thoughtful design.
          </motion.p>

          {settings?.resumeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <a href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={Download01Icon} size={20} className="mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
