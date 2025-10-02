"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

// Get all contacts with pagination and filters
export async function getContacts({
  page = 1,
  limit = 20,
  replied = "all", // all, replied, unread
}: {
  page?: number
  limit?: number
  replied?: string
} = {}) {
  await requireAdmin()

  const skip = (page - 1) * limit

  const where: any = {}

  if (replied === "replied") {
    where.replied = true
  } else if (replied === "unread") {
    where.replied = false
  }

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contact.count({ where }),
  ])

  return {
    contacts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// Get single contact by ID
export async function getContactById(id: string) {
  await requireAdmin()

  const contact = await prisma.contact.findUnique({
    where: { id },
  })

  return contact
}

// Mark contact as replied
export async function markAsReplied(id: string) {
  await requireAdmin()

  const contact = await prisma.contact.update({
    where: { id },
    data: { replied: true },
  })

  revalidatePath("/admin/contacts")

  return contact
}

// Toggle replied status
export async function toggleReplied(id: string) {
  await requireAdmin()

  const currentContact = await prisma.contact.findUnique({
    where: { id },
  })

  if (!currentContact) {
    throw new Error("Contact not found")
  }

  const contact = await prisma.contact.update({
    where: { id },
    data: { replied: !currentContact.replied },
  })

  revalidatePath("/admin/contacts")

  return contact
}

// Delete contact
export async function deleteContact(id: string) {
  await requireAdmin()

  const contact = await prisma.contact.delete({
    where: { id },
  })

  revalidatePath("/admin/contacts")

  return contact
}

// Bulk delete contacts
export async function bulkDeleteContacts(ids: string[]) {
  await requireAdmin()

  await prisma.contact.deleteMany({
    where: {
      id: { in: ids },
    },
  })

  revalidatePath("/admin/contacts")
}
