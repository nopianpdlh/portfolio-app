import { getSiteSettings, getPublishedSkills, getPublishedExperiences, getPublishedCertificates, getPublishedEducations } from "@/lib/actions/public"
import { getPublicStatusStats } from "@/lib/actions/settings"
import PublicLayout from "@/components/layout/PublicLayout"
import AboutHero from "@/components/about/AboutHero"
import StatusQuickStats from "@/components/about/StatusQuickStats"
import SkillsMatrix from "@/components/about/SkillsMatrix"
import ExperienceTimeline from "@/components/about/ExperienceTimeline"
import CertificatesSection from "@/components/about/CertificatesSection"
import EducationSection from "@/components/about/EducationSection"
import CTASection from "@/components/home/CTASection"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "About",
  description: "Learn more about my skills, experience, certifications, and educational background as a Full Stack Developer. Explore my technical expertise and professional journey",
  url: "/about",
  type: "profile",
  keywords: ["about", "skills", "experience", "certifications", "education", "developer", "expertise"],
})

export default async function AboutPage() {
  const [settingsResult, skillsResult, experiencesResult, certificatesResult, educationsResult, statusStats] = await Promise.all([
    getSiteSettings(),
    getPublishedSkills(),
    getPublishedExperiences(),
    getPublishedCertificates(),
    getPublishedEducations(),
    getPublicStatusStats(),
  ])

  const settings = settingsResult.success ? settingsResult.data : null
  const skills = skillsResult.success && skillsResult.data ? skillsResult.data : []
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
        <SkillsMatrix skills={skills} />
        <ExperienceTimeline experiences={experiences} />
        <CertificatesSection certificates={certificates} />
        <EducationSection educations={educations} />
        <CTASection />
      </main>
    </PublicLayout>
  )
}
