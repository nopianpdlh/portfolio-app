import { getSiteSettings } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import HeroSection from "@/components/home/HeroSection"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import SkillsPreview from "@/components/home/SkillsPreview"
import CTASection from "@/components/home/CTASection"
import { generateSEO, generateWebsiteSchema, generatePersonSchema, siteConfig } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Home",
  description: "Welcome to my portfolio website showcasing my projects, skills, and experience as a Full Stack Developer",
  url: "/",
  keywords: ["portfolio", "web developer", "projects", "skills"],
})

export default async function HomePage() {
  const settingsResult = await getSiteSettings()
  const settings = settingsResult.success ? settingsResult.data : null

  // Generate JSON-LD structured data
  const websiteSchema = generateWebsiteSchema({
    name: settings?.siteName || siteConfig.name,
    description: settings?.siteDescription || siteConfig.defaultDescription,
    url: siteConfig.url,
  })

  const personSchema = generatePersonSchema({
    name: siteConfig.author,
    jobTitle: "Full Stack Developer",
    description: settings?.siteDescription || "Passionate developer building modern web applications",
    image: "/avatar.jpg",
    email: settings?.email || "contact@example.com",
    url: siteConfig.url,
    sameAs: [
      settings?.github || "",
      settings?.linkedin || "",
      settings?.twitter || "",
    ].filter(Boolean),
  })

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className="min-h-screen">
        <HeroSection settings={settings} />
        <FeaturedProjects />
        <SkillsPreview />
        <CTASection />
      </main>
    </PublicLayout>
  )
}
