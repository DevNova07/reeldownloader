import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { InstagramPreviewMockup } from "@/components/shared/InstagramPreviewMockup"
import { AudioCTA } from "./AudioCTA"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "Instagram Audio Downloader – Extract & Save IG MP3 Music | SavClip",
  description: "Extract and download audio tracks from Instagram reels and videos. Save IG audio files as high-quality MP3s instantly.",
    alternates: getSeoAlternates("instagram-audio-downloader", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("instagram-audio-downloader", locale);
  const { articleSections, faqs, header } = seoData;


  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Instagram Audio Downloader",
          description: "Extract and download Instagram audio and Reel music in high-quality MP3.",
          ratingValue: "4.9",
          reviewCount: "6400"
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `/${locale}` },
          { name: "Instagram", item: `/${locale}/instagram-video-downloader` },
          { name: "Audio Downloader", item: `/${locale}/instagram-audio-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Instagram", href: "/instagram-video-downloader" },
          { label: "Audio Downloader", href: "/instagram-audio-downloader" }
        ]} 
      />
      
      <SearchHeader {...header} />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tool Preview */}
          <RichArticle 
            sections={articleSections} 
            />
        </div>
      </div>

      <FeaturesSection platform="Instagram Audio" />

      

      <FAQSection platform="Instagram Audio" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <InstagramPreviewMockup type="audio" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <AudioCTA />
    </>
  )
}
