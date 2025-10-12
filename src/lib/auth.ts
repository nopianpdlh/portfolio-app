import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }
  
  return session.user
}

export async function requireAdmin() {
  const user = await requireAuth()
  
  if (user.role !== "admin") {
    redirect("/")
  }
  
  return user
}
