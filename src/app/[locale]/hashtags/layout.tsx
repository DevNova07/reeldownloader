import { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  
  return {
    metadataBase: new URL("https://savclip.net"),
    title: `AI Hashtag Generator - Viral Social Media Tags | SavClip`,
    description: `Generate viral hashtags for Instagram, TikTok, and more using our AI tool. Boost your reach and engagement instantly.`,
  };
}

export default function HashtagsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
