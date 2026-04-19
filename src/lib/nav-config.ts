
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
          { href: "/tiktok-video-downloader", label: "TikTok Video Downloader" },
          { href: "/tiktok-download", label: "TikTok Download" },
          { href: "/tiktok-video-downloader-without-login", label: "TikTok No Login" },
          { href: "/tiktok-4k-video-downloader", label: "TikTok 4K Downloader" },
        ]
      },
      {
        titleKey: "reels_viral",
        links: [
          { href: "/tiktok-video-download-without-watermark", label: "TikTok No Watermark" },
          { href: "/tiktok-private-video-download", label: "TikTok Private Downloader" },
          { href: "/tiktok-hd-audio-downloader", label: "TikTok HD Audio" },
          { href: "/tiktok-mp3-converter-downloader", label: "TikTok MP3 Converter" },
          { href: "/tiktok-no-ads-downloader", label: "TikTok No Ads Saver" },
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
          { href: "/youtube-4k-video-downloader", label: "YouTube 4K Downloader" },
          { href: "/youtube-video-downloader-without-login", label: "YouTube No Login" },
        ]
      },
      {
        titleKey: "shorts_playlists",
        links: [
          { href: "/youtube-shorts-download", label: "YouTube Shorts Download" },
          { href: "/youtube-playlist-download", label: "YouTube Playlist Download" },
          { href: "/youtube-channel-video-download", label: "YouTube Channel Download" },
          { href: "/youtube-private-video-download", label: "YouTube Private Downloader" },
          { href: "/youtube-to-mp3-320kbps", label: "YouTube to MP3 320kbps" },
          { href: "/youtube-video-clips", label: "YouTube Video Clips" },
          { href: "/youtube-video-saver", label: "YouTube Video Saver" },
          { href: "/youtube-hd-audio-downloader", label: "YouTube HD Audio" },
          { href: "/youtube-mp4-converter-downloader", label: "YouTube MP4 Converter" },
          { href: "/youtube-mp3-converter-downloader", label: "YouTube MP3 Converter" },
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
  },
  regional: {
    id: "regional",
    categories: [
      {
        titleKey: "top_locations",
        links: [
          { href: "/instagram-downloader-india", label: "Instagram India" },
          { href: "/facebook-downloader-usa", label: "Facebook USA" },
          { href: "/instagram-downloader-brazil", label: "Instagram Brazil" },
          { href: "/instagram-downloader-indonesia", label: "Instagram Indonesia" },
          { href: "/reels-downloader-pakistan", label: "Reels Pakistan" },
          { href: "/instagram-reels-download-bangladesh", label: "Reels Bangladesh" },
          { href: "/tiktok-download-usa", label: "TikTok USA" },
          { href: "/facebook-video-download-india", label: "FB Video India" },
        ]
      },
      {
        titleKey: "global_reach",
        links: [
          { href: "/instagram-downloader-mexico", label: "Mexico" },
          { href: "/instagram-downloader-germany", label: "Germany" },
          { href: "/instagram-downloader-france", label: "France" },
          { href: "/instagram-downloader-turkey", label: "Turkey" },
          { href: "/instagram-downloader-japan", label: "Japan" },
          { href: "/instagram-downloader-korea", label: "South Korea" },
          { href: "/instagram-downloader-russia", label: "Russia" },
        ]
      }
    ],
    hoverColor: "hover:text-emerald-600 dark:hover:text-emerald-500",
    borderColor: "border-emerald-500/20"
  },
  features: {
    id: "features",
    categories: [
      {
        titleKey: "advanced_tools",
        links: [
          { href: "/instagram-4k-video-downloader", label: "Insta 4K Downloader" },
          { href: "/facebook-no-ads-downloader", label: "FB No Ads Saver" },
          { href: "/youtube-mp3-320kbps", label: "YT to MP3 320kbps" },
          { href: "/tiktok-video-saver-no-login", label: "TikTok No Login" },
          { href: "/instagram-bulk-reels-download", label: "Bulk Reels Saver" },
          { href: "/snapchat-spotlight-saver-hd", label: "Snapchat Spotlight" },
        ]
      },
      {
        titleKey: "pro_features",
        links: [
          { href: "/instagram-high-speed-downloader", label: "High Speed Insta" },
          { href: "/facebook-hd-audio-downloader", label: "FB HD Audio" },
          { href: "/snapchat-gallery-saver-downloader", label: "Snapchat Gallery" },
          { href: "/instagram-private-instagram-video-saver", label: "Private Insta Saver" },
          { href: "/youtube-mp4-downloader-hd", label: "YouTube MP4 HD" },
          { href: "/twitter-video-saver-x", label: "Twitter X Saver" },
        ]
      }
    ],
    hoverColor: "hover:text-amber-600 dark:hover:text-amber-500",
    borderColor: "border-amber-500/20"
  }
};
