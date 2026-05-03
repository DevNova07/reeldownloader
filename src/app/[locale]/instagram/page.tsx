import { getSeoAlternates } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import InstagramPage from "@/components/templates/InstagramPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const insta = dict.platforms.instagram;
  
  return {
    title: insta.seo.title,
    description: insta.seo.desc,
    alternates: getSeoAlternates("instagram", locale),
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
  const insta = platforms?.instagram;

  return <InstagramPage content={insta} locale={locale} dict={dict} activeTab="video" />;
}
