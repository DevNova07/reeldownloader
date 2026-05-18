import React from "react";
import { CheckCircle2, Zap, ShieldCheck, Monitor, Video, Smartphone, Layers, Music } from "lucide-react";

export function FeaturesSection({ platform }: { platform: string }) {
  const getDynamicFeatures = (p: string) => {
    const pLower = p.toLowerCase();
    
    // Base features that adapt to the platform name
    const features = [
      { 
        title: `Fast ${p} Extraction`, 
        desc: `Our advanced backend servers fetch ${p} content directly from the source API, ensuring zero delays and instant downloads.`,
        icon: <Zap className="h-6 w-6 text-yellow-500" />
      },
      { 
        title: "100% Anonymous & Secure", 
        desc: `You do not need to log into your account to save ${p} media. We never track your download history.`,
        icon: <ShieldCheck className="h-6 w-6 text-green-500" />
      }
    ];

    // Conditional features based on keywords
    if (pLower.includes("video") || pLower.includes("reels") || pLower.includes("shorts")) {
      features.push({
        title: "Original HD Quality",
        desc: `We extract the uncompressed ${p} file, giving you crisp Full HD and 4K resolutions exactly as uploaded by the creator.`,
        icon: <Monitor className="h-6 w-6 text-cyan-500" />
      });
    }

    if (pLower.includes("tiktok") || pLower.includes("watermark")) {
      features.push({
        title: "No Watermark Guarantee",
        desc: `Say goodbye to annoying logos. We bypass the rendering engine to give you a completely clean, unbranded video file.`,
        icon: <Video className="h-6 w-6 text-pink-500" />
      });
    }

    if (pLower.includes("audio") || pLower.includes("mp3")) {
      features.push({
        title: "High Bitrate MP3",
        desc: `Convert and save ${p} audio in top-tier 320kbps format, perfect for music libraries and offline listening.`,
        icon: <Music className="h-6 w-6 text-purple-500" />
      });
    }

    if (pLower.includes("photo") || pLower.includes("dp") || pLower.includes("carousel")) {
      features.push({
        title: "Original Resolution Images",
        desc: `Download pictures without the heavy compression applied by social apps. Get the raw, high-quality image file instantly.`,
        icon: <Layers className="h-6 w-6 text-indigo-500" />
      });
    }

    // Add a generic device feature if we only have 2 or 3
    if (features.length < 3) {
      features.push({
        title: "Works on All Devices",
        desc: `Whether you are using an iPhone, Android, Mac, or Windows PC, this ${p} tool works perfectly in any web browser.`,
        icon: <Smartphone className="h-6 w-6 text-blue-500" />
      });
    }

    // Ensure we only return 3 to maintain the UI grid
    return features.slice(0, 3);
  };

  const activeFeatures = getDynamicFeatures(platform);

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white leading-tight text-center mb-16">
          Premium Features for {platform}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeFeatures.map((feature, i) => (
            <div key={i} className="p-8 bg-white dark:bg-neutral-900 rounded-4xl shadow-xl border border-neutral-100 dark:border-neutral-800 transition-all hover:scale-105 group">
              <div className="h-14 w-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 font-bold leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
