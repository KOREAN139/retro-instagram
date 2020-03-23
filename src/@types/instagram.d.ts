declare module 'retro-instagram' {
  export interface MediaItem {
    mediaUrl: string
    pixelizedMediaUrl?: string
  }

  export interface PostItem extends MediaItem {
    mediaType: 'Photo' | 'Video' | 'Carousel'
    commentCount: number
    hasMoreComments: boolean
    previewComments: any[]
    likeCount: number
  }

  export interface UserInfo {
    username: string
    fullName?: string
    profilePicture: MediaItem
    mediaCount: number
    followerCount: number
    followingCount: number
    biography?: string
    externalUrl?: string
  }
}
