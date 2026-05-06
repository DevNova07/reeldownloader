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
    title: tiktok.music?.seo?.title || tiktok.music?.title || "TikTok Music Downloader",
    description: tiktok.music?.seo?.desc || tiktok.music?.subtitle || "Download TikTok Music",
    alternates: getSeoAlternates("tiktok/music", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <TiktokPageTemplate 
      content={dict.platforms.tiktok.music} 
      locale={locale} 
      dict={dict} 
      activeTab="music"
    />
  );
}
