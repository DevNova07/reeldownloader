import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("telegram-restricted-content-downloader", locale);
  return { 
    title: seoData.meta?.title || "Telegram Restricted Content Downloader HD - SavClip",
    description: seoData.meta?.description || "Bypass chat forward blocks and content savings restrictions on Telegram. Safely export copy-protected channel videos and photos online.",
    alternates: getSeoAlternates("telegram-restricted-content-downloader", locale),
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("telegram-restricted-content-downloader", locale);
  const { articleSections, faqs, header } = seoData;

  return (
    <>
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `${locale === 'en' ? '/' : '/' + locale}` },
          { name: "Telegram", item: `${locale === 'en' ? '' : '/' + locale}/telegram-video-downloader` },
          { name: "Restricted Content Downloader", item: `${locale === 'en' ? '' : '/' + locale}/telegram-restricted-content-downloader` }
        ]}
      />
      
      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Telegram", href: "/telegram-video-downloader" },
          { label: "Restricted Content Downloader", href: "/telegram-restricted-content-downloader" }
        ]} 
      />

      <SearchHeader {...header} />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <RichArticle sections={articleSections} />
        </div>
      </div>

      <FeaturesSection platform="Telegram" />
      <FAQSection platform="Telegram" items={faqs} />
    </>
  )
}
