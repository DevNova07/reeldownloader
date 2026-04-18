
export interface SubLink {
  href: string;
  label: string; // This is the fallback label
}

export interface NavCategory {
  titleKey: string; // The translation key in dict.navbar
  links: SubLink[];
}

export interface PlatformNav {
  id: string;
  categories: NavCategory[];
  hoverColor: string;
  borderColor: string;
}

export const PLATFORM_NAV_CONFIG: Record<string, PlatformNav> = {
  insta: {
    id: "instagram",
    categories: [
      {
        titleKey: "reels_downloader",
        links: [
          { href: "/instagram-reels-download", label: "Instagram Reels Download" },
          { href: "/reels-download", label: "Reels Download" },
          { href: "/reels-without-watermark", label: "Reels Without Watermark" },
          { href: "/save-instagram-reels-video", label: "Save Reels Video" },
        ]
      },
      {
        titleKey: "video_media",
        links: [
          { href: "/instagram-video-download", label: "Instagram Video Download" },
          { href: "/instagram-photo-download", label: "Instagram Photo Download" },
          { href: "/instagram-igtv-download", label: "Instagram IGTV Download" },
          { href: "/instagram-audio-download", label: "Instagram Audio Download" },
        ]
      },
      {
        titleKey: "stories_highlights",
        links: [
          { href: "/instagram-story-download", label: "Instagram Story Download" },
          { href: "/instagram-highlights-download", label: "Highlights Download" },
          { href: "/instagram-private-video-download", label: "Private Video Download" },
        ]
      }
    ],
    hoverColor: "hover:text-pink-600 dark:hover:text-pink-500",
    borderColor: "border-pink-500/20"
  },
  fb: {
    id: "facebook",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/facebook-video-download", label: "Facebook Video Download" },
          { href: "/fb-video-download", label: "FB Video Download" },
          { href: "/facebook-video-download-hd", label: "FB Video Download HD" },
          { href: "/facebook-video-saver", label: "Facebook Video Saver" },
        ]
      },
      {
        titleKey: "reels_viral",
        links: [
          { href: "/facebook-reels-download", label: "Facebook Reels Download" },
          { href: "/facebook-viral-reels", label: "Viral Reels Download" },
        ]
      },
      {
        titleKey: "private_tools",
        links: [
          { href: "/facebook-private-video-downloader", label: "Private Video Downloader" },
          { href: "/facebook-story-download", label: "FB Story Download" },
        ]
      }
    ],
    hoverColor: "hover:text-blue-600 dark:hover:text-blue-500",
    borderColor: "border-blue-500/20"
  },
  tiktok: {
    id: "tiktok",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/tiktok-video-download", label: "TikTok Video Download" },
          { href: "/tiktok-downloader", label: "TikTok Downloader" },
          { href: "/tiktok-download-without-watermark", label: "No Watermark Download" },
          { href: "/tiktok-mp4-download", label: "TikTok MP4 Download" },
        ]
      },
      {
        titleKey: "reels_downloader",
        links: [
          { href: "/tiktok-reels-download", label: "TikTok Reels" },
        ]
      }
    ],
    hoverColor: "hover:text-cyan-600 dark:hover:text-cyan-500",
    borderColor: "border-cyan-500/20"
  },
  yt: {
    id: "youtube",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/youtube-video-download", label: "YouTube Video Download" },
          { href: "/youtube-downloader", label: "YouTube Downloader" },
          { href: "/youtube-mp4-download", label: "YouTube MP4 Download" },
          { href: "/youtube-to-mp4", label: "YouTube to MP4" },
        ]
      },
      {
        titleKey: "shorts_playlists",
        links: [
          { href: "/youtube-shorts-download", label: "YouTube Shorts Download" },
          { href: "/youtube-playlist-download", label: "YouTube Playlist Download" },
        ]
      }
    ],
    hoverColor: "hover:text-red-600 dark:hover:text-red-500",
    borderColor: "border-red-500/20"
  },
  snap: {
    id: "snapchat",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/snapchat-video-download", label: "Snapchat Video Download" },
          { href: "/snapchat-video-saver", label: "Snapchat Video Saver" },
          { href: "/snapchat-mp4-download", label: "Snapchat MP4 Download" },
        ]
      },
      {
        titleKey: "stories_spotlight",
        links: [
          { href: "/snapchat-story-download", label: "Snapchat Story Download" },
          { href: "/snapchat-spotlight-download", label: "Spotlight Download" },
        ]
      }
    ],
    hoverColor: "hover:text-yellow-600 dark:hover:text-yellow-500",
    borderColor: "border-yellow-500/20"
  },
  tele: {
    id: "telegram",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/telegram-video-download", label: "Telegram Video Download" },
          { href: "/telegram-downloader", label: "Telegram Downloader" },
          { href: "/telegram-video-saver", label: "Telegram Video Saver" },
        ]
      }
    ],
    hoverColor: "hover:text-sky-600 dark:hover:text-sky-500",
    borderColor: "border-sky-500/20"
  },
  tw: {
    id: "twitter",
    categories: [
      {
        titleKey: "video_downloader",
        links: [
          { href: "/twitter-video-download", label: "Twitter Video Download" },
          { href: "/x-video-download", label: "X Video Download" },
          { href: "/twitter-downloader", label: "Twitter Downloader" },
        ]
      },
      {
        titleKey: "gif_downloader",
        links: [
          { href: "/twitter-gif-download", label: "Twitter GIF Download" },
        ]
      }
    ],
    hoverColor: "hover:text-neutral-600 dark:hover:text-neutral-400",
    borderColor: "border-neutral-500/20"
  }
};
