import React from "react";
import { HelpCircle } from "lucide-react";

export function FAQSection({ platform, items }: { platform: string, items?: {q: string, a: string}[] }) {
  const getDynamicFAQs = (p: string) => {
    // If unique SEO FAQs are provided from the page, ALWAYS use them to prevent Google Schema mismatch
    if (items && items.length > 0) {
      return items;
    }

    const pLower = p.toLowerCase();
    
    // Base FAQs tailored to the platform name
    const faqs = [
      { 
        q: `Is there a limit to how many ${p} files I can download?`, 
        a: `No, SavClip provides unlimited downloads for ${p}. You can save as much media as you want without any restrictions or hidden fees.` 
      }
    ];

    // Conditional FAQs based on keywords
    if (pLower.includes("video") || pLower.includes("reels") || pLower.includes("shorts")) {
      faqs.push({
        q: `What video quality can I expect from the ${p} downloader?`,
        a: `Our system extracts the highest available resolution from the source servers. For ${p}, this typically means crisp 1080p Full HD or even 4K quality, provided the original uploader uploaded it in that resolution.`
      });
    }

    if (pLower.includes("tiktok") || pLower.includes("watermark") || pLower.includes("reels")) {
      faqs.push({
        q: `Will my downloaded ${p} have a watermark or logo?`,
        a: `Absolutely not. Our specialized API bridges directly to the backend servers to fetch the raw file before any watermarks or creator logos are applied, ensuring a 100% clean video.`
      });
    }

    if (pLower.includes("audio") || pLower.includes("mp3") || pLower.includes("song")) {
      faqs.push({
        q: `Can I convert ${p} directly to an MP3 file?`,
        a: `Yes, our extraction engine automatically strips the video stream and converts the audio track into a high-bitrate MP3 file (up to 320kbps), ready for your music player.`
      });
    }

    if (pLower.includes("photo") || pLower.includes("dp") || pLower.includes("carousel") || pLower.includes("story")) {
      faqs.push({
        q: `Can I download private ${p} content?`,
        a: `To protect user privacy and comply with network policies, our tool can only fetch media from public accounts. If a profile is set to private, our servers cannot access the ${p} link.`
      });
    }

    // Add generic fallback FAQs if we have less than 3
    if (faqs.length < 3) {
      faqs.push({
        q: `Do I need to install an app to download ${p}?`,
        a: `No installation is required. SavClip is a fully web-based utility. You can use it directly within your Safari, Chrome, or Firefox browser on both mobile and desktop devices.`
      });
      faqs.push({
        q: `Is it legal to download ${p} for personal use?`,
        a: `Downloading content for personal, offline viewing is generally acceptable. However, we strictly advise against redistributing, uploading, or commercializing downloaded media without explicit permission from the original copyright owner.`
      });
    }

    // Ensure we return exactly 3 to maintain consistent UI
    return faqs.slice(0, 3);
  };

  const activeFAQs = getDynamicFAQs(platform);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest leading-tight text-center mb-16">
          {platform} FAQs
        </h2>
        <div className="space-y-6">
          {activeFAQs.map((faq, i) => (
            <div key={i} className="p-8 bg-white dark:bg-neutral-900 rounded-4xl shadow-md border border-neutral-100 dark:border-neutral-800 transition-all hover:shadow-2xl">
              <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-4 flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed ml-8 text-justify md:text-left hyphens-auto">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
