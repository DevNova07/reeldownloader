import { getSeoAlternates } from "@/lib/seo";
import { getDictionary, type Locale } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  // Assuming 'photo' exists in platforms.instagram
  const photo = dict.platforms.instagram.photo || dict.platforms.instagram.reels; 
  
  return {
    title: photo.seo?.title || photo.title,
    description: photo.seo?.desc || photo.subtitle,
    alternates: getSeoAlternates("instagram/photo", locale),
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
  const photo = platforms?.instagram?.photo || platforms?.instagram?.reels;
  const contentWithSlug = { ...photo, slug: "instagram/photo" };

  return <InstagramPage content={contentWithSlug} locale={locale} dict={dict} themeColor="pink" activeTab="photo" />;
}
