export interface Media {
  id: string;
  url: string;
  quality: string;
  type: "video" | "image" | "audio" | "text";
  extension: string;
  size?: string;
}

export interface PlatformResult {
  thumbnail: string;
  title: string;
  medias: Media[];
  caption: string;
  likes: number;
  commentCount: number;
  shareCount?: number;
  author?: string;
  authorId?: string;
  type?: "single" | "list";
  items?: Array<{
    id: string;
    title: string;
    thumbnail: string;
    url: string; // The URL to re-trigger search
  }>;
  url?: string;
}
