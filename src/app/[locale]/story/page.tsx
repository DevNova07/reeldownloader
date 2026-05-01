import { getSeoAlternates } from "@/lib/seo";
import { getDictionary, type Locale } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const story = dict.platforms.instagram.story;
  
  return {
    title: story.seo.title,
    description: story.seo.desc,
    alternates: getSeoAlternates("story", locale),
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
  const story = platforms?.instagram?.story;

  return <InstagramPage content={story} locale={locale} dict={dict} themeColor="amber" />;
}
