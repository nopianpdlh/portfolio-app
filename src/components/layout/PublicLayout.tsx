"use client"

import { useEffect, useState } from "react"
import { getSiteSettings } from "@/lib/actions/public"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    async function fetchSettings() {
      const result = await getSiteSettings()
      if (result.success) {
        setSettings(result.data)
      }
    }
    fetchSettings()
  }, [])

  return (
    <>
      <Navigation />
      {children}
      <Footer settings={settings} />
    </>
  )
}
