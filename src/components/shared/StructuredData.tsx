import Script from "next/script"
import { useId } from "react"

interface StructuredDataProps {
  type: "FAQPage" | "HowTo" | "SoftwareApplication"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generatedId = useId()
    let schema: any = {}

  if (type === "FAQPage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.map((faq: { q: string; a: string }) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  }

  if (type === "SoftwareApplication") {
    schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.title,
      "operatingSystem": "iOS, Android, Windows, macOS",
      "applicationCategory": "MultimediaApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
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
        "text": typeof step === 'string' ? step : step.desc || step.title
      })) : []
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
