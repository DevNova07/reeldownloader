"use client"

import * as React from "react"
import Image from "next/image"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/utils/cn"

interface BioAvatarProps {
  avatarUrl: string
  displayName: string
  username: string
  bio: string
  isVerified: boolean
  textColor: string
  accentColor: string
}

export function BioAvatar({ avatarUrl, displayName, username, bio, isVerified, textColor, accentColor }: BioAvatarProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="relative mb-4">
        <div className={cn("absolute -inset-1 rounded-full blur-sm opacity-70", accentColor.replace('text-', 'bg-'))} />
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/10 sm:h-28 sm:w-28 shadow-2xl">
          <Image
            src={avatarUrl}
            alt={displayName}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName) + "&background=random";
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-1">
        <h1 className={cn("text-2xl sm:text-3xl font-black tracking-tight", textColor)}>
          {displayName}
        </h1>
        {isVerified && (
          <BadgeCheck className={cn("h-6 w-6 shrink-0", accentColor)} />
        )}
      </div>
      
      <p className={cn("text-sm sm:text-base font-medium opacity-80 mb-4 tracking-wide uppercase", textColor)}>
        @{username}
      </p>
      
      {bio && (
        <>
          <p className={cn("max-w-md mx-auto text-sm sm:text-base font-medium opacity-90 whitespace-pre-wrap leading-relaxed", textColor)}>
            {bio}
          </p>
          <div className={cn("w-full max-w-[120px] h-px mt-8 opacity-20", accentColor.replace('text-', 'bg-'))} />
        </>
      )}
    </div>
  )
}
