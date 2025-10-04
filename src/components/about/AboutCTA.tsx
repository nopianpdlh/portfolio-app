"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AboutCTAProps {
  settings: {
    email: string | null
  } | null | undefined
}

export default function AboutCTA({ settings }: AboutCTAProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Build Something Amazing</h2>

          <p className="text-lg text-muted-foreground mb-8">
            I'm always interested in hearing about new projects and opportunities. Whether you have a
            question or just want to say hi, feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>

            {settings?.email && (
              <Button asChild size="lg" variant="outline">
                <a href={`mailto:${settings.email}`}>Send Email</a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
