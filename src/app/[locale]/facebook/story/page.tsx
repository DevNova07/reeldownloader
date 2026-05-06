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
    title: fb.story?.seo?.title || fb.story?.title || "Facebook Story Downloader",
    description: fb.story?.seo?.desc || fb.story?.subtitle || "Download Facebook Stories",
    alternates: getSeoAlternates("facebook/story", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <FacebookPage 
      content={{ ...dict.platforms.facebook.story, subtitle: "Save Stories Online in HD Quality" }} 
      locale={locale} 
      dict={dict} 
      activeTab="story"
    />
  );
}
