import { getSiteSettings, getPublishedSkills, getPublishedExperiences } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import AboutHero from "@/components/about/AboutHero"
import SkillsMatrix from "@/components/about/SkillsMatrix"
import ExperienceTimeline from "@/components/about/ExperienceTimeline"
import AboutCTA from "@/components/about/AboutCTA"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "About",
  description: "Learn more about my skills, experience, and professional journey as a Full Stack Developer. Explore my technical expertise and work history",
  url: "/about",
  type: "profile",
  keywords: ["about", "skills", "experience", "developer", "expertise"],
})

export default async function AboutPage() {
  const [settingsResult, skillsResult, experiencesResult] = await Promise.all([
    getSiteSettings(),
    getPublishedSkills(),
    getPublishedExperiences(),
  ])

  const settings = settingsResult.success ? settingsResult.data : null
  const skills = skillsResult.success && skillsResult.data ? skillsResult.data : []
  const experiences = experiencesResult.success && experiencesResult.data ? experiencesResult.data : []

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <AboutHero settings={settings} />
        <SkillsMatrix skills={skills} />
        <ExperienceTimeline experiences={experiences} />
        <AboutCTA settings={settings} />
      </main>
    </PublicLayout>
  )
}
