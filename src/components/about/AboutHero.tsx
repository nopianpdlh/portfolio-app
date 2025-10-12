"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeIn, slideUp } from "@/lib/animations"

interface AboutHeroProps {
  settings: {
    resumeUrl: string | null
  } | null | undefined
}

export default function AboutHero({ settings }: AboutHeroProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeIn}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            About Me
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Crafting Digital Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
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
              <Button asChild size="lg">
                <a href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
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
