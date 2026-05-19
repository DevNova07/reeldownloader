import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import ContactView from "./ContactView"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return {
    title: "Contact Us – Get in Touch with SavClip Team",
    description: "Have questions or feedback? Get in touch with the SavClip team. We are here to help you with any technical issues or feature inquiries.",
    alternates: getSeoAlternates("contact", params.locale),
  }
}

export default function Page() {
  return <ContactView />
}
