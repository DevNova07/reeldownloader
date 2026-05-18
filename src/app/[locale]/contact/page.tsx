import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import ContactView from "./ContactView"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return {
    title: "Contact Us – Get in Touch with SavClip Team",
    description: "Download Contact media effortlessly. We preserve the original source quality so you never miss a single detail.",
    alternates: getSeoAlternates("contact", params.locale),
  }
}

export default function Page() {
  return <ContactView />
}
