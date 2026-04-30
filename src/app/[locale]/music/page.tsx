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
    alternates: {
      canonical: `https://savclip.net/${locale}/music`,
    },
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

  return <InstagramPage content={music} locale={locale} dict={dict} themeColor="purple" />;
}
