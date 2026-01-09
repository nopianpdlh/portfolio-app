import { getSiteSettings, getPublishedExperiences, getPublishedCertificates, getPublishedEducations } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import HeroSection from "@/components/home/HeroSection"
import FeaturedProjects from "@/components/home/FeaturedProjects"
import ExperienceTimeline from "@/components/about/ExperienceTimeline"
import EducationSection from "@/components/about/EducationSection"
import CertificatesSection from "@/components/about/CertificatesSection"
import CTASection from "@/components/home/CTASection"
import { generateSEO, generateWebsiteSchema, generatePersonSchema, siteConfig } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Home",
  description: "Welcome to my portfolio - Full Stack Developer showcasing projects, education, certifications, and experience",
  url: "/",
  keywords: ["portfolio", "web developer", "projects", "full stack", "developer"],
})

export default async function HomePage() {
  const [settingsResult, experiencesResult, certificatesResult, educationsResult] = await Promise.all([
    getSiteSettings(),
    getPublishedExperiences(),
    getPublishedCertificates(),
    getPublishedEducations(),
  ])

  const settings = settingsResult.success ? settingsResult.data : null
  const experiences = experiencesResult.success && experiencesResult.data ? experiencesResult.data : []
  const certificates = certificatesResult.success && certificatesResult.data ? certificatesResult.data : []
  const educations = educationsResult.success && educationsResult.data ? educationsResult.data : []

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
        <EducationSection educations={educations} />
        <CertificatesSection certificates={certificates} />
        <ExperienceTimeline experiences={experiences} />
        <CTASection />
      </main>
    </PublicLayout>
  )
}
