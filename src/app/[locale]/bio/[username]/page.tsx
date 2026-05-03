import * as React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { mockBioProfiles } from "@/data/bioProfiles"
import { BioAvatar } from "@/components/bio/BioAvatar"
import { BioLinkButton } from "@/components/bio/BioLinkButton"
import { BioSocialIcons } from "@/components/bio/BioSocialIcons"
import { cn } from "@/utils/cn"

export default async function BioProfilePage({ params }: { params: Promise<{ locale: string, username: string }> | { locale: string, username: string } }) {
  // Ensure we await params properly for Next 16 conventions if it's treated as a Promise
  const resolvedParams = await Promise.resolve(params);
  const { username } = resolvedParams;
  
  const profile = mockBioProfiles[username]

  if (!profile) {
    notFound()
  }

  const { theme, socials, links } = profile

  return (
    <div className={cn("min-h-screen w-full flex flex-col items-center py-12 px-4 sm:py-20", theme.background)}>
      <div className="w-full max-w-xl mx-auto relative z-10 flex flex-col pt-8">
        
        <BioAvatar 
          avatarUrl={profile.avatarUrl}
          displayName={profile.displayName}
          username={profile.username}
          bio={profile.bio}
          isVerified={profile.isVerified}
          textColor={theme.textColor}
          accentColor={theme.accentColor}
        />

        <BioSocialIcons 
          socials={socials} 
          textColor={theme.textColor} 
        />

        <div className="flex flex-col gap-4 mt-6 w-full">
          {links.map((link) => (
            <BioLinkButton 
              key={link.id}
              title={link.title}
              url={link.url}
              icon={link.icon}
              isHighlighted={link.isHighlighted}
              buttonBg={theme.buttonBg}
              buttonText={theme.buttonText}
              buttonBorder={theme.buttonBorder}
              buttonHover={theme.buttonHover}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/en/bio" 
            className={cn("text-xs font-bold tracking-widest uppercase italic opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center gap-2", theme.textColor)}
          >
            <span className={theme.accentColor}>⚡</span> Created with SavClip
          </Link>
        </div>
      </div>
    </div>
  )
}
