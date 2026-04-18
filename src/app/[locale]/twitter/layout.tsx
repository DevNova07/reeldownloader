import { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.platforms.twitter.seo.title,
    description: dict.platforms.twitter.seo.desc,
  };
}

export default function TwitterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
