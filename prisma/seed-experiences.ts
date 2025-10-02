import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seedExperiences() {
  // Get admin user
  const admin = await prisma.user.findFirst({
    where: { role: "admin" },
  })

  if (!admin) {
    console.log("No admin user found. Run main seed first.")
    return
  }

  // Sample experiences
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Startup Inc.",
      description: "Led development of scalable web applications using Next.js and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
      startDate: new Date("2022-01-01"),
      endDate: null,
      isCurrent: true,
      order: 0,
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      description: "Developed client projects using React, Vue.js, and Laravel. Worked with cross-functional teams to deliver high-quality solutions.",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2021-12-31"),
      isCurrent: false,
      order: 1,
    },
    {
      title: "Frontend Developer",
      company: "E-commerce Company",
      description: "Built responsive e-commerce platforms using React and TailwindCSS. Optimized performance and improved user experience.",
      startDate: new Date("2019-03-01"),
      endDate: new Date("2020-05-31"),
      isCurrent: false,
      order: 2,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.create({
      data: {
        ...exp,
        userId: admin.id,
      },
    })
  }

  console.log(`✅ Seeded ${experiences.length} experiences`)
}

seedExperiences()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
