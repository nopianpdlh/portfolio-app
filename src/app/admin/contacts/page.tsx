import { Suspense } from "react"
import { getContacts } from "@/lib/actions/contacts"
import ContactsTable from "@/components/admin/tables/ContactsTable"

interface PageProps {
  searchParams: Promise<{
    page?: string
    replied?: string
  }>
}

export default async function ContactsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const replied = params.replied || "all"

  const { contacts, pagination } = await getContacts({
    page,
    replied,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-600 mt-1">View and manage messages from your portfolio visitors</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Total Messages</div>
          <div className="text-2xl font-bold">{pagination.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Unread</div>
          <div className="text-2xl font-bold text-blue-600">
            {contacts.filter(c => !c.replied).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600">Replied</div>
          <div className="text-2xl font-bold text-green-600">
            {contacts.filter(c => c.replied).length}
          </div>
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<div>Loading...</div>}>
        <ContactsTable contacts={contacts} pagination={pagination} />
      </Suspense>
    </div>
  )
}
