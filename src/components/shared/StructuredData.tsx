import Script from "next/script"
import { useId } from "react"

interface StructuredDataProps {
  type: "FAQPage" | "HowTo"
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

  if (type === "HowTo") {
    schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": data.name,
      "description": data.description,
      "step": data.steps.map((step: string, index: number) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": step
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
