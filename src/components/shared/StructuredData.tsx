import Script from "next/script"
import { useId } from "react"

interface StructuredDataProps {
  type: "FAQPage" | "HowTo" | "SoftwareApplication" | "BreadcrumbList" | "WebSite"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generatedId = useId()
    let schema: any = {}

  if (type === "BreadcrumbList") {
    schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": Array.isArray(data) ? data.map((item: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.item
      })) : []
    }
  }

  if (type === "SoftwareApplication") {
    const appSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.title,
      "operatingSystem": "iOS, Android, Windows, macOS, Linux",
      "applicationCategory": "SocialNetworkingApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.ratingValue || "4.9",
        "reviewCount": data.reviewCount || "12840"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": data.description || "Free online social media downloader for videos, reels, and stories."
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to use ${data.title}`,
      "description": `Follow these 3 easy steps to download media using ${data.title}.`,
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Copy the Link",
          "itemListElement": [
            {
              "@type": "HowToDirection",
              "text": `Open the social media application or website, find the media you want to save, and copy its URL or share link.`
            }
          ]
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Paste the Link",
          "itemListElement": [
            {
              "@type": "HowToDirection",
              "text": `Go to the ${data.title} page on SavClip, and paste the copied link into the input box at the top.`
            }
          ]
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Download the Media",
          "itemListElement": [
            {
              "@type": "HowToDirection",
              "text": `Click the 'Download' button. Once processed, select your preferred quality to save the file to your device.`
            }
          ]
        }
      ]
    };

    schema = [appSchema, howToSchema];
  }

  if (type === "HowTo") {
    schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.name || data.title,
      "description": data.description || data.desc,
      "step": Array.isArray(data.steps) ? data.steps.map((step: any, index: number) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": typeof step === 'string' ? step : (step.desc || step.title || step.text)
      })) : []
    }
  }

  if (type === "WebSite") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SavClip",
      "alternateName": ["SavClip Downloader", "SavClip"],
      "url": "https://savclip.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://savclip.com?url={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  }

  if (type === "FAQPage") {
    const faqItems = Array.isArray(data) ? data : (data.items || []);
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map((faq: { q?: string; a?: string; title?: string; desc?: string }) => ({
        "@type": "Question",
        "name": faq.q || faq.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a || faq.desc
        }
      }))
    }
  }

  return (
    <Script
      id={`json-ld-${type}-${generatedId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
