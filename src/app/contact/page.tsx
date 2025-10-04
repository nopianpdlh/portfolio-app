import { getSiteSettings } from "@/lib/actions/public"
import PublicLayout from "@/components/layout/PublicLayout"
import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with me for project inquiries, collaborations, freelance opportunities, or just to say hello. I'm always open to discussing new projects",
  url: "/contact",
  keywords: ["contact", "hire", "freelance", "collaboration", "inquiries"],
})

export default async function ContactPage() {
  const result = await getSiteSettings()
  const settings = result.success ? result.data : null

  return (
    <PublicLayout>
      <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Let's Connect
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Fill out the form below and I'll get back
              to you as soon as possible.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </main>
    </PublicLayout>
  )
}
