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
  home: {
    id: "home",
    categories: [],
    hoverColor: "hover:text-indigo-600 dark:hover:text-indigo-500",
    borderColor: "border-indigo-500/20"
  },
  insta: {
    id: "insta",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/instagram-story-viewer", label: "Instagram Story Viewer" },
          { href: "/instagram-video-downloader", label: "Instagram Video Downloader" },
          { href: "/instagram-reels-downloader", label: "Instagram Reels Downloader" },
          { href: "/instagram-photo-downloader", label: "Instagram Photo Downloader" },
          { href: "/instagram-story-downloader", label: "Instagram Story Downloader" },
          { href: "/instagram-highlights-downloader", label: "Instagram Highlights Downloader" },
          { href: "/instagram-audio-downloader", label: "Instagram Audio Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/instagram-private-downloader", label: "Instagram Private Downloader" },
          { href: "/instagram-dp-downloader", label: "Instagram DP Downloader" },
          { href: "/instagram-video-compressor", label: "Instagram Video Compressor" },
          { href: "/instagram-video-converter", label: "Instagram Video Converter" },
          { href: "/instagram-carousel-downloader", label: "Instagram Carousel Downloader" },
          { href: "/instagram-reels-viewer", label: "Instagram Reels Viewer" },
          { href: "/instagram-profile-viewer", label: "Instagram Profile Viewer" }
        ]
      }
    ],
    hoverColor: "hover:text-pink-600 dark:hover:text-pink-500",
    borderColor: "border-pink-500/20"
  },
  fb: {
    id: "fb",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/facebook-video-downloader", label: "Facebook Video Downloader" },
          { href: "/facebook-reels-downloader", label: "Facebook Reels Downloader" },
          { href: "/facebook-story-saver", label: "Facebook Story Saver" },
          { href: "/facebook-private-video-downloader", label: "Facebook Private Video Downloader" },
          { href: "/facebook-photo-downloader", label: "Facebook Photo Downloader" },
          { href: "/facebook-album-downloader", label: "Facebook Album Downloader" },
          { href: "/facebook-live-video-downloader", label: "Facebook Live Video Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/facebook-dp-downloader", label: "Facebook DP Downloader" },
          { href: "/facebook-group-video-downloader", label: "Facebook Group Video Downloader" },
          { href: "/facebook-audio-downloader", label: "Facebook Audio Downloader" },
          { href: "/facebook-anonymous-story-viewer", label: "Facebook Anonymous Story Viewer" },
          { href: "/facebook-profile-viewer", label: "Facebook Profile Viewer" },
          { href: "/facebook-video-to-mp4-converter", label: "Facebook Video to MP4 Converter" },
          { href: "/facebook-video-compressor", label: "Facebook Video Compressor" },
          { href: "/facebook-page-audit-tool", label: "Facebook Page Audit Tool" }
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
        titleKey: "Main Tools",
        links: [
          { href: "/tiktok-video-downloader", label: "TikTok Video Downloader" },
          { href: "/tiktok-downloader-without-watermark", label: "TikTok Downloader Without Watermark" },
          { href: "/tiktok-shorts-downloader", label: "TikTok Shorts Downloader" },
          { href: "/tiktok-mp3-downloader", label: "TikTok MP3 Downloader" },
          { href: "/tiktok-story-saver", label: "TikTok Story Saver" },
          { href: "/tiktok-photo-downloader", label: "TikTok Photo Downloader" },
          { href: "/tiktok-dp-downloader", label: "TikTok DP Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/anonymous-tiktok-viewer", label: "Anonymous TikTok Viewer" },
          { href: "/tiktok-private-video-downloader", label: "TikTok Private Video Downloader" },
          { href: "/tiktok-trending-hashtag-generator", label: "TikTok Trending Hashtag Generator" },
          { href: "/tiktok-caption-generator", label: "TikTok Caption Generator" },
          { href: "/tiktok-video-to-mp4-converter", label: "TikTok Video to MP4 Converter" },
          { href: "/tiktok-video-compressor", label: "TikTok Video Compressor" },
          { href: "/tiktok-song-finder", label: "TikTok Song Finder" },
          { href: "/download-tiktok-without-watermark", label: "Download TikTok Without Watermark" }
        ]
      }
    ],
    hoverColor: "hover:text-cyan-600 dark:hover:text-cyan-500",
    borderColor: "border-cyan-500/20"
  },
  yt: {
    id: "yt",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/youtube-video-downloader", label: "YouTube Video Downloader" },
          { href: "/youtube-shorts-downloader", label: "YouTube Shorts Downloader" },
          { href: "/youtube-to-mp3-converter", label: "YouTube to MP3 Converter" },
          { href: "/youtube-to-mp4-converter", label: "YouTube to MP4 Converter" },
          { href: "/youtube-thumbnail-downloader", label: "YouTube Thumbnail Downloader" },
          { href: "/youtube-playlist-downloader", label: "YouTube Playlist Downloader" },
          { href: "/youtube-subtitle-downloader", label: "YouTube Subtitle Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/youtube-channel-audit-tool", label: "YouTube Channel Audit Tool" },
          { href: "/youtube-tag-generator", label: "YouTube Tag Generator" },
          { href: "/youtube-description-generator", label: "YouTube Description Generator" },
          { href: "/youtube-title-generator", label: "YouTube Title Generator" },
          { href: "/youtube-region-restriction-checker", label: "YouTube Region Restriction Checker" },
          { href: "/youtube-video-cutter", label: "YouTube Video Cutter" },
          { href: "/youtube-comment-picker", label: "YouTube Comment Picker" },
          { href: "/download-youtube-videos-safely", label: "Download YouTube Videos Safely" }
        ]
      }
    ],
    hoverColor: "hover:text-red-600 dark:hover:text-red-500",
    borderColor: "border-red-500/20"
  },
  snap: {
    id: "snap",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/snapchat-video-downloader", label: "Snapchat Video Downloader" },
          { href: "/snapchat-spotlight-downloader", label: "Snapchat Spotlight Downloader" },
          { href: "/snapchat-stories-downloader", label: "Snapchat Story Downloader" },
          { href: "/snapchat-photo-downloader", label: "Snapchat Photo Downloader" },
          { href: "/snapchat-audio-downloader", label: "Snapchat MP3 Downloader" },
          { href: "/snapchat-dp-downloader", label: "Snapchat DP Downloader" },
          { href: "/snapchat-map-downloader", label: "Snapchat Map Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/snapchat-lens-saver", label: "Snapchat Lens Saver" },
          { href: "/snapchat-private-story-downloader", label: "Snapchat Private Story Downloader" },
          { href: "/snapchat-anonymous-viewer", label: "Snapchat Anonymous Viewer" },
          { href: "/snapchat-video-compressor", label: "Snapchat Video Compressor" },
          { href: "/snapchat-video-to-mp4-converter", label: "Snapchat Video to MP4 Converter" },
          { href: "/snapchat-profile-viewer", label: "Snapchat Profile Viewer" },
          { href: "/snapchat-memories-downloader", label: "Snapchat Memories Downloader" },
          { href: "/download-snapchat-videos-safely", label: "Download Snapchat Safely" }
        ]
      }
    ],
    hoverColor: "hover:text-yellow-600 dark:hover:text-yellow-500",
    borderColor: "border-yellow-500/20"
  },
  tw: {
    id: "tw",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/x-video-downloader", label: "X Video Downloader" },
          { href: "/x-gif-downloader", label: "X GIF Downloader" },
          { href: "/x-media-downloader", label: "X Media Downloader" },
          { href: "/x-thread-downloader", label: "X Thread Downloader" },
          { href: "/x-audio-downloader", label: "X Audio Downloader" },
          { href: "/x-profile-picture-downloader", label: "X Profile Picture Downloader" },
          { href: "/x-space-downloader", label: "X Space Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/x-private-video-downloader", label: "X Private Video Downloader" },
          { href: "/x-banner-downloader", label: "X Banner Downloader" },
          { href: "/x-trending-hashtag-finder", label: "X Trending Hashtag Finder" },
          { href: "/x-analytics-viewer", label: "X Analytics Viewer" },
          { href: "/x-video-to-mp4-converter", label: "X Video to MP4 Converter" },
          { href: "/x-video-compressor", label: "X Video Compressor" },
          { href: "/x-bio-generator", label: "X Bio Generator" },
          { href: "/download-x-videos", label: "Download X Videos" }
        ]
      }
    ],
    hoverColor: "hover:text-neutral-600 dark:hover:text-neutral-400",
    borderColor: "border-neutral-500/20"
  },
  tele: {
    id: "tele",
    categories: [
      {
        titleKey: "Main Tools",
        links: [
          { href: "/telegram-video-downloader", label: "Telegram Video Downloader" },
          { href: "/telegram-photo-downloader", label: "Telegram Photo Downloader" },
          { href: "/telegram-story-saver", label: "Telegram Story Saver" },
          { href: "/telegram-private-video-downloader", label: "Telegram Private Downloader" },
          { href: "/telegram-restricted-content-downloader", label: "Telegram Restricted Content" },
          { href: "/telegram-audio-downloader", label: "Telegram Audio Downloader" },
          { href: "/telegram-file-downloader", label: "Telegram File Downloader" }
        ]
      },
      {
        titleKey: "Advanced Tools",
        links: [
          { href: "/telegram-dp-downloader", label: "Telegram DP Downloader" },
          { href: "/telegram-gif-downloader", label: "Telegram GIF Downloader" },
          { href: "/telegram-trending-channel-finder", label: "Telegram Trending Channels" },
          { href: "/telegram-channel-link-generator", label: "Telegram Channel Link Maker" },
          { href: "/telegram-video-to-mp4-converter", label: "Telegram to MP4 Converter" },
          { href: "/telegram-video-compressor", label: "Telegram Video Compressor" },
          { href: "/telegram-bio-generator", label: "Telegram Bio Generator" }
        ]
      }
    ],
    hoverColor: "hover:text-sky-600 dark:hover:text-sky-500",
    borderColor: "border-sky-500/20"
  },
  hashtags: {
    id: "hashtags",
    categories: [
      {
        titleKey: "ai_engagement_tools",
        links: [
          { href: "/hashtags", label: "AI Hashtags" },
          { href: "/captions", label: "Caption AI" },
          { href: "/bio", label: "Link-in-Bio" },

        ]
      }
    ],
    hoverColor: "hover:text-purple-600 dark:hover:text-purple-500",
    borderColor: "border-purple-500/20"
  }
};
