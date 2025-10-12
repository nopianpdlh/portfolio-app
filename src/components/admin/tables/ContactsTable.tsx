"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  MoreHorizontal,
  Trash2,
  Eye,
  CheckCircle,
  Mail,
} from "lucide-react"
import { deleteContact, toggleReplied } from "@/lib/actions/contacts"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Contact {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  replied: boolean
  createdAt: Date
}

interface ContactsTableProps {
  contacts: Contact[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function ContactsTable({ contacts, pagination }: ContactsTableProps) {
  const router = useRouter()
  const [repliedFilter, setRepliedFilter] = useState("all")
  const [loading, setLoading] = useState<string | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<{ id: string; name: string } | null>(null)

  const handleRepliedFilter = (value: string) => {
    setRepliedFilter(value)
    const params = new URLSearchParams(window.location.search)
    if (value !== "all") {
      params.set("replied", value)
    } else {
      params.delete("replied")
    }
    params.set("page", "1")
    router.push(`/admin/contacts?${params.toString()}`)
  }

  const handleView = (contact: Contact) => {
    setSelectedContact(contact)
    setViewDialogOpen(true)
  }

  const handleDeleteClick = (id: string, name: string) => {
    setContactToDelete({ id, name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return

    setLoading(contactToDelete.id)
    try {
      await deleteContact(contactToDelete.id)
      toast.success("Contact deleted successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete contact. Please try again.")
    } finally {
      setLoading(null)
      setDeleteDialogOpen(false)
      setContactToDelete(null)
    }
  }

  const handleToggleReplied = async (id: string) => {
    setLoading(id)
    try {
      await toggleReplied(id)
      toast.success("Status updated!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to update status. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={repliedFilter} onValueChange={handleRepliedFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message Preview</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No contact messages yet.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact.id} className={!contact.replied ? "bg-blue-50/50" : ""}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      {contact.email}
                    </a>
                  </TableCell>
                  <TableCell>{contact.subject || "-"}</TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                      {contact.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    {contact.replied ? (
                      <Badge className="bg-green-500">Replied</Badge>
                    ) : (
                      <Badge className="bg-blue-500">Unread</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(contact.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={loading === contact.id}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(contact)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleReplied(contact.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {contact.replied ? "Mark as Unread" : "Mark as Replied"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(contact.id, contact.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
            <DialogDescription>
              From {selectedContact?.name} ({selectedContact?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedContact?.subject && (
              <div>
                <div className="text-sm font-semibold text-gray-600">Subject:</div>
                <div className="text-gray-900">{selectedContact.subject}</div>
              </div>
            )}
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">Message:</div>
              <div className="bg-gray-50 p-4 rounded border whitespace-pre-wrap">
                {selectedContact?.message}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Received on {selectedContact && formatDate(selectedContact.createdAt)}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the message from <strong>&quot;{contactToDelete?.name}&quot;</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{" "}
            messages
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => router.push(`/admin/contacts?page=${pagination.page - 1}`)}
            >
              Previous
            </Button>
            <div className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => router.push(`/admin/contacts?page=${pagination.page + 1}`)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
