import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { JSONLD } from "@/components/shared/JSONLD";

// Dynamically import templates for better performance
const FacebookPage = dynamic(() => import("@/components/templates/FacebookPage"));
const InstagramPage = dynamic(() => import("@/components/templates/InstagramPage"));
const SnapchatPage = dynamic(() => import("@/components/templates/SnapchatPage"));
const TiktokPage = dynamic(() => import("@/components/templates/TiktokPage"));
const YoutubePage = dynamic(() => import("@/components/templates/YoutubePage"));
const TwitterPage = dynamic(() => import("@/components/templates/TwitterPage"));
const TelegramPage = dynamic(() => import("@/components/templates/TelegramPage"));
import { locales } from "@/i18n";

const SITE_URL = "https://savclip.com";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const dict = await getDictionary("en");
  const seoPages = dict.platforms?.seo_pages || {};
  
  // Only pre-render the top 30 most popular tools for the main and top local market
  const slugs = Object.keys(seoPages).slice(0, 200).map(key => key.replace(/_/g, "-"));
  const primaryLocales = ["en", "hi"]; 

  const params: { locale: string; slug: string }[] = [];
  primaryLocales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

// Helper to get fallback content based on platform
function getFallbackContent(slug: string, dict: any) {
  const s = slug.toLowerCase();
  let platformKey = "instagram";
  if (s.includes("facebook") || s.includes("fb-")) platformKey = "facebook";
  else if (s.includes("tiktok")) platformKey = "tiktok";
  else if (s.includes("youtube") || s.includes("yt-")) platformKey = "youtube";
  else if (s.includes("snapchat")) platformKey = "snapchat";
  else if (s.includes("twitter") || s.includes("x-video")) platformKey = "twitter";
  else if (s.includes("telegram")) platformKey = "telegram";

  const platformData = dict.platforms[platformKey];
  
  return {
    title: platformData.title,
    subtitle: platformData.subtitle,
    howTo: platformData.howTo,
    seo: platformData.seo,
    faq: platformData.faq,
  };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const dict = await getDictionary(locale);
  const jsonKey = slug.replace(/-/g, "_");
  
  let content = (dict as any).platforms.seo_pages?.[jsonKey];
  
  // Fallback if specific page content is missing
  if (!content) {
    content = getFallbackContent(slug, dict);
  }

  const pageTitle = content.seo?.title || content.title;
  const pageDescription = content.seo?.desc || content.subtitle;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/${slug}`])
      ),
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${SITE_URL}/${locale}/${slug}`,
      siteName: "SavClip",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Page(props: PageProps) {
  const { locale, slug } = await props.params;
  const dict = await getDictionary(locale);
  const jsonKey = slug.replace(/-/g, "_");
  
  let content = (dict as any).platforms.seo_pages?.[jsonKey];
  
  // Fallback if specific page content is missing
  if (!content) {
    content = getFallbackContent(slug, dict);
  }

  // Generate Structured Data (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SavClip",
    "url": SITE_URL,
    "logo": `${SITE_URL}/icon.png`
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": content.title,
    "operatingSystem": "All",
    "applicationCategory": "SocialNetworkingApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12840"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = content.howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": content.howTo.name,
    "description": content.howTo.description,
    "step": content.howTo.steps.map((step: string, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": step
    }))
  } : null;

  const faqSchema = content.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faq.items.map((item: any) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${SITE_URL}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": content.title,
        "item": `${SITE_URL}/${locale}/${slug}`
      }
    ]
  };

  // Create a minimal dictionary slice to pass to templates
  // We keep all essential keys but EXCLUDE the massive 'seo_pages' object
  const { seo_pages, ...platformsWithoutSeoPages } = dict.platforms || {};

  const minimalDict = {
    categories: dict.categories,
    navbar: dict.navbar,
    footer_branding: dict.footer_branding,
    tabs: dict.tabs,
    features: dict.features,
    faq: dict.faq,
    common: dict.common,
    // Provide ONLY the essential platform metadata to the template
    platforms: Object.keys(dict.platforms || {}).reduce((acc: any, key) => {
      if (key !== 'seo_pages') {
        const platform = dict.platforms[key];
        acc[key] = {
          title: platform?.title,
          subtitle: platform?.subtitle,
          howTo: platform?.howTo,
          seo: platform?.seo,
          // Map sub-tools (reels, story, etc)
          ...Object.keys(platform || {}).reduce((pAcc: any, pKey) => {
            if (platform[pKey] && typeof platform[pKey] === 'object' && platform[pKey].title) {
              pAcc[pKey] = { 
                title: platform[pKey].title,
                subtitle: platform[pKey].subtitle,
                howTo: platform[pKey].howTo,
                seo: platform[pKey].seo
              };
            }
            return pAcc;
          }, {})
        };
      }
      return acc;
    }, {})
  };

  // Map slug to template for stable rendering
  const renderTemplate = () => {
    const s = slug.toLowerCase();
    
    // Determine a theme color based on the slug for visual variety
    const colors = ["pink", "amber", "purple"];
    const themeColor = colors[Math.abs(jsonKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length)];
    
    const templateProps = { content: { ...content, slug }, locale: locale as any, themeColor, dict: minimalDict };

    if (s.includes("facebook") || s.includes("fb-")) {
      let activeTab = "video";
      if (s.match(/reels|short/)) activeTab = "reels";
      else if (s.match(/story|stories/)) activeTab = "story";
      else if (s.match(/music|audio|mp3|song/)) activeTab = "music";
      else if (s.includes("private")) activeTab = "private";
      return <FacebookPage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("instagram") || s.includes("insta-") || s.includes("reels-")) {
      let activeTab = "video";
      if (s.match(/reels|short/)) activeTab = "reels";
      else if (s.match(/story|stories|highlights/)) activeTab = "story";
      else if (s.match(/music|audio|mp3|song/)) activeTab = "music";
      else if (s.match(/photo|dp|picture|image/)) activeTab = "photo";
      return <InstagramPage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("tiktok")) {
      let activeTab = "video";
      if (s.match(/music|audio|mp3|song/)) activeTab = "music";
      else if (s.match(/story|stories/)) activeTab = "story";
      else if (s.match(/photo|image/)) activeTab = "photo";
      else if (s.match(/hd|4k/)) activeTab = "hd";
      return <TiktokPage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("youtube") || s.includes("yt-")) {
      let activeTab = "video";
      if (s.match(/shorts|short/)) activeTab = "shorts";
      else if (s.match(/music|audio|mp3|song/)) activeTab = "music";
      else if (s.match(/movie|clip/)) activeTab = "movies";
      else if (s.match(/thumb/)) activeTab = "thumbnail";
      return <YoutubePage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("snapchat")) {
      let activeTab = "video";
      if (s.includes("spotlight")) activeTab = "spotlight";
      else if (s.includes("story") || s.includes("stories")) activeTab = "story";
      return <SnapchatPage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("twitter") || s.includes("x-video")) {
      let activeTab = "video";
      if (s.includes("gif")) activeTab = "gif";
      else if (s.includes("photo") || s.includes("image")) activeTab = "photo";
      else if (s.includes("music") || s.includes("audio")) activeTab = "music";
      return <TwitterPage {...templateProps} activeTab={activeTab} />;
    }
    if (s.includes("telegram")) {
      let activeTab = "video";
      if (s.match(/music|audio|mp3|song/)) activeTab = "music";
      else if (s.match(/photo|image|picture|dp/)) activeTab = "photo";
      else if (s.match(/file|doc|pdf|zip/)) activeTab = "files";
      return <TelegramPage {...templateProps} activeTab={activeTab} />;
    }
    
    return <InstagramPage {...templateProps} />;
  };

  return (
    <>
      <JSONLD data={organizationSchema} />
      <JSONLD data={softwareSchema} />
      {howToSchema && <JSONLD data={howToSchema} />}
      {faqSchema && <JSONLD data={faqSchema} />}
      <JSONLD data={breadcrumbSchema} />
      {renderTemplate()}
    </>
  );
}
