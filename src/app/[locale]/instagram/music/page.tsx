import { getSeoAlternates } from "@/lib/seo";
import { getDictionary, type Locale } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const music = dict.platforms.instagram.music;
  
  return {
    title: music.seo.title,
    description: music.seo.desc,
    alternates: getSeoAlternates("instagram/music", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fullDict = await getDictionary(locale);
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      instagram: platforms?.instagram
    }
  };
  const music = platforms?.instagram?.music;
  const contentWithSlug = { ...music, slug: "instagram/music" };

  return <InstagramPage content={contentWithSlug} locale={locale} dict={dict} themeColor="purple" activeTab="music" />;
}
