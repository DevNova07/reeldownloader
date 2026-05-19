import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { BioView } from "./BioView"
import { CategoryCards } from "@/components/layout/CategoryCards"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "AI Social Bio Generator | Smart Link-in-Bio | SavClip",
  description: "Create stunning and highly optimized link-in-bio profiles with SavClip's free AI Social Bio Generator. Maximize your digital brand reach instantly.",
    alternates: getSeoAlternates("bio", params.locale),
   
  }
}

export default function Page() {
  return (
    <>
      <SearchHeader 
        title="Smart Bio Generator"
        subtitle="Effortlessly grab high-quality Bio media in seconds."
        hideSearchBar={true}
      />
      
      <BioView />

      <FeaturesSection platform="bio" />
      <CategoryCards />
      <FAQSection platform="bio" />
    </>
  )
}

