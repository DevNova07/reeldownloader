import * as React from "react"
import { Facebook, Instagram, Twitter, Youtube, Link as LinkIcon } from "lucide-react"

// Define a custom TikTok icon since lucide might not have a perfect one
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

interface BioSocialIconsProps {
  socials: {
    instagram?: string
    twitter?: string
    youtube?: string
    tiktok?: string
    facebook?: string
    website?: string
  }
  textColor: string
}

export function BioSocialIcons({ socials, textColor }: BioSocialIconsProps) {
  const iconClasses = `h-7 w-7 transition-transform hover:scale-110 hover:-rotate-6 opacity-80 hover:opacity-100 ${textColor}`

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-4">
      {socials.instagram && (
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className={iconClasses} />
        </a>
      )}
      {socials.tiktok && (
        <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <TikTokIcon className={iconClasses} />
        </a>
      )}
      {socials.youtube && (
        <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <Youtube className={iconClasses} />
        </a>
      )}
      {socials.twitter && (
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter className={iconClasses} />
        </a>
      )}
      {socials.facebook && (
        <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook className={iconClasses} />
        </a>
      )}
      {socials.website && (
        <a href={socials.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
          <LinkIcon className={iconClasses} />
        </a>
      )}
    </div>
  )
}
