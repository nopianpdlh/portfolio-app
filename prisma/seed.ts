import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log('✅ Admin user already exists:', adminEmail)
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      bio: 'Portfolio administrator',
    },
  })

  console.log('✅ Admin user created successfully!')
  console.log('📧 Email:', admin.email)
  console.log('🔑 Password:', adminPassword)
  console.log('👤 Role:', admin.role)

  // Create default settings
  const settings = await prisma.settings.create({
    data: {
      siteName: 'My Portfolio',
      siteTagline: 'Full-Stack Developer',
      siteDescription: 'Welcome to my portfolio website',
    },
  })

  console.log('✅ Default settings created!')
  console.log('🌐 Site Name:', settings.siteName)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
