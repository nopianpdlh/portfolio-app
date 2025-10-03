import { getSiteSettings } from "@/lib/actions/public"
import HeroSection from "@/components/home/HeroSection"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import SkillsPreview from "@/components/home/SkillsPreview"
import CTASection from "@/components/home/CTASection"

export const metadata = {
  title: "Home - Portfolio",
  description: "Welcome to my portfolio website showcasing my projects and skills",
}

export default async function HomePage() {
  const settingsResult = await getSiteSettings()
  const settings = settingsResult.success ? settingsResult.data : null

  return (
    <main className="min-h-screen">
      <HeroSection settings={settings} />
      <FeaturedProjects />
      <SkillsPreview />
      <CTASection />
    </main>
  )
}
