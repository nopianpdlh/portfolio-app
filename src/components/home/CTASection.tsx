"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Coffee01Icon, BulbIcon, Comment01Icon, Mail02Icon, TwitterIcon, ArrowRight01Icon, Linkedin01Icon } from "@hugeicons/core-free-icons"
import { fadeIn, staggerContainer, staggerItem } from "@/lib/animations"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Let's work together.
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto leading-relaxed">
              I'm currently open for <span className="text-primary font-medium">internship</span>, <span className="text-primary font-medium">freelance projects</span>, or <span className="text-primary font-medium">full-time opportunities</span>. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </motion.div>

          {/* Direct Contact Links */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="mailto:novianfadhilah03@gmail.com" className="flex items-center gap-2">
                <HugeiconsIcon icon={Mail02Icon} size={24} />
                <span>Email Me</span>
              </a>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-lg rounded-full border-white/20 hover:bg-white/10 text-background bg-transparent transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                <HugeiconsIcon icon={Comment01Icon} size={24} />
                <span>Contact Form</span>
              </Link>
            </Button>
          </motion.div>

          {/* Social Links (Simplified) */}
          <motion.div 
            variants={staggerItem}
            className="flex gap-8 justify-center items-center text-lg text-background/60"
          >
             <a href="https://github.com/nopianpdlh" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 duration-200">
              <span className="sr-only">GitHub</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/nopianpdlh/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110 duration-200">
              <span className="sr-only">LinkedIn</span>
              <HugeiconsIcon icon={Linkedin01Icon} size={32} />
            </a>
            {/* Add LinkedIn if available */}
          </motion.div>

          {/* Footer Attribution - Consider moving to a separate Footer component */}
          <motion.div variants={staggerItem} className="text-center mt-24 text-background/40 text-sm">
            {/* <p>Made with Next.js and designed happily using Tailwind by Nopian</p> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
