import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "Telegram Channel Link Generator – Create Custom TG Links | SavClip",
  description: "Generate custom invite links for Telegram channels and groups. Build clean join paths for your subscribers effortlessly.",
    alternates: getSeoAlternates("telegram-channel-link-generator", params.locale),
   
  }
}

export default function Page() {
  return (
    <>
      <SearchHeader 
        title="Telegram Channel Link Generator"
        title1="Download"
        title2="Telegram Channel Link Generator"
        title3="Free & Fast"
        subtitle="The premium online tool to capture Telegram media without any hassle."
      />
      <FeaturesSection platform="telegram" />
      <FAQSection platform="telegram" />
    </>
  )
}
