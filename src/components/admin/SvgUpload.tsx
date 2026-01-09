"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X, Upload, Loader2, FileCode, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

interface SvgUploadProps {
  value: string | null | undefined
  onChange: (url: string | null) => void
  folder?: string
}

export default function SvgUpload({
  value,
  onChange,
  folder = 'skills',
}: SvgUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Validate file type
      if (file.type !== 'image/svg+xml') {
        toast.error('Only SVG files are allowed')
        return
      }

      // Validate file size (500KB max for SVG)
      if (file.size > 500 * 1024) {
        toast.error('SVG file too large. Maximum size is 500KB.')
        return
      }

      setIsUploading(true)
      setPreview(URL.createObjectURL(file))

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const data = await response.json()
        onChange(data.url)
        toast.success('SVG icon uploaded successfully!')
      } catch (error) {
        console.error('Upload error:', error)
        toast.error(error instanceof Error ? error.message : 'Failed to upload SVG')
        setPreview(null)
      } finally {
        setIsUploading(false)
      }
    },
    [folder, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg'],
    },
    maxFiles: 1,
    multiple: false,
    disabled: isUploading,
  })

  const handleRemove = () => {
    onChange(null)
    setPreview(null)
  }

  const displayUrl = value || preview

  return (
    <div className="space-y-3">
      {/* Preview */}
      {displayUrl && (
        <Card className="relative p-4 flex items-center justify-center bg-muted/30">
          <div className="w-16 h-16 flex items-center justify-center">
            {/* For SVG, we render it as an img tag */}
            <img
              src={displayUrl}
              alt="Skill icon"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </Card>
      )}

      {/* Upload Area */}
      {!displayUrl && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary'}
            ${isUploading && 'opacity-50 cursor-not-allowed'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <FileCode className="w-6 h-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive ? 'Drop SVG here' : 'Drop SVG or click to browse'}
                </p>
                <p className="text-xs text-muted-foreground/70">Max 500KB</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
