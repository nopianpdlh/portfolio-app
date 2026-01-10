import { getSiteSettings, getPublishedExperiences, getPublishedCertificates, getPublishedEducations } from "@/lib/actions/public"
import { getPublicStatusStats } from "@/lib/actions/settings"
import PublicLayout from "@/components/layout/PublicLayout"
import AboutHero from "@/components/about/AboutHero"
import StatusQuickStats from "@/components/about/StatusQuickStats"
import ExperienceTimeline from "@/components/about/ExperienceTimeline"
import CertificatesSection from "@/components/about/CertificatesSection"
import EducationSection from "@/components/about/EducationSection"
import CTASection from "@/components/home/CTASection"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "About",
  description: "Learn more about my experience, certifications, and educational background as a Full Stack Developer. Explore my professional journey",
  url: "/about",
  type: "profile",
  keywords: ["about", "experience", "certifications", "education", "developer"],
})

export default async function AboutPage() {
  const [settingsResult, experiencesResult, certificatesResult, educationsResult, statusStats] = await Promise.all([
    getSiteSettings(),
    getPublishedExperiences(),
    getPublishedCertificates(),
    getPublishedEducations(),
    getPublicStatusStats(),
  ])

  const settings = settingsResult.success ? settingsResult.data : null
  const experiences = experiencesResult.success && experiencesResult.data ? experiencesResult.data : []
  const certificates = certificatesResult.success && certificatesResult.data ? certificatesResult.data : []
  const educations = educationsResult.success && educationsResult.data ? educationsResult.data : []

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <AboutHero settings={settings} />
        <StatusQuickStats
          availabilityStatus={statusStats.availabilityStatus}
          currentActivity={statusStats.currentActivity}
          openToOpportunities={statusStats.openToOpportunities}
          stats={statusStats.stats}
        />
        <ExperienceTimeline experiences={experiences} />
        <CertificatesSection certificates={certificates} />
        <EducationSection educations={educations} />
        <CTASection />
      </main>
    </PublicLayout>
  )
}
