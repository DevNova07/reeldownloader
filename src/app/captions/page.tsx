import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { CaptionsView } from "./CaptionsView"
import { CategoryCards } from "@/components/layout/CategoryCards"


export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "AI Caption Generator | Write Engaging Captions | SavClip",
  description: "Generate highly engaging, viral captions for your videos using SavClip's free AI tool. Perfect for increasing retention on Reels, Shorts, and TikTok.",
    alternates: getSeoAlternates("captions", 'en'),
   
  }
}

export default function Page() {
  return (
    <>
      <SearchHeader 
        title="AI Caption Generator"
        subtitle="The premium online tool to capture Captions media without any hassle."
        hideSearchBar={true}
      />
      
      <CaptionsView />

      <FeaturesSection platform="captions" />
      <CategoryCards />
      <FAQSection platform="captions" />

    </>
  )
}
