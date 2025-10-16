import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password harus diisi")
        }

        // Check if credentials match admin env vars
        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com"
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123"
        
        const isAdminEnv =
          credentials.email === adminEmail &&
          credentials.password === adminPassword

        if (!isAdminEnv) {
          throw new Error("Email atau password salah")
        }

        // Find or create user in database
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          // Auto-create admin user on first login
          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: "Admin",
              role: "admin",
              bio: "Portfolio administrator"
            }
          })
          console.log("✅ Auto-created admin user:", user.email)
        }

        // Return user object (password excluded)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email!
        token.name = user.name
        token.role = user.role
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role
      }
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === "development",
}
