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
    title: fb.music?.seo?.title || fb.music?.title || "Facebook Music Downloader",
    description: fb.music?.seo?.desc || fb.music?.subtitle || "Download Facebook Music",
    alternates: getSeoAlternates("facebook/music", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <FacebookPage 
      content={{ ...dict.platforms.facebook.music, subtitle: "Download Facebook Music & Audio MP3" }} 
      locale={locale} 
      dict={dict} 
      activeTab="music"
    />
  );
}
