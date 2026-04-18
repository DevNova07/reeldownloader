export interface Media {
  id: string;
  url: string;
  quality: string;
  type: "video" | "image" | "audio" | "text";
  extension: string;
}

export interface PlatformResult {
  thumbnail: string;
  title: string;
  medias: Media[];
  caption: string;
  likes: number;
  commentCount: number;
}
