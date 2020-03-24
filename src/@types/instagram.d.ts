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

  export interface UserPostInfo {
    moreAvailable: boolean
    posts: PostItem[]
  }

  export interface UserInfo {
    username: string
    profilePicture: MediaItem
  }

  export interface DetailUserInfo extends UserInfo {
    fullName?: string
    mediaCount: number
    followerCount: number
    followingCount: number
    biography?: string
    externalUrl?: string
  }
}
