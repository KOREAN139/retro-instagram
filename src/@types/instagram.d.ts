/* eslint-disable */
declare module 'retro-instagram' {
  export interface MediaItem {
    mediaUrl: string;
    pixelizedMediaUrl?: string;
  }

  export interface CaptionItem {
    username: string;
    text: string;
  }

  export interface CommentItem extends CaptionItem {
    pk: string;
  }

  export interface PostItem extends MediaItem {
    mediaType: string; // 'Photo' | 'Video' | 'Carousel'
    commentCount: number;
    previewComments: CommentItem[];
    likeCount: number;
  }

  export interface PostWithCaptionItem extends PostItem {
    id: string;
    caption: CaptionItem;
    hasLiked: boolean;
    createdAt: number;
  }

  export interface TimelineItem {
    user: UserInfo;
    post: PostWithCaptionItem;
  }

  export interface TimelineInfo {
    moreAvailable: boolean;
    posts: TimelineItem[];
  }

  export interface UserPostInfo {
    moreAvailable: boolean;
    posts: PostWithCaptionItem[];
  }

  export interface UserInfo {
    username: string;
    profilePicture: MediaItem;
  }

  export interface DetailUserInfo extends UserInfo {
    fullName?: string;
    mediaCount: number;
    followerCount: number;
    followingCount: number;
    biography?: string;
    externalUrl?: string;
  }

  export interface UserLink {
    start: number;
    end: number;
    type: string;
    id: string | number;
  }

  export interface NewsItem {
    text?: string;
    profilePicture: MediaItem;
    thumbnail?: MediaItem;
    links?: UserLink[];
    createdAt: number;
  }

  export interface TimePartition {
    headers: string[];
    indices: number[];
  }

  export interface NewsInfo {
    news: NewsItem[];
    timePartition: TimePartition;
  }
}
