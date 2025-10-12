"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { createCertificateSchema } from "@/lib/validations/certificate"

// Get all certificates
export async function getCertificates() {
  await requireAdmin()

  const certificates = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  })

  return certificates
}

// Get single certificate
export async function getCertificateById(id: string) {
  await requireAdmin()

  const certificate = await prisma.certificate.findUnique({
    where: { id },
  })

  return certificate
}

// Create new certificate
export async function createCertificate(data: any) {
  const user = await requireAdmin()

  // Validate data
  const validatedData = createCertificateSchema.parse(data)

  // Get max order for new certificate
  const maxOrder = await prisma.certificate.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  })

  const certificate = await prisma.certificate.create({
    data: {
      ...validatedData,
      issueDate: validatedData.issueDate ? new Date(validatedData.issueDate) : null,
      expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
      order: (maxOrder?.order || 0) + 1,
      userId: user.id,
    },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/about")
  return { success: true, certificate }
}

// Update certificate
export async function updateCertificate(id: string, data: any) {
  await requireAdmin()

  const certificate = await prisma.certificate.update({
    where: { id },
    data: {
      ...data,
      issueDate: data.issueDate ? new Date(data.issueDate) : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
    },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/about")
  return { success: true, certificate }
}

// Delete certificate
export async function deleteCertificate(id: string) {
  await requireAdmin()

  await prisma.certificate.delete({
    where: { id },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/about")
  return { success: true }
}

// Reorder certificates
export async function reorderCertificates(certificates: { id: string; order: number }[]) {
  await requireAdmin()

  // Update all certificates in a transaction
  await prisma.$transaction(
    certificates.map((cert) =>
      prisma.certificate.update({
        where: { id: cert.id },
        data: { order: cert.order },
      })
    )
  )

  revalidatePath("/admin/certificates")
  revalidatePath("/about")
  return { success: true }
}

// Toggle publish status
export async function toggleCertificatePublish(id: string) {
  await requireAdmin()

  const certificate = await prisma.certificate.findUnique({
    where: { id },
    select: { isPublished: true },
  })

  if (!certificate) {
    throw new Error("Certificate not found")
  }

  const updated = await prisma.certificate.update({
    where: { id },
    data: { isPublished: !certificate.isPublished },
  })

  revalidatePath("/admin/certificates")
  revalidatePath("/about")
  return { success: true, certificate: updated }
}
