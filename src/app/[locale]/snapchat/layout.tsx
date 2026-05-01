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
    title: dict.platforms.snapchat.seo.title,
    description: dict.platforms.snapchat.seo.desc,
    alternates: getSeoAlternates("snapchat", locale),
  };
}

export default function SnapchatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
