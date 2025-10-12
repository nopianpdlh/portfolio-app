"use client"

import { motion } from "framer-motion"
import { fadeIn, slideUp } from "@/lib/animations"

export default function ProjectsHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="text-center mb-12"
    >
      <motion.div
        variants={fadeIn}
        className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
      >
        Portfolio
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
      >
        My Projects
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        A collection of my work showcasing web applications, creative projects, and technical solutions
      </motion.p>
    </motion.div>
  )
}
