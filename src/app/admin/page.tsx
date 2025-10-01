import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { FileText, FolderKanban, Mail, User, Briefcase, Award } from "lucide-react"

async function getDashboardStats() {
  const [
    projectsCount,
    skillsCount,
    experiencesCount,
    blogPostsCount,
    contactsCount,
    unreadContactsCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.blogPost.count(),
    prisma.contact.count(),
    prisma.contact.count({ where: { replied: false } }),
  ])

  return {
    projectsCount,
    skillsCount,
    experiencesCount,
    blogPostsCount,
    contactsCount,
    unreadContactsCount,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statsCards = [
    {
      title: "Projects",
      value: stats.projectsCount,
      description: "Total projects in portfolio",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-blue-600",
    },
    {
      title: "Skills",
      value: stats.skillsCount,
      description: "Skills in your toolkit",
      icon: Award,
      href: "/admin/skills",
      color: "text-green-600",
    },
    {
      title: "Experiences",
      value: stats.experiencesCount,
      description: "Work experiences listed",
      icon: Briefcase,
      href: "/admin/experiences",
      color: "text-purple-600",
    },
    {
      title: "Blog Posts",
      value: stats.blogPostsCount,
      description: "Published articles",
      icon: FileText,
      href: "/admin/blog",
      color: "text-orange-600",
    },
    {
      title: "Contacts",
      value: stats.contactsCount,
      description: `${stats.unreadContactsCount} unread messages`,
      icon: Mail,
      href: "/admin/contacts",
      color: "text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              <Link href={stat.href}>
                <Button variant="link" className="px-0 mt-2">
                  Manage →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/projects/new">
              <Button className="w-full justify-start">
                <FolderKanban className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </Link>
            <Link href="/admin/blog/new">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Write New Blog Post
              </Button>
            </Link>
            <Link href="/admin/contacts">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Check Messages
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 space-y-2">
              <p>• Dashboard stats are real-time</p>
              <p>• All data synced with Supabase</p>
              <p>• Ready to manage your portfolio</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
