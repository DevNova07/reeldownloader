import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import AboutView from "./AboutView"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return {
    title: "About Us – Learn More About SavClip Downloader",
    description: "Learn more about SavClip, the premier web-based media downloader. Discover our mission to provide fast, high-quality, and secure media conversion tools.",
    alternates: getSeoAlternates("about", params.locale),
  }
}

export default function Page() {
  return <AboutView />
}
