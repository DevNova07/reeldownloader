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

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const dict = await getDictionary("en");
  const seoPages = dict.platforms?.seo_pages || {};
  
  // Only pre-render the top 30 most popular tools for the main and top local market
  const slugs = Object.keys(seoPages).slice(0, 30).map(key => key.replace(/_/g, "-"));
  const primaryLocales = ["en", "hi"]; 

  const params: { locale: string; slug: string }[] = [];
  primaryLocales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const dict = await getDictionary(locale);
  const jsonKey = slug.replace(/-/g, "_");
  
  const content = (dict as any).platforms.seo_pages?.[jsonKey];
  if (!content) return { title: "Not Found" };

  return {
    title: content.seo?.title || content.title,
    description: content.seo?.desc || content.subtitle,
  };
}

export default async function Page(props: PageProps) {
  const { locale, slug } = await props.params;
  const dict = await getDictionary(locale);
  const jsonKey = slug.replace(/-/g, "_");
  
  const content = (dict as any).platforms.seo_pages?.[jsonKey];
  
  if (!content) {
    notFound();
  }

  // Generate Structured Data (JSON-LD)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": content.title,
    "operatingSystem": "All",
    "applicationCategory": "SocialNetworkingApplication",
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

  // Map slug to template for stable rendering
  const renderTemplate = () => {
    const s = slug.toLowerCase();
    const props = { content, locale: locale as any };

    if (s.includes("facebook") || s.includes("fb-")) return <FacebookPage {...props} />;
    if (s.includes("instagram") || s.includes("insta-") || s.includes("reels-")) return <InstagramPage {...props} />;
    if (s.includes("tiktok")) return <TiktokPage {...props} />;
    if (s.includes("youtube") || s.includes("yt-")) return <YoutubePage {...props} />;
    if (s.includes("snapchat")) return <SnapchatPage {...props} />;
    if (s.includes("twitter") || s.includes("x-video")) return <TwitterPage {...props} />;
    if (s.includes("telegram")) return <TelegramPage {...props} />;
    
    return <InstagramPage {...props} />;
  };

  return (
    <>
      <JSONLD data={softwareSchema} />
      {howToSchema && <JSONLD data={howToSchema} />}
      {faqSchema && <JSONLD data={faqSchema} />}
      {renderTemplate()}
    </>
  );
}
