import { getSeoAlternates } from "@/lib/seo";
import { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  
  return {
    metadataBase: new URL("https://savclip.net"),
    title: dict.platforms.telegram.seo.title,
    description: dict.platforms.telegram.seo.desc,
    alternates: getSeoAlternates("telegram", locale),
  };
}

export default function TelegramLayout({ children }: { children: React.ReactNode }) {
  return children;
}
