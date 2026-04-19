export type BioLink = {
  id: string
  title: string
  url: string
  icon?: string // We can use Lucide icon names or URLs
  isHighlighted?: boolean
}

export type BioSocials = {
  instagram?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  facebook?: string
  website?: string
}

export type BioTheme = {
  background: string // e.g. "bg-neutral-900" or "bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
  textColor: string // e.g. "text-white"
  buttonBg: string // e.g. "bg-white/10"
  buttonText: string // e.g. "text-white"
  buttonBorder: string // e.g. "border border-white/20"
  buttonHover: string // e.g. "hover:bg-white/20"
  accentColor: string // e.g. "text-pink-400"
}

export type BioProfileData = {
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  isVerified: boolean
  socials: BioSocials
  links: BioLink[]
  theme: BioTheme
}

export const mockBioProfiles: Record<string, BioProfileData> = {
  demo: {
    username: "demo",
    displayName: "SavClip Official",
    avatarUrl: "/images/mockups/avatar1.webp", // We will use a generic avatar or fallback
    bio: "The ultimate media downloader & creator tool. 🚀\nUpgrade your content game today!",
    isVerified: true,
    socials: {
      instagram: "https://instagram.com/savclip",
      twitter: "https://twitter.com/savclip",
      youtube: "https://youtube.com/savclip",
      tiktok: "https://tiktok.com/@savclip",
    },
    links: [
      { id: "1", title: "Download Insta Reels", url: "/en/reels", icon: "Download", isHighlighted: true },
      { id: "2", title: "Generate Trending Hashtags", url: "/en/hashtags", icon: "Hash" },
      { id: "3", title: "AI Captions Generator", url: "/en/captions", icon: "Wand2" },
      { id: "4", title: "Our Official Blog", url: "/en/blog", icon: "PenTool" },
      { id: "5", title: "Create Your Own Bio", url: "/en/bio", icon: "Compass", isHighlighted: true }
    ],
    theme: {
      background: "bg-black relative overflow-hidden",
      textColor: "text-white",
      buttonBg: "bg-neutral-900/50 backdrop-blur-md",
      buttonText: "text-white font-bold",
      buttonBorder: "border border-neutral-700/50",
      buttonHover: "hover:bg-neutral-800 hover:border-neutral-500 hover:scale-[1.02] transition-all",
      accentColor: "text-blue-500"
    }
  },
  vip_creator: {
    username: "vip_creator",
    displayName: "Sarah Jenkins",
    avatarUrl: "/images/mockups/avatar2.webp",
    bio: "Lifestyle | Fashion | Travel ✈️\nNew YouTube video out now 👇",
    isVerified: false,
    socials: {
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
    links: [
      { id: "1", title: "Watch my Latest Vlog 🎥", url: "#", isHighlighted: true },
      { id: "2", title: "Shop My Outfits 🛍️", url: "#" },
      { id: "3", title: "My Skincare Routine ✨", url: "#" }
    ],
    theme: {
      background: "bg-linear-to-br from-rose-100 to-teal-100",
      textColor: "text-slate-800",
      buttonBg: "bg-white/60 backdrop-blur-xl shadow-xl",
      buttonText: "text-slate-900 font-medium",
      buttonBorder: "border border-white/50",
      buttonHover: "hover:bg-white hover:scale-[1.02] transition-all shadow-rose-200",
      accentColor: "text-rose-500"
    }
  },
  ramzanahmad: {
    username: "ramzanahmad",
    displayName: "Ramzan Ahmad",
    avatarUrl: "/images/founder_portrait.webp",
    bio: "Founder of SavClip 🚀 | Professional Full Stack Developer | Multi-Platform Architect. Building tools that empower creators.",
    isVerified: true,
    socials: {
      instagram: "https://instagram.com/savclip",
      twitter: "https://twitter.com/ramzanahmad",
      website: "https://savclip.net",
    },
    links: [
      { id: "1", title: "Official SavClip Portal 💎", url: "/en", icon: "Download", isHighlighted: true },
      { id: "2", title: "My Portfolio 👨‍💻", url: "/en/about", icon: "Wand2" },
      { id: "3", title: "Contact Me ✉️", url: "mailto:ramzaan0043@gmail.com", icon: "Download" },
    ],
    theme: {
      background: "bg-linear-to-tr from-pink-600/20 via-black to-blue-600/20",
      textColor: "text-white",
      buttonBg: "bg-white/10 backdrop-blur-2xl px-8",
      buttonText: "text-white font-bold",
      buttonBorder: "border border-white/20",
      buttonHover: "hover:bg-pink-600 transition-all hover:scale-[1.05] duration-500",
      accentColor: "text-pink-600"
    }
  }
}
