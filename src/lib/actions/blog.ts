"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { createBlogPostSchema, type BlogPostFormData } from "@/lib/validations/blog"
import { requireAdmin } from "@/lib/auth"

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Get all blog posts with pagination and filters
export async function getBlogPosts({
  page = 1,
  limit = 10,
  search = "",
  status = "all", // all, published, draft
}: {
  page?: number
  limit?: number
  search?: string
  status?: string
} = {}) {
  await requireAdmin()

  const skip = (page - 1) * limit

  const where: any = {}

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ]
  }

  if (status === "published") {
    where.isPublished = true
  } else if (status === "draft") {
    where.isPublished = false
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.blogPost.count({ where }),
  ])

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  }
}

// Get single blog post by ID
export async function getBlogPostById(id: string) {
  await requireAdmin()

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return post
}

// Get blog post by slug (for public view)
export async function getBlogPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return post
}

// Create new blog post
export async function createBlogPost(data: BlogPostFormData) {
  const user = await requireAdmin()

  const validated = createBlogPostSchema.parse(data)

  // Generate slug if not provided
  const slug = validated.slug || generateSlug(validated.title)

  // Check if slug already exists
  const existingPost = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (existingPost) {
    throw new Error("A post with this slug already exists")
  }

  const post = await prisma.blogPost.create({
    data: {
      title: validated.title,
      slug,
      excerpt: validated.excerpt || null,
      content: validated.content,
      coverImage: validated.coverImage || null,
      tags: validated.tags,
      isPublished: validated.isPublished,
      publishDate: validated.isPublished ? new Date() : null,
      metaTitle: validated.metaTitle || null,
      metaDescription: validated.metaDescription || null,
      userId: user.id,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  return post
}

// Update blog post
export async function updateBlogPost(id: string, data: BlogPostFormData) {
  await requireAdmin()

  const validated = createBlogPostSchema.parse(data)

  // Generate slug if not provided
  const slug = validated.slug || generateSlug(validated.title)

  // Check if slug is taken by another post
  const existingPost = await prisma.blogPost.findFirst({
    where: {
      slug,
      NOT: { id },
    },
  })

  if (existingPost) {
    throw new Error("A post with this slug already exists")
  }

  // Get current post to check if publishing status changed
  const currentPost = await prisma.blogPost.findUnique({
    where: { id },
  })

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: validated.title,
      slug,
      excerpt: validated.excerpt || null,
      content: validated.content,
      coverImage: validated.coverImage || null,
      tags: validated.tags,
      isPublished: validated.isPublished,
      metaTitle: validated.metaTitle || null,
      metaDescription: validated.metaDescription || null,
      // Set publishDate only when first published
      publishDate:
        validated.isPublished && !currentPost?.isPublished
          ? new Date()
          : currentPost?.publishDate,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)

  return post
}

// Delete blog post
export async function deleteBlogPost(id: string) {
  await requireAdmin()

  const post = await prisma.blogPost.delete({
    where: { id },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  return post
}

// Toggle published status
export async function togglePublishBlogPost(id: string) {
  await requireAdmin()

  const currentPost = await prisma.blogPost.findUnique({
    where: { id },
  })

  if (!currentPost) {
    throw new Error("Post not found")
  }

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      isPublished: !currentPost.isPublished,
      publishDate:
        !currentPost.isPublished && !currentPost.publishDate
          ? new Date()
          : currentPost.publishDate,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")

  return post
}



// Bulk delete
export async function bulkDeleteBlogPosts(ids: string[]) {
  await requireAdmin()

  await prisma.blogPost.deleteMany({
    where: {
      id: { in: ids },
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
