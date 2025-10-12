/**
 * Image Upload & Optimization Utilities
 * 
 * Best Practices Implemented:
 * 1. Client-side image optimization before upload
 * 2. Automatic aspect ratio maintenance (16:9 for project cards)
 * 3. Quality preservation with optimal compression
 * 4. WebP format for better performance
 * 5. Progressive loading support
 * 6. File size validation
 * 7. Type validation
 */

export const IMAGE_CONFIG = {
  // Project card dimensions (16:9 aspect ratio for consistency)
  PROJECT_CARD: {
    width: 1280,
    height: 720,
    quality: 85, // High quality, balanced compression
    aspectRatio: 16 / 9,
  },
  // Maximum file size (5MB)
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  // Allowed formats
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  // Allowed extensions
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${IMAGE_CONFIG.ALLOWED_EXTENSIONS.join(', ')}`,
    }
  }

  // Check file size
  if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${IMAGE_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB`,
    }
  }

  return { valid: true }
}

/**
 * Optimize image on client-side before upload
 * Maintains aspect ratio, crops to center, and compresses
 */
export async function optimizeImage(
  file: File,
  targetWidth: number = IMAGE_CONFIG.PROJECT_CARD.width,
  targetHeight: number = IMAGE_CONFIG.PROJECT_CARD.height,
  quality: number = IMAGE_CONFIG.PROJECT_CARD.quality
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    img.onload = () => {
      // Calculate dimensions to maintain aspect ratio and cover the target area
      const targetRatio = targetWidth / targetHeight
      const imgRatio = img.width / img.height

      let sourceWidth = img.width
      let sourceHeight = img.height
      let sourceX = 0
      let sourceY = 0

      // Crop to target aspect ratio (center crop)
      if (imgRatio > targetRatio) {
        // Image is wider, crop width
        sourceWidth = img.height * targetRatio
        sourceX = (img.width - sourceWidth) / 2
      } else {
        // Image is taller, crop height
        sourceHeight = img.width / targetRatio
        sourceY = (img.height - sourceHeight) / 2
      }

      // Set canvas size to target dimensions
      canvas.width = targetWidth
      canvas.height = targetHeight

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Draw the cropped and resized image
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight
      )

      // Convert to WebP for optimal performance (fallback to JPEG if not supported)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            // Fallback to JPEG if WebP fails
            canvas.toBlob(
              (jpegBlob) => {
                if (jpegBlob) {
                  resolve(jpegBlob)
                } else {
                  reject(new Error('Failed to create image blob'))
                }
              },
              'image/jpeg',
              quality / 100
            )
          }
        },
        'image/webp',
        quality / 100
      )
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    // Load the image
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Generate a preview URL for an image file
 */
export function generatePreviewUrl(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Revoke preview URL to free memory
 */
export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url)
}

/**
 * Generate a unique filename with timestamp
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.split('.').slice(0, -1).join('.')
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 30)

  return `${sanitizedName}-${timestamp}-${randomString}.${extension}`
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
      URL.revokeObjectURL(img.src)
    }
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    img.src = URL.createObjectURL(file)
  })
}
