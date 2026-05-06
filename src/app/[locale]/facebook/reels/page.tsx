export const dynamic = "force-dynamic";
import { getDictionary } from "@/i18n";
import FacebookPage from "@/components/templates/FacebookPage";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const fb = dict.platforms.facebook;
  
  return {
    title: fb.reels?.seo?.title || fb.reels?.title || "Facebook Reels Downloader",
    description: fb.reels?.seo?.desc || fb.reels?.subtitle || "Download Facebook Reels",
    alternates: getSeoAlternates("facebook/reels", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <FacebookPage 
      content={dict.platforms.facebook.reels} 
      locale={locale} 
      dict={dict} 
      activeTab="reels"
    />
  );
}
