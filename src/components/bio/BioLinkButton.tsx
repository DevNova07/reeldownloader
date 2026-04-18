import * as React from "react"
import Link from "next/link"
import { ExternalLink, Play, Hash, Wand2, Download, PenTool, Youtube, Video, ShoppingCart } from "lucide-react"
import { cn } from "@/utils/cn"

interface BioLinkButtonProps {
  title: string
  url: string
  icon?: string
  isHighlighted?: boolean
  buttonBg: string
  buttonText: string
  buttonBorder: string
  buttonHover: string
}

export function BioLinkButton({ title, url, icon, isHighlighted, buttonBg, buttonText, buttonBorder, buttonHover }: BioLinkButtonProps) {
  // Simple icon mapper
  const renderIcon = () => {
    switch (icon?.toLowerCase()) {
      case 'download': return <Download className="h-5 w-5" />;
      case 'hash': return <Hash className="h-5 w-5" />;
      case 'wand2': return <Wand2 className="h-5 w-5" />;
      case 'pentool': return <PenTool className="h-5 w-5" />;
      case 'youtube': return <Youtube className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'shoppingcart': return <ShoppingCart className="h-5 w-5" />;
      default: return null;
    }
  }

  const TheIcon = renderIcon()

  // Use standard a tag if external link, otherwise Next Link
  const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url === '#';
  
  const content = (
    <div className={cn(
      "w-full rounded-2xl py-4 px-6 flex items-center justify-between group cursor-pointer",
      buttonBg, buttonText, buttonBorder, buttonHover,
      isHighlighted ? "ring-2 ring-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : ""
    )}>
      <div className="flex items-center gap-4">
        {TheIcon && (
          <div className="flex-shrink-0 transition-transform group-hover:scale-110">
            {TheIcon}
          </div>
        )}
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <ExternalLink className="h-5 w-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-50 group-hover:translate-x-0" />
    </div>
  )

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full">
        {content}
      </a>
    )
  }

  return (
    <Link href={url} className="block w-full">
      {content}
    </Link>
  )
}
