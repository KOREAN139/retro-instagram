declare module 'retro-instagram' {
  export interface MediaItem {
    mediaType: 'Photo' | 'Video' | 'Carousel'
    mediaUrl: string
    pixelizedMediaUrl?: string
    commentCount: number
    hasMoreComments: boolean
    previewComments: any[]
    likeCount: number
  }
}
