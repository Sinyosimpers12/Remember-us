export interface Photo {
    id: number
    title: string
    description: string
    url: string
    thumbnailUrl: string
    file?: File
    fileInfo?: {
        name: string
        originalName: string
        size: number
        type: string
        lastModified: number
        uploadedAt: string
      }      
  }
