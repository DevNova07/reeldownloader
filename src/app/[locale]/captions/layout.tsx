import { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { type Locale } from "@/i18n";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);
  
  return {
    title: `AI Caption Generator - Viral Social Media Hooks | SavClip`,
    description: `Generate viral captions for Instagram, TikTok, and more using our AI tool. Elevate your storytelling and engage your audience.`,
  };
}

export default function CaptionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
