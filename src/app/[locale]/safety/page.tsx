import * as React from "react"
import { ShieldCheck } from "lucide-react"

export default function SafetyPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="flex items-center gap-3 text-4xl font-black tracking-tight uppercase italic text-neutral-900 dark:text-white mb-12">
           <ShieldCheck className="h-10 w-10 text-green-500" />
           Safety Tips
        </h1>
        
        <div className="prose prose-green dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
          <p className="text-lg leading-relaxed mb-8">
            Your safety online is important to us. Here are some key tips to keep in mind when downloading media from social platforms.
          </p>
          <ul className="space-y-4">
             <li className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-neutral-700 dark:text-neutral-300">
                <span className="font-bold text-green-600 dark:text-green-400">01.</span>
                <span><strong>Respect Copyright.</strong> Always make sure you have the right to download and use the media. Never distribute or monetize content you do not own.</span>
             </li>
             <li className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-neutral-700 dark:text-neutral-300">
                <span className="font-bold text-green-600 dark:text-green-400">02.</span>
                <span><strong>Beware of Scams.</strong> SavClip will never ask you for passwords, login credentials, or credit card information. Avoid sites that require you to log in to download public content.</span>
             </li>
             <li className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-neutral-700 dark:text-neutral-300">
                <span className="font-bold text-green-600 dark:text-green-400">03.</span>
                <span><strong>Check Links.</strong> Only paste valid URLs from trusted platforms (like Instagram, TikTok, etc). Be cautious of shortened links from unknown sources.</span>
             </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
