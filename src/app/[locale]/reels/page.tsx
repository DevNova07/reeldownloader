import { getSeoAlternates } from "@/lib/seo";
import { getDictionary, type Locale } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const reels = dict.platforms.instagram.reels;
  
  return {
    title: reels.seo.title,
    description: reels.seo.desc,
    alternates: getSeoAlternates("reels", locale),
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
  const reels = platforms?.instagram?.reels;

  return <InstagramPage content={reels} locale={locale} dict={dict} themeColor="pink" />;
}
