"use client"

import { motion } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { Rocket01Icon, SparklesIcon } from "@hugeicons/core-free-icons"

export default function ProjectsHeader() {
  return (
    <div className="relative mb-16">
      {/* Decorative floating elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        className="absolute -top-4 right-10 md:right-20 text-primary/30"
      >
        <HugeiconsIcon icon={SparklesIcon} size={48} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
        className="absolute top-20 -left-4 md:left-10 text-primary/20"
      >
        <HugeiconsIcon icon={Rocket01Icon} size={36} />
      </motion.div>

      {/* Main content - Asymmetric layout */}
      <div className="text-left md:text-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Portfolio
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          My{" "}
          <span className="relative">
            <span className="text-primary">Projects</span>
            {/* Underline decoration */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 8 Q 50 2, 100 6 T 198 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-primary/40"
                fill="none"
              />
            </motion.svg>
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl md:mx-auto leading-relaxed"
        >
          A collection of my work showcasing{" "}
          <span className="text-foreground font-medium">web applications</span>,{" "}
          <span className="text-foreground font-medium">creative projects</span>, and{" "}
          <span className="text-foreground font-medium">technical solutions</span>
        </motion.p>

        {/* Playful annotation */}
        <motion.div
          initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
          animate={{ opacity: 1, rotate: -6, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="hidden md:block absolute -bottom-8 right-20 lg:right-40 text-sm font-mono text-primary"
        >
          {/* <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">↙</span>
            <span className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              built with ❤️ & modern tech
            </span>
          </div> */}
        </motion.div>
      </div>
    </div>
  )
}
