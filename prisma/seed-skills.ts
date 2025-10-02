import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seedSkills() {
  // Get admin user
  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
  })

  if (!admin) {
    console.log("No admin user found. Run main seed first.")
    return
  }

  // Sample skills
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", level: "Expert", order: 0 },
    { name: "Next.js", category: "Frontend", level: "Expert", order: 1 },
    { name: "TailwindCSS", category: "Frontend", level: "Advanced", order: 2 },
    { name: "Vue.js", category: "Frontend", level: "Intermediate", order: 3 },
    
    // Backend
    { name: "Node.js", category: "Backend", level: "Advanced", order: 4 },
    { name: "Express", category: "Backend", level: "Advanced", order: 5 },
    { name: "Prisma", category: "Backend", level: "Advanced", order: 6 },
    { name: "GraphQL", category: "Backend", level: "Intermediate", order: 7 },
    
    // Languages
    { name: "TypeScript", category: "Languages", level: "Expert", order: 8 },
    { name: "JavaScript", category: "Languages", level: "Expert", order: 9 },
    { name: "Python", category: "Languages", level: "Intermediate", order: 10 },
    { name: "SQL", category: "Languages", level: "Advanced", order: 11 },
    
    // Database
    { name: "PostgreSQL", category: "Database", level: "Advanced", order: 12 },
    { name: "MongoDB", category: "Database", level: "Intermediate", order: 13 },
    { name: "Redis", category: "Database", level: "Beginner", order: 14 },
    
    // DevOps
    { name: "Docker", category: "DevOps", level: "Intermediate", order: 15 },
    { name: "Git", category: "DevOps", level: "Advanced", order: 16 },
    { name: "Vercel", category: "DevOps", level: "Advanced", order: 17 },
    
    // Tools
    { name: "VS Code", category: "Tools", level: "Expert", order: 18 },
    { name: "Figma", category: "Tools", level: "Intermediate", order: 19 },
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: `skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}` },
      update: skill,
      create: {
        ...skill,
        userId: admin.id,
      },
    })
  }

  console.log(`✅ Seeded ${skills.length} skills`)
}

seedSkills()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
