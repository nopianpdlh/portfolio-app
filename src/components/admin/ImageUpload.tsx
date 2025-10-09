"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X, Upload, Loader2, ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  validateImageFile,
  optimizeImage,
  formatFileSize,
  getImageDimensions,
  IMAGE_CONFIG,
} from '@/lib/image-utils'
import { toast } from 'sonner'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  folder?: string
}

interface UploadingImage {
  id: string
  file: File
  preview: string
  progress: number
  status: 'optimizing' | 'uploading' | 'success' | 'error'
  error?: string
  url?: string
}

export default function ImageUpload({
  images,
  onChange,
  maxImages = 5,
  folder = 'projects',
}: ImageUploadProps) {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Check if we can upload more images
      const remainingSlots = maxImages - images.length
      if (remainingSlots <= 0) {
        toast.error(`Maximum ${maxImages} images allowed`)
        return
      }

      // Limit files to remaining slots
      const filesToUpload = acceptedFiles.slice(0, remainingSlots)

      // Validate and prepare files
      const validFiles: UploadingImage[] = []
      for (const file of filesToUpload) {
        const validation = validateImageFile(file)
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`)
          continue
        }

        validFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: 'optimizing',
        })
      }

      if (validFiles.length === 0) return

      setUploadingImages((prev) => [...prev, ...validFiles])

      // Process each file
      for (const uploadItem of validFiles) {
        try {
          // Get original dimensions
          const dimensions = await getImageDimensions(uploadItem.file)

          // Update status
          setUploadingImages((prev) =>
            prev.map((item) =>
              item.id === uploadItem.id
                ? { ...item, status: 'optimizing', progress: 10 }
                : item
            )
          )

          // Optimize image
          const optimizedBlob = await optimizeImage(
            uploadItem.file,
            IMAGE_CONFIG.PROJECT_CARD.width,
            IMAGE_CONFIG.PROJECT_CARD.height,
            IMAGE_CONFIG.PROJECT_CARD.quality
          )

          // Update status
          setUploadingImages((prev) =>
            prev.map((item) =>
              item.id === uploadItem.id
                ? { ...item, status: 'uploading', progress: 40 }
                : item
            )
          )

          // Create FormData for upload
          const formData = new FormData()
          formData.append('file', optimizedBlob, uploadItem.file.name)
          formData.append('folder', folder)

          // Upload to server
          const response = await fetch('/api/upload/image', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Upload failed')
          }

          const data = await response.json()

          // Update status to success
          setUploadingImages((prev) =>
            prev.map((item) =>
              item.id === uploadItem.id
                ? { ...item, status: 'success', progress: 100, url: data.url }
                : item
            )
          )

          // Add to images array
          onChange([...images, data.url])

          // Show success with optimization info
          const originalSize = uploadItem.file.size
          const optimizedSize = optimizedBlob.size
          const savedPercentage = Math.round(((originalSize - optimizedSize) / originalSize) * 100)

          toast.success(
            `Image uploaded! Original: ${dimensions.width}x${dimensions.height} → Optimized: ${IMAGE_CONFIG.PROJECT_CARD.width}x${IMAGE_CONFIG.PROJECT_CARD.height} (${savedPercentage}% smaller)`
          )

          // Clean up after 2 seconds
          setTimeout(() => {
            setUploadingImages((prev) => prev.filter((item) => item.id !== uploadItem.id))
            URL.revokeObjectURL(uploadItem.preview)
          }, 2000)
        } catch (error) {
          console.error('Upload error:', error)
          setUploadingImages((prev) =>
            prev.map((item) =>
              item.id === uploadItem.id
                ? {
                    ...item,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Upload failed',
                  }
                : item
            )
          )
          toast.error(`Failed to upload ${uploadItem.file.name}`)
        }
      }
    },
    [images, maxImages, onChange, folder]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: IMAGE_CONFIG.MAX_FILE_SIZE,
    multiple: true,
    disabled: images.length >= maxImages,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  const removeImage = async (index: number) => {
    const imageUrl = images[index]
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)

    // Optionally delete from storage
    // You can implement this if needed
    toast.success('Image removed')
  }

  const canUploadMore = images.length < maxImages

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {canUploadMore && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragActive || isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }
            ${!canUploadMore && 'opacity-50 cursor-not-allowed'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop images here...' : 'Upload Project Images'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to browse
              </p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Max {maxImages} images ({images.length} uploaded)</p>
              <p>• Formats: JPG, PNG, WebP</p>
              <p>• Max size: {IMAGE_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB per image</p>
              <p>• Images will be optimized to {IMAGE_CONFIG.PROJECT_CARD.width}x{IMAGE_CONFIG.PROJECT_CARD.height} (16:9)</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Best Practices:</strong> Images are automatically optimized to 1280x720px (16:9 ratio) 
          for consistent display in project cards. Quality is preserved while reducing file size by ~40-70%.
        </AlertDescription>
      </Alert>

      {/* Uploading Images */}
      {uploadingImages.length > 0 && (
        <div className="space-y-2">
          {uploadingImages.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={item.preview}
                    alt="Uploading"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(item.file.size)}
                  </p>
                  {item.status === 'optimizing' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Optimizing image...
                      </div>
                    </div>
                  )}
                  {item.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs text-blue-600 mb-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Uploading...
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {item.status === 'success' && (
                    <div className="flex items-center gap-2 text-xs text-green-600 mt-2">
                      <CheckCircle className="w-3 h-3" />
                      Upload complete!
                    </div>
                  )}
                  {item.status === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-600 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      {item.error || 'Upload failed'}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">
              Uploaded Images ({images.length}/{maxImages})
            </p>
            {images.length > 1 && (
              <p className="text-xs text-muted-foreground">
                First image will be the thumbnail
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="group relative overflow-hidden aspect-video">
                <Image
                  src={image}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Thumbnail
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && uploadingImages.length === 0 && (
        <Card className="p-8">
          <div className="flex flex-col items-center text-center gap-3 text-muted-foreground">
            <ImageIcon className="w-12 h-12" />
            <div>
              <p className="font-medium">No images uploaded yet</p>
              <p className="text-sm">Upload images to showcase your project</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
