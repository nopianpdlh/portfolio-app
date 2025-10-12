import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

const siteConfig = {
  name: 'nopianpdlh',
  defaultTitle: 'Novian Fadhilah - Full Stack Developer',
  defaultDescription: 'Showcasing my projects, skills, and experience as a Full Stack Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  author: 'Novian Fadhilah',
  keywords: [
    'portfolio',
    'full stack developer',
    'web development',
    'next.js',
    'react',
    'typescript',
    'software engineer',
  ],
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
}: SEOProps = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
  const pageDescription = description || siteConfig.defaultDescription
  const pageImage = image || siteConfig.ogImage
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const allKeywords = [...siteConfig.keywords, ...keywords]

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: author || siteConfig.author }],
    creator: author || siteConfig.author,
    publisher: siteConfig.author,
    
    // OpenGraph
    openGraph: {
      type,
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@yourusername', // Replace with actual Twitter handle
    },
    
    // Additional
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// JSON-LD Structured Data Generators
export function generatePersonSchema(data: {
  name: string
  jobTitle: string
  description: string
  image: string
  email: string
  url: string
  sameAs: string[] // Social media URLs
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    image: data.image,
    email: data.email,
    url: data.url,
    sameAs: data.sameAs,
  }
}

export function generateWebsiteSchema(data: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    description: data.description,
    url: data.url,
  }
}

export function generateProjectSchema(project: {
  name: string
  description: string
  image: string
  url: string
  datePublished: string
  dateModified: string
  author: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: project.image,
    url: project.url,
    datePublished: project.datePublished,
    dateModified: project.dateModified,
    author: {
      '@type': 'Person',
      name: project.author,
    },
    keywords: project.keywords.join(', '),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export { siteConfig }
