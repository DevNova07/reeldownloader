import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "Telegram Restricted Content Downloader | SavClip",
  description: "Download Telegram media effortlessly. We preserve the original source quality so you never miss a single detail.",
    alternates: getSeoAlternates("telegram-restricted-content-downloader", params.locale),
   
  }
}

export default function Page() {
  return (
    <>
      <SearchHeader 
        title="Telegram Restricted Content Downloader"
        title1="Download"
        title2="Telegram Restricted Content Downloader"
        title3="Free & Fast"
        subtitle="Your reliable companion for fetching Telegram media in original quality."
      />
      <FeaturesSection platform="telegram" />
      <FAQSection platform="telegram" />
    </>
  )
}
