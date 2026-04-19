import * as React from "react"
import { Check, X, Shield, Zap, Globe, Smartphone } from "lucide-react"

interface ComparisonItem {
  feature: string
  savclip: boolean | string
  competitor: boolean | string
}

interface ComparisonTableProps {
  title?: string
  platformName: string
  items?: ComparisonItem[]
}

const defaultItems: ComparisonItem[] = [
  { feature: "Download Speed", savclip: "Ultra-Fast", competitor: "Slow/Average" },
  { feature: "Video Quality", savclip: "Up to 4K/HD", competitor: "Compressed 720p" },
  { feature: "No Watermark", savclip: true, competitor: false },
  { feature: "No Login Required", savclip: true, competitor: false },
  { feature: "Safe & Secure", savclip: true, competitor: "Ad-heavy/Risky" },
  { feature: "Mobile Optimized", savclip: true, competitor: "Desktop-mostly" },
]

export function ComparisonTable({ 
  title, 
  platformName, 
  items = defaultItems 
}: ComparisonTableProps) {
  return (
    <div className="my-16 overflow-hidden rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-2xl">
      <div className="bg-linear-to-r from-pink-600 to-purple-600 px-8 py-6">
        <h3 className="text-xl font-black text-white uppercase italic tracking-widest text-center">
          {title || `SavClip vs. Alternative ${platformName} Downloaders`}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-900/50">
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Feature</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-pink-600 text-center">SavClip</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 text-center">Others</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/10 transition-colors">
                <td className="px-8 py-5 text-sm font-bold text-neutral-900 dark:text-white">
                  {item.feature}
                </td>
                <td className="px-8 py-5 text-center">
                  {typeof item.savclip === "boolean" ? (
                    item.savclip ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    <span className="text-sm font-black text-pink-600 uppercase italic">{item.savclip}</span>
                  )}
                </td>
                <td className="px-8 py-5 text-center">
                   {typeof item.competitor === "boolean" ? (
                    item.competitor ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    <span className="text-sm font-bold text-neutral-400 uppercase italic opacity-60">{item.competitor}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
