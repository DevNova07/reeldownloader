export const dynamic = "force-dynamic";
import { getDictionary } from "@/i18n";
import TiktokPageTemplate from "@/components/templates/TiktokPage";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const tiktok = dict.platforms.tiktok;
  
  return {
    title: tiktok.story?.seo?.title || tiktok.story?.title || "TikTok Story Downloader",
    description: tiktok.story?.seo?.desc || tiktok.story?.subtitle || "Download TikTok Stories",
    alternates: getSeoAlternates("tiktok/story", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <TiktokPageTemplate 
      content={dict.platforms.tiktok.story} 
      locale={locale} 
      dict={dict} 
      activeTab="story"
    />
  );
}
