"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Coffee01Icon, BulbIcon, Comment01Icon, Mail02Icon, TwitterIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { fadeIn, staggerContainer, staggerItem } from "@/lib/animations"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  const socialLinks = [
    {
      icon: Coffee01Icon,
      label: "Love coffee?",
      text: "Let's grab a cup sometime",
      href: "/contact",
    },
    {
      icon: BulbIcon,
      label: "Have an idea?",
      text: "Let's turn it into reality",
      href: "/contact",
    },
    {
      icon: Comment01Icon,
      label: "Just curious?",
      text: "Feel free to ask me anything",
      href: "/contact",
    },
  ]

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
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Let's get in touch.
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </motion.div>

          {/* Interactive Cards */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {socialLinks.map((item, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Link href={item.href} className="block group">
                  <div className="bg-background/5 border border-white/10 p-8 rounded-3xl h-full backdrop-blur-sm transition-all duration-300 group-hover:bg-background/10 group-hover:-translate-y-2">
                    <HugeiconsIcon icon={item.icon} size={40} className="mb-6 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-2">{item.label}</h3>
                    <p className="text-background/60">{item.text}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Direct Contact Links */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col md:flex-row gap-8 justify-center items-center border-t border-white/10 pt-12 text-lg"
          >
            <span className="text-background/60">Contact me via</span>
            
            <a href="mailto:nopian@example.com" className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
              <HugeiconsIcon icon={Mail02Icon} size={24} />
              <span>nopian@example.com</span>
            </a>
            
            <span className="hidden md:inline text-background/20">•</span>
            
            <a href="https://twitter.com/nopian" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
              <HugeiconsIcon icon={TwitterIcon} size={24} />
              <span>@nopian</span>
            </a>
          </motion.div>

          {/* Footer Attribution */}
          <motion.div variants={staggerItem} className="text-center mt-24 text-background/40 text-sm">
            <p>Made with Next.js and designed happily using Tailwind by Nopian</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
