import { requireAdmin } from "@/lib/auth"
import AdminHeader from "@/components/admin/AdminHeader"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to /login if not authenticated
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}
