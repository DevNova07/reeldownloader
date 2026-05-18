import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import AboutView from "./AboutView"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return {
    title: "About Us – Learn More About SavClip Downloader",
    description: "A streamlined, 100% free solution for archiving About media. Experience lightning-fast speeds and pristine clarity.",
    alternates: getSeoAlternates("about", params.locale),
  }
}

export default function Page() {
  return <AboutView />
}
