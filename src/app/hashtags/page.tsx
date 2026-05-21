import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { HashtagsView } from "./HashtagsView"
import { CategoryCards } from "@/components/layout/CategoryCards"


export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "AI Hashtag Generator | Viral Social Media Tags | SavClip",
  description: "Discover trending and viral tags with SavClip's free AI Hashtag Generator. Boost your impressions and likes across all major social media networks.",
    alternates: getSeoAlternates("hashtags", 'en'),
   
  }
}

export default function Page() {
  return (
    <>
      <SearchHeader 
        title="AI Hashtag Generator"
        subtitle="Your reliable companion for fetching Hashtags media in original quality."
        hideSearchBar={true}
      />
      
      <HashtagsView />

      <FeaturesSection platform="hashtags" />
      <CategoryCards />
      <FAQSection platform="hashtags" />

    </>
  )
}
