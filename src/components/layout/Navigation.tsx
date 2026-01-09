"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, Cancel01Icon, Home01Icon, Rocket01Icon, UserCircleIcon, Mail01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home", icon: Home01Icon },
  { href: "/projects", label: "Projects", icon: Rocket01Icon },
  { href: "/about", label: "About", icon: UserCircleIcon },
  { href: "/contact", label: "Contact", icon: Mail01Icon },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <nav className="pointer-events-auto flex items-center justify-between gap-2 p-2 rounded-full border border-white/20 bg-white/50 dark:bg-black/50 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 max-w-2xl w-full sm:w-auto sm:min-w-[400px]">
          
          {/* Logo (Mobile Only or Left Side) */}
          <Link href="/" className="flex items-center px-4 sm:hidden">
            <span className="font-bold text-lg tracking-tight">nopian.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-1 mx-auto">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navBubble"
                      className="absolute inset-0 bg-white dark:bg-white/10 rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
          >
            {isOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} size={24} />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} size={24} />
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-b z-40 sm:hidden pt-24 pb-8 px-6 shadow-2xl rounded-b-[2rem]"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl text-lg font-medium flex items-center gap-4 ${
                        isActive(link.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <HugeiconsIcon icon={link.icon} size={24} className="opacity-70" />
                      {link.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
